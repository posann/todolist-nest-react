// components/input/input.tsx

import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

export const InputComponent = ({
  value,
  setValue,
  errorMessage,
  ...rest
}: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <FormControl my={2} isInvalid={!!errorMessage}>
      <Input
        required
        variant="filled"
        placeholder={rest.helperText}
        errorBorderColor="red.300"
        value={value}
        onChange={handleInputChange}
        type={rest.type}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
