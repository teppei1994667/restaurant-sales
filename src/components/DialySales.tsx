import { DialySaleType } from "@/type/DialySale";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = () => {
  //DialySale一覧を管理するstate
  const [dialySales, setDialySales] = useState<DialySaleType[]>([]);

  //DialySale一覧を取得する関数
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await axios.get<DialySaleType[]>(
        "http://localhost:3000/dialy_sales"
      );
      setDialySales(res.data);
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
      width: 200,
    },
    {
      field: "dinner_sales",
      headerName: "ディナー売り上げ",
      type: "number",
      headerAlign: "center",
      width: 200,
    },
  ];

  console.log("dialySales", dialySales);

  return (
    <>
      <DataGrid
        rows={dialySales}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        sx={{
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
