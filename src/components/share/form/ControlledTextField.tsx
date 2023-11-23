import { ControlledTextFieldProps } from "@/type/reactHookFormType";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { name, rules, ...restProps } = props;
  const form = useFormContext();

  return (
    <Controller
      name={name}
      control={form.control}
      rules={rules}
      render={({ field }) => <TextField {...field} {...restProps} />}
    />
  );
};
