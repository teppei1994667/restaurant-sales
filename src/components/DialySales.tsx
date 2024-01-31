import { GetFromSeverDialySale, DisplayDialySale } from "@/type/DialySale";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DialySalesStateContext } from "../context/DialySalesContext";
import { SelectDialySalesContext } from "../context/SelectDialySalesContext";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";

export type DialySalesProps = {
  dayParams?: string;
};

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = (props: DialySalesProps) => {
  const { dayParams } = props;
  //DialySale一覧をreducerで管理
  const { state, dispatch } = useContext(DialySalesStateContext);
  const { setRowSelectionModel } = useContext(SelectDialySalesContext);

  //サーバーから取得したISO8601規格のsalesDayをDialySalesでの表示形式に変換して返却する
  const salesDayFormatToDisplay = (_saleDay: Date): string => {
    const salesDayToDate = new Date(_saleDay);
    return salesDayToDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  //サーバーから取得した値とsalesDayをDate型に変換した値とその各合計値を計算して画面表示の形式に変換
  const convertDisplayDialySales = (fetchData: GetFromSeverDialySale[]): DisplayDialySale[] => {
    const displayDialySales = fetchData.map((data) => {
      const convertFetchData: DisplayDialySale = {} as DisplayDialySale;
      convertFetchData.id = data.id;
      convertFetchData.salesDay = salesDayFormatToDisplay(data.sales_day);
      convertFetchData.lunchSales = data.lunch_sales;
      convertFetchData.dinnerSales = data.dinner_sales;
      convertFetchData.lunchVisitor = data.lunch_visitor;
      convertFetchData.dinnerVisitor = data.dinner_visitor;
      convertFetchData.personnelCost = data.personnel_cost;
      convertFetchData.purchase = data.purchase;
      convertFetchData.totalSale = data.lunch_sales + data.dinner_sales;
      convertFetchData.totalVisitor = data.lunch_visitor + data.dinner_visitor;
      return convertFetchData;
    });
    return displayDialySales;
  };

  //DialySale一覧を取得する関数
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await axios.get<GetFromSeverDialySale[]>(
        LOCAL_DIALYSALES_ADDRESS
        //   , {
        //   params: {
        //     day: dayParams,
        //   },
        // }
      );
      const fetchDialySales: DisplayDialySale[] = convertDisplayDialySales(res.data);
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
