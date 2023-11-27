import { TextFieldProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import { RegisterOptions } from "react-hook-form";

export type ControlledTextFieldProps = Omit<TextFieldProps, "name"> & {
  name: string;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  helperText?: string;
};

export type ControlledDatePickerProps = Omit<DatePickerProps<Date>, "name"> & {
  name: string;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};
