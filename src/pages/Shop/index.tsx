import { Button, Grid, Link, Paper, Typography } from "@mui/material";

export const Shop = () => {
  return (
    <Paper elevation={0} sx={{ height: "100vh" }}>
      <Grid container className="justify-center">
        <Grid item>
          <Typography className="text-gray-700 font-mono" variant="h3">
            売り上げ登録
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
  );
};
