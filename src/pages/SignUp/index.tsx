import { Header } from "@/components/Header";
import { Grid, Typography } from "@mui/material";
import { SignUpForm } from "./components/SignUpForm";
import { GetServerSideProps } from "next";
import { authenticationNotPossibleServerSideProps } from "@/util/authRedirect";

export const getServerSideProps: GetServerSideProps = authenticationNotPossibleServerSideProps("users");

export const SignUp = () => {
  return (
    <>
      <Header />
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            新規登録
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <SignUpForm />
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
