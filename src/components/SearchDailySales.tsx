import { Button, Grid, Typography } from "@mui/material";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import { SearchDialySales } from "@/type/DialySale";

export const SearchDailySales = () => {
  const searchDialySalesForm = useForm<SearchDialySales>({
    defaultValues: {
      startDay: null,
      endDay: null,
    },
  });
  return (
    <>
      <FormProvider {...searchDialySalesForm}>
        <Grid container spacing={0.75} alignItems="center">
          <Grid item>
            <ControlledDatePicker name="startDay" />
          </Grid>
          <Grid item>
            <Typography>〜</Typography>
          </Grid>
          <Grid item>
            <ControlledDatePicker name="endDay" />
          </Grid>
          <Grid item>
            <Button variant="outlined" className="ml-5">
              表示
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
