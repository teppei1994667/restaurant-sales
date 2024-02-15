import { DialySale } from "@/type/DialySale";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DialySalesStateContext } from "../context/DialySalesContext";
import { SelectDialySalesContext } from "../context/SelectDialySalesContext";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";
import { convertDisplayDialySales } from "@/util/convertDisplayDialySales";
import applyCaseMiddleware from "axios-case-converter";

export type DialySalesProps = {
  startDialySaleDay?: string;
  endDialySaleDay?: string;
};

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = (props: DialySalesProps) => {
  const { startDialySaleDay, endDialySaleDay } = props;

  const { state, dispatch } = useContext(DialySalesStateContext);
  const { setRowSelectionModel } = useContext(SelectDialySalesContext);

  //axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
  const convertAxios = applyCaseMiddleware(axios.create());

  //DialySale一覧を取得する関数DialySale
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await convertAxios.get<DialySale[]>(LOCAL_DIALYSALES_ADDRESS, {
        //サーバーから取得するDialySaleの期間をparamsに設定
        params: {
          startDay: startDialySaleDay,
          endDay: endDialySaleDay,
        },
      });
      const fetchDialySales: DialySale[] = convertDisplayDialySales(res.data);
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
      field: "salesDay",
      headerName: "日",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lunchSales",
      headerName: "ランチ売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "dinnerSales",
      headerName: "ディナー売り上げ",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "totalSale",
      headerName: "売り上げ合計",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "lunchVisitor",
      headerName: "ランチ来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "dinnerVisitor",
      headerName: "ディナー来客数",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "totalVisitor",
      headerName: "来客数合計",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
      cellClassName: "total-column",
      headerClassName: "total-header",
    },
    {
      field: "personnelCost",
      headerName: "人件費",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "purchase",
      headerName: "仕入れ",
      type: "number",
      headerAlign: "center",
      minWidth: 140,
    },
  ];

  return (
    <>
      <DataGrid
        rows={state.dialySales}
        columns={columns}
        checkboxSelection //チェックボックス表示
        disableRowSelectionOnClick //セルまたは行クリック時に選択状態(チックボックスにチェックをいれる)を無効化
        //初期状態
        initialState={{
          //並び順を日付の若い順に設定
          sorting: {
            sortModel: [
              {
                field: "salesDay",
                sort: "asc",
              },
            ],
          },
        }}
        //選択状態を検知
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        sx={{
          width: "1310px",
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
        showCellVerticalBorder //ボーダー調整
        showColumnVerticalBorder //ボーダー調整
        hideFooter //フッター非表示
      />
    </>
  );
};
