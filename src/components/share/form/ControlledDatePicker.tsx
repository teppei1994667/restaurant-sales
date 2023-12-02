import { ControlledDatePickerProps } from "@/type/reactHookFormType";
import { Controller, useFormContext } from "react-hook-form";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";
import { TextField } from "@mui/material";

export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  const { name, rules, helperText, ...restProps } = props;
  const form = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            slots={{
              textField: (textFieldProps) => (
                <TextField
                  {...field}
                  error={!!errors.message}
                  helperText={helperText}
                  {...textFieldProps}
                />
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
