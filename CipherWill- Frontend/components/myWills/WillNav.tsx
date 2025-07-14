import { isWillFormOpenAtom } from "@/state/jotai";
import { AbsoluteCenter, Box, Button, Icon, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { WillForm } from "./WillForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWillIdentifier } from "@/hooks/useWill/useWillIdentifier";
import { useIsUserExists } from "@/hooks/useUser/useIsUserExists";
function CreateWill({ children }: { children: React.ReactNode }) {
  //hooks
  const router = useRouter();
  const willDetailPath = usePathname();
  console.log(
    "🚀 ~ file: WillNav.tsx:14 ~ CreateWill ~ willDetailPath:",
    willDetailPath
  );

  const [isOpen, setOpen] = useAtom(isWillFormOpenAtom);
  const [identifier, requestWillIdentifier, isLoading, error] =
    useWillIdentifier();
  const [isUserExists] = useIsUserExists();

  //if user not exists in canister push to profile route
  useEffect(() => {
    if (!isUserExists) {
      router.push("/profile");
    }
  });

  const createWill = async () => {
    await requestWillIdentifier();
    setOpen(true);
  };
  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return isOpen && identifier ? (
    <Box>{<WillForm />}</Box>
  ) : (
    <Box className="mt-0 w-full sm:px-6">
      {willDetailPath === "/wills/will" ? (
        <></>
      ) : (
        <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
          <Box className="flex items-center justify-between">
            <Box> </Box>
            <Box>
              <Button
                className="hover:border-r-0  font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                _hover={{
                  bg: "#4b5563",
                  color: "white",
                }}
                onClick={createWill}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
}

function WillNav({ children }: { children: React.ReactNode }) {
  //hooks
  const [isUserExists, isLoading, error] = useIsUserExists();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <CreateWill children={children} />
  );
}

export default WillNav;
