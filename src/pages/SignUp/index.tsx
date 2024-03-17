import { Header } from "@/components/Header";
import { Grid, Typography } from "@mui/material";
import { SignUpForm } from "./components/SignUpForm";
import { AuthContext, AuthContextProvider } from "@/context/AuthContext";
import { useCallback, useContext, useEffect } from "react";
import router from "next/router";

export const SignUp = () => {
  console.log("SignUp");
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const isAuthenticatedRedirect = useCallback(() => {
    console.log("ログイン済みです", isSignedIn, currentUser);
    if (isSignedIn && currentUser) {
      router.push("/User");
    }
  }, [isSignedIn, currentUser]);

  useEffect(() => {
    isAuthenticatedRedirect;
  }, [isAuthenticatedRedirect]);

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
