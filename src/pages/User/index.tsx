import { Header } from "@/components/Header";
import { noPossibleAuthServerSideProps } from "@/util/authRedirect";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = noPossibleAuthServerSideProps("users");

export const User = () => {
  return (
    <>
      <Header />
      <Typography variant="h2">ここはユーザページです</Typography>
    </>
  );
};

export default User;
