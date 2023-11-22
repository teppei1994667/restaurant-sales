import { Grid, Typography } from "@mui/material";
import { DialySaleType } from "../type/DialySale";

// 1日の売り上げを表示するコンポーネント
export const DialySale = ({ dialySale }: { dialySale: DialySaleType }) => {
  return (
    <>
      <Grid container>
        <Grid item className="">
          <Typography variant="h6">{String(dialySale.day)}</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">{dialySale.lunch_sales}</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">{dialySale.dinner_sales}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
