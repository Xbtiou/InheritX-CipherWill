import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { isConnectedAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { connectWallet } from "../../auth/auth";
import { useRouter } from "next/navigation";
import PlugConnectIcon from "@/icon";
import { showToast } from "@/utils/toast";
import { useSignOut } from "@/hooks/useUtils/useSignOut";
import { useState } from "react";
import Disclaimer from "./Disclaimer";

export default function HeroSection() {
  const router = useRouter();
  const toast = useToast();

  const [loadWallet, setLoadWallet] = useState<boolean>(false);

  const [, setConnected] = useAtom(isConnectedAtom);
  const [clearStates] = useSignOut();

  const PlugLogo = <PlugConnectIcon h="40px" />;
  const connect = async () => {
    setLoadWallet(true);
    console.log("clearing states......");
    clearStates();
    const connection = await connectWallet();
    if (connection) {
      router.push("/");
    } else {
      showToast(
        toast,
        "Wallet Not Found",
        "Click here: https://plugwallet.ooo/",
        "error",
        "top"
      );
      setLoadWallet(false);
    }
    console.log(
      "🚀 ~ file: HeroSection.tsx:23 ~ connectWallet ~ connection:",
      connection
    );
    setConnected(connection);
  };

  return (
    <Stack
      bg={useColorModeValue("gray.300", "gray.900")}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Center className={`sm:visible`}>
            {" "}
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                className="bold text-4xl font-serif"
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Inherit
              </Text>
              <Text
                className="shadow shadow-transparent italic text-5xl"
                color={"blue.400"}
                as={"span"}
              >
                X{" "}
              </Text>{" "}
            </Heading>
          </Center>
          <Center className={`sm:visible`}>
            <Text
              className="font-sans"
              fontSize={{ base: "md", lg: "lg" }}
              color={"gray.700"}
            >
              Empowering Your Digital Asset Succession{" "}
            </Text>{" "}
          </Center>

          <Center className={`sm:visible`}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                isDisabled={loadWallet}
                loadingText="Connecting"
                isLoading={loadWallet}
                rightIcon={PlugLogo}
                className="hover:border-0 font-sans text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                onClick={connect}
                rounded={"lg"}
                color={"black"}
                _hover={{
                  bg: "#4b5563",
                  color: "white",
                }}
              >
                Connect &nbsp;{" "}
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"contain"}
          src="https://digitalwill.com/images/wishes.png"
        />
      </Flex>
      <Disclaimer />
    </Stack>
  );
}
