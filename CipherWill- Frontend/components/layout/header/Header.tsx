"use client";
import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { TbJewishStar } from "react-icons/tb";
import { SiAcclaim } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Profile", icon: CgProfile, path: "/profile" },
  { name: "My Wills", icon: TbJewishStar, path: "/wills" },
  { name: "My Claims", icon: SiAcclaim, path: "/claims" },
];

interface SidebarWithHeaderProps {
  signOut(): void;
  children: ReactNode;
}
export default function SidebarWithHeader({
  children,
  signOut,
}: SidebarWithHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.300", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} signOut={signOut} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("gray.300", "gray.900")}
      borderRight="0px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" ml={5} justifyContent="space-between">
        <Text
          className="font-serif font-bold text-slate-700 items-center    sm:ml-3  sm:mt-0 sm:m-0 justify-between px-0 py-3  focus:outline-none"
          fontSize="3xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          InheritX
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          border={1}
          borderColor={"white"}
          className="text-slate-700 font-bold font-serif"
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      as={Link}
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        className="text-slate-700 "
        align="center"
        mt={0}
        mb={5}
        p="5"
        mx="5"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#4b5563",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  signOut(): void;
}
const MobileNav = ({ signOut, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      boxShadow={"md"}
      className="border-l-2  shadow-indigo-500/40  border-slate-300"
      bg={useColorModeValue("grey.500", "gray.900")}
      borderBottomColor={useColorModeValue("white.100", "gray.900")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="3xl"
        fontFamily="monospace"
        fontWeight="bold"
        className="text-slate-800"
      >
        InheritX
      </Text>

      <Button
        onClick={signOut}
        rightIcon={<PiSignOutBold />}
        className="hover:border-r-0 font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
        rounded={"lg"}
        _hover={{
          bg: "#4b5563",
          color: "white",
        }}
      >
        Sign out
      </Button>
    </Flex>
  );
};
