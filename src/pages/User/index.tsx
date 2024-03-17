import { withAuthServerSideProps } from "@/util/authRedirect";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("users");

export const User = () => {
  console.log("Cookies._access_token", Cookies.get("_access_token"));
  console.log("Cookies._client", Cookies.get("_client"));
  console.log("Cookies._uid", Cookies.get("_uid"));
  return (
    <>
      <Typography variant="h2">ここはユーザページです</Typography>
    </>
  );
};

export default User;
