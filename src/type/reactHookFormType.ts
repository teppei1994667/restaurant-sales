import { TextFieldProps } from "@mui/material";
import { RegisterOptions } from "react-hook-form";

export type ControlledTextFieldProps = Omit<TextFieldProps, "name"> & {
  name: string;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};
