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
  // サーバー送信用のメールアドレスをCookiesより取得
  // const reqestUid = Cookies.get("_uid");
  // const reqestAccessToken = Cookies.get("_access-token")
  // const reqestClinet = Cookies.get("_client")

  console.log("props", props);

  // ユーザー情報を取得
  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get<UserInfo>(LOCAL_USER_ADRESS, {
  //       headers: {
  //         uid: Cookies.get("_uid"),
  //         client: Cookies.get("_client"),
  //         "access-token": Cookies.get("_access-token"),
  //       },
  //       params: { email: reqestUid },
  //     });
  //     console.log("res", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <>
      <Header loginStatus={true} />
      <Typography variant="h2">{props.name}</Typography>
    </>
  );
};

export default User;
