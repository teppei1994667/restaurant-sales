import { DialySale } from "@/components/DIalySale";
import { DialySales } from "@/components/DialySales";
import { Grid, Paper, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Paper className="bg-blue-100 w-screen h-screen pt-5">
      <Grid container className="justify-center">
        <Grid item>
          <Typography className="text-gray-700 font-mono" variant="h3">
            売り上げ管理
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center mt-9">
        <Grid item></Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
