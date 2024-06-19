import { DialySale } from "@/type/DialySale";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DialySalesContext,
  DialySalesDispatch,
} from "../context/DialySalesContextProvider";
import { convertDialySaleAxios } from "@/util/convertAxios";
import { Grid, Typography } from "@mui/material";
import { DialySaleContextActionType } from "@/pages/AddDialySale/context/DialySalesContextReducer";
import { DialySalesConst } from "../const/DialySalesConst";
import { calculateTotalDialySales } from "../util/DialySaleUtil";

export type DialySalesProps = {};

//売り上げ一覧を取得し表示するコンポーネント
export const DialySales = (props: DialySalesProps) => {
  const dialySalesContext = useContext(DialySalesContext);
  const dialySalesDspatch = useContext(DialySalesDispatch);

  //DialySale一覧を取得する関数DialySale
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await convertDialySaleAxios.get<DialySale[]>("/", {
        //サーバーから取得するDialySaleの期間をparamsに設定
        params: {
          storeId: dialySalesContext.StoreModel?.id,
        },
      });

      // totalDialySaleを計算
      const totalDialySale = calculateTotalDialySales(res.data);

      dialySalesDspatch({
        type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
        payload: {
          dialySaleModels: res.data,
          totalDialySaleModel: totalDialySale,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされたタイミングでDialySale一覧を取得する関数を実行する
  useEffect(() => {
    fetchDialySales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialySalesContext.StoreModel?.id]);

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

  // DataGridのrowデータ作成
  const DialySaleRowData = useMemo(
    () =>
      dialySalesContext.DialySaleModels
        ? dialySalesContext.DialySaleModels
        : [],
    [dialySalesContext.DialySaleModels]
  );

  // DataGridのwidth
  const dialySalesDataGridWidth =
    DialySaleRowData.length > DialySalesConst.DATAGRID_MAX_ROW_COUNT
      ? 1327
      : 1312;

  // DataGridのheight
  const dialySalesDataGridHeight =
    DialySaleRowData.length > DialySalesConst.DATAGRID_MAX_ROW_COUNT
      ? DialySalesConst.DATAGRID_MAX_HEIGHT
      : DialySaleRowData.length * DialySalesConst.DATAGRID_ROW_HEIGHT +
        DialySalesConst.DATAGRID_HEADER_HEIGHT;

  return (
    <>
      <Grid container>
        <Grid
          item
          sx={{
            height: `${dialySalesDataGridHeight}px`,
            width: `${dialySalesDataGridWidth}px`,
          }}
        >
          <DataGrid
            rows={DialySaleRowData}
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
              dialySalesDspatch({
                type: DialySaleContextActionType.SELECT_GRID_ROW_MODEL,
                payload: { gridRowSelected: newRowSelectionModel },
              });
            }}
            sx={{
              hight: "600px",
              color: "gray",
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
            density="compact"
          />
        </Grid>
      </Grid>
      <Grid container className="mt-3" sx={{ width: dialySalesDataGridWidth }}>
        <Grid
          item
          className="text-gray-500"
          sx={{ width: "140px", textAlign: "center", marginLeft: "50px" }}
        >
          <Typography className="text-gray-500" variant="subtitle1">
            合計
          </Typography>
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalLunchSale.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalDinnerSale.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥{dialySalesContext.TotalDialySaleModel?.totalSale.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalLunchVisitor.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalDinnerVisitor.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalVisitor.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalPersonnelCost.toLocaleString()}
        </Grid>
        <Grid
          item
          className="text-gray-500"
          sx={{
            width: "140px",
            height: "52px",
            textAlign: "right",
            paddingRight: "9px",
          }}
        >
          ¥
          {dialySalesContext.TotalDialySaleModel?.totalPurchase.toLocaleString()}
        </Grid>
      </Grid>
    </>
  );
};
