import { ControlledTextField } from "@/components/share/form/ControlledTextField";
import { SignUpParams } from "@/type/User";
import { Button, Grid, Paper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { signUp } from "@/util/auth";
import router from "next/router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export type FormSignUp = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignUpForm = () => {
  const signUpForm = useForm<FormSignUp>();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  // 新規登録ボタン押下時
  const handleSignUpOnClick = async () => {
    const params: SignUpParams = {
      name: signUpForm.getValues("name"),
      email: signUpForm.getValues("email"),
      password: signUpForm.getValues("password"),
      passwordConfirmation: signUpForm.getValues("passwordConfirmation"),
    };

    try {
      const res = await signUp(params);
      console.log("signUp実行", res);
      if (res.status === 200) {
        console.log("signUp処理成功");
        // アカウント作成と同時にログインさせてしまう
        // メール確認実装
        Cookies.set("_access_toke", res.headers["acces-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/User");
      } else {
        alert(`${res.status}エラー`);
      }
    } catch (err) {
      console.log("サーバー通信エラー", err);
      alert("通信エラー");
    }
  };

  // 登録ボタン押下時のテスト用関数
  const testOnSubmit = () => {
    console.log("登録", signUpForm.getValues());
  };
  return (
    <FormProvider {...signUpForm}>
      <Paper elevation={0} sx={{ height: "100vh" }}>
        <Grid container>
          <Grid item className="w-96">
            <ControlledTextField name="name" label="ユーザー名" fullWidth />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <ControlledTextField name="email" label="メールアドレス" fullWidth />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <ControlledTextField name="password" label="パスワード" fullWidth />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <ControlledTextField name="passwordConfirmation" label="パスワード確認" fullWidth />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <Button variant="outlined" disabled={false} onClick={signUpForm.handleSubmit(handleSignUpOnClick)}>
              登録
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
};
