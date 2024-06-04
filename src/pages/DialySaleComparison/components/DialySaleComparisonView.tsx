import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { DialySaleComparisonContext } from "../context/DIalySaleConparisonContextProvider";

export const DialySaleComparisonView = () => {
  const dialySaleComparisonContext = useContext(DialySaleComparisonContext);

  console.log("dialySaleComparisonContext", dialySaleComparisonContext);
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
