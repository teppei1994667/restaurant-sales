import { Header } from "@/components/Header";
import { Grid, Typography } from "@mui/material";
import { SignInForm } from "./components/SignInForm";
import { GetServerSideProps } from "next";
import { possibleAuthServerSideProps } from "@/util/authRedirect";

export const getServerSideProps: GetServerSideProps = possibleAuthServerSideProps("users");

export const SignIn = () => {
  return (
    <>
      <Header />
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            SIGN IN
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center mt-5">
        <Grid item>
          <SignInForm />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
