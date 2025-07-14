import { userDetailsArgs } from "@/declarations/will/will.did";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Center,
  AbsoluteCenter,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  transformData,
  validateBirthDate,
  validateBirthLocationCode,
  validateFirstNames,
  validateLastName,
  validateSex,
} from "./utils";
import {
  birthDateAtom,
  birthLocationCodeAtom,
  firstNamesAtom,
  isProfileFormOpenAtom,
  lastNameAtom,
  sexAtom,
} from "@/state/jotai";
import { useAtom } from "jotai";
import { useProfileSubmit } from "@/hooks/useUser/useProfileSubmt";
export function ProfileForm() {
  //atoms
  const [, setOpen] = useAtom(isProfileFormOpenAtom);
  const [firstNames] = useAtom(firstNamesAtom);
  const [lastName] = useAtom(lastNameAtom);
  const [sex] = useAtom(sexAtom);
  const [birthDate] = useAtom(birthDateAtom);
  const [birthLocationCode] = useAtom(birthLocationCodeAtom);

  //hooks
  const [loading, profileSubmit] = useProfileSubmit();

  async function submitProfileForm(
    data: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) {
    const profileArgs: userDetailsArgs = transformData(data);
    await profileSubmit(profileArgs);
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }

  if (loading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <Box className="mb-0 font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded   justify-between px-3 py-3  focus:outline-none w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Formik
          initialValues={{
            firstNames: firstNames ? firstNames?.replaceAll(" ", ",") : "",
            lastName: lastName ? lastName : "",
            sex: sex ? sex : "",
            birthDate: birthDate ? birthDate : "",
            birthLocationCode: birthLocationCode ? birthLocationCode : "",
          }}
          onSubmit={async (
            values: any,
            actions: { setSubmitting: (arg0: boolean) => void }
          ) => {
            await submitProfileForm(values, actions);
          }}
        >
          {(props: { isSubmitting: any }) => (
            <Form>
              <Field name="firstNames" validate={validateFirstNames}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.firstNames && form.touched.firstNames
                    }
                  >
                    <FormLabel className="font-serif font-bold">
                      First name(s)
                    </FormLabel>
                    <Input
                      {...field}
                      className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                      placeholder="name1,name2,.."
                    />
                    <FormErrorMessage>
                      {form.errors.firstNames}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name="lastName" validate={validateLastName}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <FormLabel className="font-bold font-serif">
                      Last Name
                    </FormLabel>
                    <Input
                      {...field}
                      className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                      placeholder="name"
                    />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field name="sex" validate={validateSex}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.sex && form.touched.sex}
                  >
                    <FormLabel className="font-bold font-serif"> Sex</FormLabel>
                    <Input
                      {...field}
                      className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                      placeholder="F/M"
                    />
                    <FormErrorMessage>{form.errors.sex}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field name="birthDate" validate={validateBirthDate}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.birthDate && form.touched.birthDate}
                  >
                    <FormLabel className="font-bold font-serif">
                      {" "}
                      Birth Date
                    </FormLabel>
                    <Input
                      {...field}
                      className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                      placeholder="YYYY-MM-DD"
                    />
                    <FormErrorMessage>{form.errors.birthDate}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field
                name="birthLocationCode"
                validate={validateBirthLocationCode}
              >
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.birthLocationCode &&
                      form.touched.birthLocationCode
                    }
                  >
                    <FormLabel className="font-bold font-serif">
                      {" "}
                      Birth Postal Code
                    </FormLabel>
                    <Input
                      {...field}
                      className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                      placeholder="12345"
                    />
                    <FormErrorMessage>
                      {form.errors.birthLocationCode}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Flex>
                {" "}
                <Center>
                  {" "}
                  <Button
                    isDisabled={props.isSubmitting}
                    loadingText="Submitting..."
                    _hover={{
                      bg: "#4b5563",
                      color: "white",
                    }}
                    className="hover:border-r-0  font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded   justify-between px-3 py-3  focus:outline-none"
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Center>{" "}
                <Center>
                  {" "}
                  <Button
                    _hover={{
                      bg: "#4b5563",
                      color: "white",
                    }}
                    className="hover:border-r-0  font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3   justify-between px-3 py-3  focus:outline-none"
                    mt={4}
                    onClick={() => {
                      setOpen(false);
                    }}
                    colorScheme="teal"
                    isDisabled={props.isSubmitting}
                    type="submit"
                  >
                    Cancel
                  </Button>
                </Center>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
