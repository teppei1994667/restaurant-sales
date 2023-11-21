import { Grid, Typography } from "@mui/material";
import { DialySaleType } from "../type/DialySale";

// 1日の売り上げを表示するコンポーネント
export const DialySale = ({ dialy_sale }: { dialy_sale: DialySaleType }) => {
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography variant="body1">{String(dialy_sale.day)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{dialy_sale.lunch_sales}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{dialy_sale.dinner_sales}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
