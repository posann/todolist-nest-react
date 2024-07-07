import React from "react";
import { Select } from "@chakra-ui/react";

export const SelectComponent = ({
  selectedValue,
  setSelectedValue,
  data,
  ...rest
}: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Select
        placeholder={rest.helperText}
        onChange={handleChange}
        value={selectedValue}
      >
        {data.map((item: any) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
    </div>
  );
};
