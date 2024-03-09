import { ControlledTextFieldProps } from "@/type/ReactHookFormType";
import { ControlledTextField } from "../form/ControlledTextField";
import { forwardRef } from "react";

export const EmailTextFiled = forwardRef<HTMLInputElement, ControlledTextFieldProps>((props, ref) => {
  const { rules, ...restProps } = props;
  const emailRegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  //ControlledNumberTextField標準のバリデーションルール
  const emailTextFieldRules = {
    required: { value: true, message: "必須入力です" },
    maxLength: {
      value: 319,
      message: "最大319桁までの入力にしか対応していません",
    },
    pattern: {
      value: emailRegExp,
      message: "正しいメールアドレスの形式を入力してください。",
    },
    //呼び出し元からの上書き可能
    ...rules,
  };
  return (
    <>
      <ControlledTextField rules={emailTextFieldRules} {...restProps} ref={ref} />
    </>
  );
});

EmailTextFiled.displayName = "EmailTextFiled";
