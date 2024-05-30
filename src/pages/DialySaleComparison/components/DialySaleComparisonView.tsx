import { Grid, Paper, Typography } from "@mui/material";

export const DialySaleComparisonView = () => {
  return (
    <>
      <Paper elevation={0} className="mt-10">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              売り上げデータの比較
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
