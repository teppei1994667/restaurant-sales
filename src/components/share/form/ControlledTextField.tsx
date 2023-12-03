import { ControlledTextFieldProps } from "@/type/reactHookFormType";
import { TextField } from "@mui/material";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const ControlledTextField = forwardRef<
  HTMLInputElement,
  ControlledTextFieldProps
>((props, ref) => {
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
            ref={ref}
            error={!!errors.message}
            helperText={helperText}
            {...restProps}
          />
        )}
      />
    </>
  );
});

ControlledTextField.displayName = "ControlledTextField";
