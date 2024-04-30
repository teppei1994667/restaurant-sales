import { Header } from "@/components/Header";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import testImage from "../../public/test.jpeg";
import Image from "next/image";

export const Home = () => {
  // ルートページはユーザー認証の有無関係なくアクセスできるためHeaderの状態を制御するためCookiesを取得
  const accessToken = Cookies.get("_access-token");
  const client = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  // ユーザーの認証状態を保持
  const [isLoginStatus, setIsLoginStatus] = useState(false);

  //Cookiesに値が
  useEffect(() => {
    if (accessToken && client && uid) {
      setIsLoginStatus(true);
    }
    if (!accessToken || !client || !uid) {
      setIsLoginStatus(false);
    }
  }, [accessToken, client, uid]);

  return (
    <>
      <Header loginStatus={isLoginStatus} />
      <Paper elevation={0} sx={{ height: "100vh" }}>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <Typography className="text-gray-500" variant="h4">
              DialySalesへようこそ
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center">
          <Grid item>
            <Image className="opacity-60 w-4/5 ml-7 mt-12" src={testImage} alt="テスト画像" />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-16">
          <Grid item>
            <Link href="/SignIn">
              <Button className="text-gray-500" variant="text" sx={{ height: "70px", width: "200px" }}>
                ログイン
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/SignUp">
              <Button
                className="text-gray-500 ml-20"
                variant="text"
                sx={{ height: "70px", width: "200px", color: "#6B7280" }}
              >
                新規登録
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
