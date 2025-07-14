"use client";
import React, { useEffect } from "react";
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
import { principalAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { useHeirs } from "@/hooks/useWill/useHeirs";
import { truncatePrincipal } from "@/utils/utils";

function ClaimList() {
  //atoms
  const [principal, setPrincipal] = useAtom(principalAtom);

  useEffect(() => {
    const requestPlugPrincipal = async () => {
      try {
        setPrincipal(
          truncatePrincipal((await window.ic.plug.getPrincipal()).toString())!
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: page.tsx:40 ~ requestPlugPrincipal ~ error:",
          error
        );
      }
    };
    requestPlugPrincipal();
  }, []);

  //hooks
  const [heirsWills, isLoading, error] = useHeirs();

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  } else if (heirsWills?.length === 0 || !heirsWills) {
    return (
      <>
        <AbsoluteCenter>
          <Box
            as={"p"}
            fontSize="30"
            className="text-slate-700 text-sm  leading-none "
          >
            <Icon
              fontSize="40"
              // color={"black"}
              as={BsFillPatchExclamationFill}
            />
            &nbsp;&nbsp;<b>No Wills To Claim</b>
          </Box>
        </AbsoluteCenter>
      </>
    );
  } else if (heirsWills?.length > 0 && heirsWills) {
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
                  <Th>Sno</Th>
                  <Spacer />
                  <Th>Identifier</Th>
                  <Spacer />
                  <Th>Principal</Th>
                  <Spacer />
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {heirsWills.map((item, index) => (
                  <Tr
                    className=" hover:border-r-0 font-sans text-slate-700 border-b-2 border-r-2 border-transparent items-center shadow-lg hover:shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                    key={index + 1}
                  >
                    <Td>{index + 1}</Td> <Spacer />
                    <Td>{item}</Td> <Spacer />
                    <Td>{truncatePrincipal(principal!, 5)}</Td> <Spacer />
                    <Td>
                      <Link href={`/claims/claim?id=${item}`}>
                        <Icon as={IoIosExpand} />
                      </Link>{" "}
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

export default ClaimList;
