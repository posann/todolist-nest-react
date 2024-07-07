import { Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AlertComponent = ({ message, status, onClose, ...rest }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto hide after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Call the onClose handler after hiding
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {isVisible && (
        <Alert status={status} {...rest}>
          <AlertIcon />
          {message}
        </Alert>
      )}
    </>
  );
};
