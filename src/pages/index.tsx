import { Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

export const Home = () => {
  return (
    // <>
    <Paper elevation={0} sx={{ height: "100vh" }}>
      <Grid container className="justify-center">
        <Grid item>
          <Typography className="text-gray-700 font-mono" variant="h3">
            なお家売り上げ登録
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center">
        <Grid item>
          <Link href="/AddDialySale">
            <Button className="mt-20" variant="outlined" sx={{ height: "70px", width: "200px" }}>
              売り上げ登録
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
    // </>
  );
};

export default Home;
