import { ControlledDatePickerProps } from "@/type/reactHookFormType";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";

export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  const { name, rules, ...restProps } = props;
  const form = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field }) => <DatePicker {...field} {...restProps} />}
      />
    </LocalizationProvider>
  );
};
