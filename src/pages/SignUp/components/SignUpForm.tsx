import { ControlledTextField } from "@/components/share/form/ControlledTextField";
import { SignUpParams } from "@/type/User";
import { Button, Grid, Paper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { signUp } from "@/util/auth";
import router from "next/router";
import { EmailTextField } from "@/components/share/authUser/EmailTextField";
import { PassWordTextField } from "@/components/share/authUser/PasswordTextField";

export type FormSignUp = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignUpForm = () => {
  const signUpForm = useForm<FormSignUp>({ mode: "onSubmit", reValidateMode: "onChange" });

  // 新規登録ボタン押下時
  const handleSignUpOnClick = async () => {
    const signUpParams: SignUpParams = {
      name: signUpForm.getValues("name"),
      email: signUpForm.getValues("email"),
      password: signUpForm.getValues("password"),
      passwordConfirmation: signUpForm.getValues("passwordConfirmation"),
    };

    try {
      const res = await signUp(signUpParams);
      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        Cookies.set("_access-token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        router.push("/User");
      } else if (res.status === 401) {
        alert("認証エラー");
      } else if (res.status === 500) {
        alert("500 Internal Server Error");
      } else {
        alert(`新規登録${res.status}エラー`);
      }
    } catch (err) {
      alert("新規登録サーバー通信エラー");
    }
  };

  return (
    <FormProvider {...signUpForm}>
      <Paper elevation={0} sx={{ height: "100vh" }}>
        <Grid container>
          <Grid item className="w-96">
            <ControlledTextField
              rules={{ required: { value: true, message: "必須入力です" } }}
              name="name"
              label="ユーザー名"
              fullWidth
              helperText={signUpForm.formState.errors.name?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <EmailTextField
              name="email"
              label="メールアドレス"
              fullWidth
              helperText={signUpForm.formState.errors.email?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <PassWordTextField
              name="password"
              label="パスワード"
              fullWidth
              helperText={signUpForm.formState.errors.password?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <PassWordTextField
              name="passwordConfirmation"
              label="パスワード確認"
              fullWidth
              helperText={signUpForm.formState.errors.passwordConfirmation?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <Button
              className="text-gray-500 border-gray-500"
              variant="outlined"
              disabled={false}
              onClick={signUpForm.handleSubmit(handleSignUpOnClick)}
              sx={{
                height: "60px",
                width: "130px",
                "&:hover": {
                  border: "none",
                },
              }}
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
};
