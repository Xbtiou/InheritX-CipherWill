"use client";
import React from "react";
import {
  AbsoluteCenter,
  Box,
  Icon,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPatchExclamationFill } from "react-icons/bs";
import { IoIosExpand } from "react-icons/io";
import { truncatePrincipal } from "@/utils/utils";
import { useTestator } from "@/hooks/useWill/useTestator";
import { useUserInfo } from "@/hooks/useUser/useUserInfo";
function WillList() {
  //hooks
  const [testatorWills, isLoading, error] = useTestator();
  const [principal] = useUserInfo();

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  } else if (testatorWills?.length === 0 || !testatorWills) {
    return (
      <>
        <AbsoluteCenter>
          <Box
            as={"p"}
            fontSize="30"
            className="text-slate-700 text-sm  leading-none "
          >
            <Icon fontSize="40" as={BsFillPatchExclamationFill} />
            &nbsp;&nbsp;<b>No Wills Found</b>
          </Box>
        </AbsoluteCenter>
      </>
    );
  } else if (testatorWills.length > 0 && testatorWills) {
    return (
      <>
        <Box className="mt-0  bg-transparent shadow">
          <TableContainer>
            <Table
              size={"lg"}
              className="bg-transparent"
              colorScheme="facebook"
            >
              <Thead>
                <Tr>
                  <Th>S.no</Th>
                  <Spacer />
                  <Th>Identifier</Th>
                  <Spacer />
                  <Th>Principal</Th>
                  <Spacer />
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {testatorWills.map((item, index) => (
                  <Tr
                    className=" hover:border-r-0 font-sans text-slate-700 border-b-2 border-r-2 border-transparent items-center shadow-lg hover:shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                    key={index + 1}
                  >
                    {" "}
                    <Td>{index + 1}</Td> <Spacer />
                    <Td>{item}</Td> <Spacer />
                    <Td>{truncatePrincipal(principal!, 5)}</Td> <Spacer />
                    <Td>
                      <Link href={`/wills/will?id=${item}`}>
                        <Icon as={IoIosExpand} />
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default WillList;
