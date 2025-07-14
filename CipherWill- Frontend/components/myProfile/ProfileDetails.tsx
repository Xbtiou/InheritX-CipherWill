import { useUserInfo } from "@/hooks/useUser/useUserInfo";
import {
  AbsoluteCenter,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function ProfileDetails() {
  const [
    principal,
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
    isLoading,
    error,
  ] = useUserInfo();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <TableContainer >
      <Table variant="simple" size={"lg"}>
        <Thead>
          {" "}
          <Tr>
          </Tr>
        </Thead>
        <Tbody>
          <br />{" "}
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold">Principal</Td>
            <Td isNumeric>{principal}</Td>
          </Tr>
          <br />{" "}
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold">First Name(s)</Td>
            <Td isNumeric>{firstNames}</Td>
          </Tr>
          <br />
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold">Last Name</Td>
            <Td isNumeric> {lastName}</Td>
          </Tr>
          <br />
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold">Sex</Td>
            <Td isNumeric>{sex}</Td>
          </Tr>
          <br />
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold">Birth Date</Td>
            <Td isNumeric>{birthDate}</Td>
          </Tr>
          <br />
          <Tr className="font-serif text-slate-500 border-b-4 border-x-2 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
            <Td className="font-bold"> Postal Code</Td>
            <Td isNumeric>{birthLocationCode}</Td>
          </Tr>
          <br />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProfileDetails;
