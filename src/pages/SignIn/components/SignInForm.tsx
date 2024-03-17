import { EmailTextField } from "@/components/share/authUser/EmailTextField";
import { PassWordTextField } from "@/components/share/authUser/PasswordTextField";
import { Button, Grid, Paper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

export type SignInForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignInForm = () => {
  const signInForm = useForm<SignInForm>({ mode: "onSubmit", reValidateMode: "onChange" });
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
            <Button variant="outlined" disabled={false}>
              ログイン
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
};
