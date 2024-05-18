import { ControlledDatePickerProps } from "@/type/ReactHookFormType";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";
import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const ControlledDatePicker = forwardRef<HTMLInputElement, ControlledDatePickerProps>((props, ref) => {
  const { name, rules, helperText, ...restProps } = props;
  const form = useFormContext();

  //バリデーションルール
  const saleDatePickerRules = {
    required: { value: true, message: "必須入力です" },
    ...rules,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Controller
        name={name}
        control={form.control}
        rules={saleDatePickerRules}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            ref={ref}
            slots={{
              textField: (textFieldProps) => (
                <TextField
                  {...field}
                  error={!!errors.message}
                  helperText={helperText}
                  {...textFieldProps}
                  size="small"
                />
              ),
            }}
          />
        )}
        {...restProps}
      />
    </LocalizationProvider>
  );
});

ControlledDatePicker.displayName = "ControlledDatePicker";
