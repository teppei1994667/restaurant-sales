import { Header } from "@/components/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

export const Home = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
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
      </AuthContextProvider>
    </>
  );
};

export default Home;
