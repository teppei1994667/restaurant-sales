import { Header } from "@/components/Header";
import { Grid, Typography } from "@mui/material";
import { SignUpForm } from "./components/SignUpForm";
import { useCallback, useContext, useEffect } from "react";
import router from "next/router";
import { GetServerSideProps } from "next";
import { possibleAuthServerSideProps } from "@/util/authRedirect";

export const getServerSideProps: GetServerSideProps = possibleAuthServerSideProps("users");

export const SignUp = () => {
  return (
    <>
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
    </>
  );
};

export default SignUp;
