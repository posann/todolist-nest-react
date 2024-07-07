import { Button } from "@chakra-ui/react";

const ButtonComponent = ({ ...rest }) => {
  return (
    <Button colorScheme={"teal"} size={"sm"} {...rest}>
      {rest.label}
    </Button>
  );
};

export default ButtonComponent;
