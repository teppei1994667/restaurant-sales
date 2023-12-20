import { DialySaleType } from "@/type/DialySale";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DialySalesStateContext } from "./DialySalesContext";

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = () => {
  //DialySale一覧をreducerで管理
  const { state, dispatch } = useContext(DialySalesStateContext);

  //DialySale一覧を取得する関数
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await axios.get<DialySaleType[]>("http://localhost:3000/dialy_sales");
      const fetchDialySales: DialySaleType[] = res.data.map((item) => {
        const totalSale = (item.total_sale = item.lunch_sales + item.dinner_sales);
        item.total_sale = totalSale;
        return item;
      });
      dispatch({ type: "returnData", payload: fetchDialySales });
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされたタイミングでDailySale一覧を取得する関数を実行する
  useEffect(() => {
    fetchDialySales();
  }, []);

  //データグリッドのカラム(列)情報
  const columns: GridColDef[] = [
    {
      field: "day",
      headerName: "日",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lunch_sales",
      headerName: "ランチ売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "dinner_sales",
      headerName: "ディナー売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "total_sale",
      headerName: "売り上げ合計",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "lunch_visitor",
      headerName: "ランチ来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "dinner_visitor",
      headerName: "ディナー来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "visitor_total",
      headerName: "来客数合計",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "lunch_personnel_cost",
      headerName: "ランチ人件費",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "dinner_personnel_cost",
      headerName: "ディナー人件費",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "personnel_cost_total",
      headerName: "人件費合計",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "purchase",
      headerName: "仕入れ",
      type: "number",
      headerAlign: "center",
      minWidth: 150,
    },
  ];

  console.log("dialySales", state);

  return (
    <>
      <DataGrid
        rows={state.dialySales}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        sx={{
          width: "80vw",
          minHeight: "500px",
          maxHight: "80vh",
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#fffaf0",
          },
          ".MuiDataGrid-columnHeader:focus-within": {
            outlineOffset: -3,
          },
          ".total-column": {
            background: "#f8f8ff",
          },
          ".total-header": {
            background: "#faebd7",
          },
        }}
        hideFooter
      />
    </>
  );
};
