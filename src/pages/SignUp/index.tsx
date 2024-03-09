import { Header } from "@/components/Header";
import { Grid, Typography } from "@mui/material";
import { SignUpForm } from "./components/SignUpForm";
import { AuthContextProvider } from "@/context/AuthContext";

export const SignUp = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Grid container className="justify-center mt-10">
          <Grid item>
            <Typography variant="h4">新規登録</Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <SignUpForm />
          </Grid>
        </Grid>
      </AuthContextProvider>
    </>
  );
};

export default SignUp;
