import { Grid, Typography } from "@mui/material";
import { DialySaleType } from "../type/DialySale";

// 1日の売り上げを表示するコンポーネント
export const DialySale = ({ dialySale }: { dialySale: DialySaleType }) => {
  return (
    <>
      <Grid container>
        <Grid item className="">
          <Typography variant="h6">2023/11/22</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">39300</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">68700</Typography>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item className="ml-11">
          <Typography variant="h6">{String(dialy_sale.day)}</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">{dialy_sale.lunch_sales}</Typography>
        </Grid>
        <Grid item className="ml-11">
          <Typography variant="h6">{dialy_sale.dinner_sales}</Typography>
        </Grid>
      </Grid> */}
    </>
  );
};
