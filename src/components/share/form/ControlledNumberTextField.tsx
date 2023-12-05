import { ControlledTextFieldProps } from "@/type/reactHookFormType";
import { forwardRef } from "react";
import { ControlledTextField } from "./ControlledTextField";

export const ControlledNumberTextField = forwardRef<
  HTMLInputElement,
  ControlledTextFieldProps
>((props, ref) => {
  const { rules, ...restProps } = props;

  //ControlledNumberTextField標準のバリデーションルール
  const saleTextFieldRules = {
    required: { value: true, message: "必須入力です" },
    maxLength: {
      value: 7,
      message: "最大７桁までの入力にしか対応していません",
    },
    validate: (data: string) => {
      if (data.match(/[^0-9]+/)) {
        return "半角数値のみ入力可能です";
      }
    },
    //呼び出し元からの上書き可能
    ...rules,
  };

  return (
    <>
      <ControlledTextField
        rules={saleTextFieldRules}
        {...restProps}
        ref={ref}
      />
    </>
  );
});

ControlledNumberTextField.displayName = "ControlledNumberTextField";
