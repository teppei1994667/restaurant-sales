import { Grid, Paper, Typography } from "@mui/material";

export const Home = () => {
  return (
    <>
      <Paper className="w-screen h-screen pt-5">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-700 font-mono" variant="h3">
              なお家売り上げ登録
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
