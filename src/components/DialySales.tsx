import { DialySaleType, ReturnDialySalesType } from "@/type/DialySale";
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
      dispatch({ type: "returnData", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされたタイミングでDailySale一覧を取得する関数を事項する
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
      minWidth: 200,
    },
    {
      field: "dinner_sales",
      headerName: "ディナー売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 200,
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
            backgroundColor: "#F7EDE2",
          },
          ".MuiDataGrid-columnHeader:focus-within": {
            outlineOffset: -3,
          },
        }}
        hideFooter
      />
    </>
  );
};
