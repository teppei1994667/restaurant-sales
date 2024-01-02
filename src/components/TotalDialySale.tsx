import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { DialySalesStateContext } from "./DialySalesContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const TotalDialySale = () => {
  const { state } = useContext(DialySalesStateContext);
  let totalLunchSale = 0;
  let totalDinnerSale = 0;
  let totalLunchVisitor = 0;
  let totalDinnerVisitor = 0;
  let totalLunchPersonnelCost = 0;
  let totalDinnerPersonnelCost = 0;
  let totalPurchase = 0;
  state.dialySales.map((dialySale) => {
    totalLunchSale += dialySale.lunch_sales;
    totalDinnerSale += dialySale.dinner_sales;
    totalLunchVisitor += dialySale.lunch_visitor;
    totalDinnerVisitor += dialySale.dinner_visitor;
    totalLunchPersonnelCost += dialySale.lunch_personnel_cost;
    totalDinnerPersonnelCost += dialySale.dinner_personnel_cost;
    totalPurchase += dialySale.purchase;
  });

  return (
    <>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ランチ売り上げ合計</Typography>
        </Grid>
        <Grid item>
          <Typography className="underline underline-offset-4" sx={{ textDecorationStyle: "dashed" }}>
            {totalLunchSale}円
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ディナー売り上げ合計</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalDinnerSale}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ランチ来客数合計</Typography>
        </Grid>
        <Grid item>{totalLunchVisitor}</Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ディナー来客数合計</Typography>
        </Grid>
        <Grid item>{totalDinnerVisitor}</Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ランチ人件費合計</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalLunchPersonnelCost}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>ディナー人件費合計</Typography>
        </Grid>
        <Grid item>{totalDinnerPersonnelCost}</Grid>
      </Grid>
      <Grid container spacing={0.75}>
        <Grid item>
          <Typography>仕入れ合計</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalPurchase}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
