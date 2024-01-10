import { DialySaleType } from "@/type/DialySale";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DialySalesStateContext } from "./DialySalesContext";
import { Paper } from "@mui/material";
import { SelectDialySalesContext } from "./SelectDialySalesContext";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = () => {
  //DialySale一覧をreducerで管理
  const { state, dispatch } = useContext(DialySalesStateContext);
  const { setRowSelectionModel } = useContext(SelectDialySalesContext);

  //サーバーから取得した値の各合計値を計算して返却
  const totalCalculation = (fetchData: DialySaleType[]): DialySaleType[] => {
    const _dialySales = fetchData.map((item) => {
      const totalSale = item.lunch_sales + item.dinner_sales;
      const totalVisitor = item.lunch_visitor + item.dinner_visitor;
      const totalPersonalCost = item.lunch_personnel_cost + item.dinner_personnel_cost;
      item.total_sale = totalSale;
      item.total_visitor = totalVisitor;
      item.total_personal_cost = totalPersonalCost;
      return item;
    });
    return _dialySales;
  };

  //DialySale一覧を取得する関数
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await axios.get<DialySaleType[]>(LOCAL_DIALYSALES_ADDRESS);
      const fetchDialySales: DialySaleType[] = totalCalculation(res.data);
      dispatch({ type: "returnData", payload: fetchDialySales });
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされたタイミングでDailySale一覧を取得する関数を実行する
  useEffect(() => {
    fetchDialySales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      minWidth: 120,
    },
    {
      field: "dinner_sales",
      headerName: "ディナー売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 130,
    },
    {
      field: "total_sale",
      headerName: "売り上げ合計",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "lunch_visitor",
      headerName: "ランチ来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
    },
    {
      field: "dinner_visitor",
      headerName: "ディナー来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
    },
    {
      field: "total_visitor",
      headerName: "来客数合計",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "lunch_personnel_cost",
      headerName: "ランチ人件費",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
    },
    {
      field: "dinner_personnel_cost",
      headerName: "ディナー人件費",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
    },
    {
      field: "total_personal_cost",
      headerName: "人件費合計",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "purchase",
      headerName: "仕入れ",
      type: "number",
      headerAlign: "center",
      minWidth: 120,
    },
  ];

  return (
    <>
      <Paper elevation={0}>
        <DataGrid
          rows={state.dialySales}
          columns={columns}
          showCellVerticalBorder
          showColumnVerticalBorder
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: "day",
                  sort: "asc",
                },
              ],
            },
          }}
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
          disableRowSelectionOnClick
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
        />
      </Paper>
    </>
  );
};
