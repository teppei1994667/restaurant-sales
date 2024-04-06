import { Header } from "@/components/Header";
import { noPossibleAuthServerSideProps } from "@/util/authRedirect";
import { Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useCallback, useEffect } from "react";
import { UserInfo } from "@/type/User";
import { LOCAL_USER_ADRESS } from "@/constants/serverAdress";
import Cookies from "js-cookie";

export const getServerSideProps: GetServerSideProps = noPossibleAuthServerSideProps("users");

export const User = (props: GetServerSideProps) => {
  console.log("props", props);

  return (
    <>
      <Header loginStatus={true} />
      <Typography variant="h2">{props.name}</Typography>
    </>
  );
};

export default User;
