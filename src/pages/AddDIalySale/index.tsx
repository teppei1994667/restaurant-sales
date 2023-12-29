import { CreateDialySaleForm } from "@/components/CreateDialySaleForm";
import { DialySales } from "@/components/DialySales";
import { DialySalesContextProvider } from "@/components/DialySalesContext";
import { Grid, Paper, Typography } from "@mui/material";

export const AddDialySale = () => {
  return (
    <>
      <DialySalesContextProvider>
        <Paper className="w-screen h-screen pt-5">
          <Grid container className="justify-center">
            <Grid item>
              <Typography className="text-gray-700 font-mono" variant="h3">
                売り上げ登録
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="justify-center mt-9">
            <Grid item>
              <CreateDialySaleForm />
            </Grid>
          </Grid>

          <Grid container className="justify-center mt-9">
            <Grid item>
              <DialySales />
            </Grid>
          </Grid>
        </Paper>
      </DialySalesContextProvider>
    </>
  );
};

export default AddDialySale;
