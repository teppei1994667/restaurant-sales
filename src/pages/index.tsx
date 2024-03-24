import { Header } from "@/components/Header";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Home = () => {
  const [isLoginStatus, setIsLoginStatus] = useState(false);

  useEffect(() => {
    if (Cookies.get("_access-token") && Cookies.get("_client") && Cookies.get("_uid")) {
      setIsLoginStatus(true);
    }
  }, []);

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
            <Link href="/SignIn">
              <Button className="text-gray-500 mt-20" variant="text" sx={{ height: "70px", width: "200px" }}>
                ログイン
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/SignUp">
              <Button
                className="text-gray-500 mt-20 ml-20"
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
