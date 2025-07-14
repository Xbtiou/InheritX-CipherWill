export const showToast = (
  toast: any,
  title: string,
  description: string,
  status: string,
  position: string
) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
    position: position,
  });
};

export const showStandardErrorMesg = (toast: any) => {
  showToast(
    toast,
    "🤖 We have a problem.",
    "Something is not working. 😭 Please try again later or contact us support@inheritx.app for help. 👨‍💻",
    "error",
    "top"
  );
};
