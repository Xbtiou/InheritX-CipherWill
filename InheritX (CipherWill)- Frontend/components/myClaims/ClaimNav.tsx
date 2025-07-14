import { useIsUserExists } from "@/hooks/useUser/useIsUserExists";
import { isWillFormOpenAtom } from "@/state/jotai";
import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useWillIdentifier } from "@/hooks/useWill/useWillIdentifier";

function CreateWill({ children }: { children: React.ReactNode }) {
  //atoms
  const [isOpen] = useAtom(isWillFormOpenAtom);

  //hooks
  const [identifier, requestWillIdentifier, isLoading] = useWillIdentifier();

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return isOpen && identifier ? (
    <Box></Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className="flex items-center justify-between"></Box>
      {children}
    </Box>
  );
}

function ClaimNav({ children }: { children: React.ReactNode }) {
  const [isUserExists, isLoading, error] = useIsUserExists();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <CreateWill children={children} />
  );
}

export default ClaimNav;
