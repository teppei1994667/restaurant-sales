import { EmailTextField } from "@/components/share/authUser/EmailTextField";
import { PassWordTextField } from "@/components/share/authUser/PasswordTextField";
import { signIn } from "@/util/auth";
import { Button, Grid, Paper } from "@mui/material";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import router from "next/router";

export type SignInForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignInForm = () => {
  const signInForm = useForm<SignInForm>({ mode: "onSubmit", reValidateMode: "onChange" });

  const handleSignInOnClick = async () => {
    const signInParams = {
      email: signInForm.getValues("email"),
      password: signInForm.getValues("password"),
    };

    try {
      const res = await signIn(signInParams);
      if (res.status === 200) {
        Cookies.set("_access-token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        router.push("/User");
      } else {
        alert(`サインイン${res.status}エラー`);
      }
    } catch (err) {
      alert("ログインサーバー通信エラー");
    }
  };
  return (
    <FormProvider {...signInForm}>
      <Paper elevation={0} sx={{ height: "100vh" }}>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <EmailTextField
              name="email"
              label="メールアドレス"
              fullWidth
              helperText={signInForm.formState.errors.email?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-10">
          <Grid item className="w-96">
            <PassWordTextField
              name="password"
              label="パスワード"
              fullWidth
              helperText={signInForm.formState.errors.password?.message}
            />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <Button variant="outlined" disabled={false} onClick={signInForm.handleSubmit(handleSignInOnClick)}>
              ログイン
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
};
