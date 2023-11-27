import { ControlledTextFieldProps } from "@/type/reactHookFormType";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { name, rules, helperText, ...restProps } = props;
  const form = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            error={!!errors.message}
            helperText={helperText}
            {...restProps}
          />
        )}
      />
    </>
  );
};
