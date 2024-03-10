import { forwardRef, useState } from "react";
import { ControlledTextField } from "../form/ControlledTextField";
import { ControlledTextFieldProps } from "@/type/ReactHookFormType";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PassWordTextField = forwardRef<HTMLInputElement, ControlledTextFieldProps>((props, ref) => {
  const { rules, ...restProps } = props;
  const passwordRegExp = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;

  const [isShowPassword, setIsShowPassword] = useState(false);

  // テキストフィールド内のパスワード表示アイコン押下時
  const handleShowPasswordOnClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  //PasswordTextField標準のバリデーションルール
  const passwordTextFieldRules = {
    required: { value: true, message: "必須入力です" },
    maxLength: {
      value: 100,
      message: "パスワードは10桁以上、100桁以下で入力してください",
    },
    minLength: {
      value: 10,
      message: "パスワードは10桁以上、100桁以下で入力してください",
    },
    pattern: {
      value: passwordRegExp,
      message: "パスワードには半角数字、半角英子文字、半角英大文字のみ使用可能です。また各種最低１桁以上含めてください",
    },
    //呼び出し元からの上書き可能
    ...rules,
  };
  return (
    <>
      <ControlledTextField
        rules={passwordTextFieldRules}
        type={isShowPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleShowPasswordOnClick} edge="end">
                {isShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...restProps}
        ref={ref}
      />
    </>
  );
});

PassWordTextField.displayName = "PassWordTextField";
