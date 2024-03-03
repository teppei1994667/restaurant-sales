import { User } from "@/type/User";
import { getCurrentUser } from "@/util/auth";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Home = () => {
  return (
    <Paper elevation={0} sx={{ height: "100vh" }}>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography variant="h4">売り上げ管理アプリDialySalesへようこそ</Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Link href="/SignIn">
            <Button className="mt-20" variant="outlined" sx={{ height: "70px", width: "200px" }}>
              ログイン
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/SignUp">
            <Button className="mt-20 ml-20" variant="outlined" sx={{ height: "70px", width: "200px" }}>
              新規登録
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
    // shopページに再実装予定
    // <Paper elevation={0} sx={{ height: "100vh" }}>
    //   <Grid container className="justify-center">
    //     <Grid item>
    //       <Typography className="text-gray-700 font-mono" variant="h3">
    //         なお家売り上げ登録
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   <Grid container className="justify-center">
    //     <Grid item>
    //       <Link href="/AddDialySale">
    //         <Button className="mt-20" variant="outlined" sx={{ height: "70px", width: "200px" }}>
    //           売り上げ登録
    //         </Button>
    //       </Link>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

export default Home;
