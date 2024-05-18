import { CreateDialySale } from "@/pages/AddDialySale/components/CreateDialySale";
import { DialySales } from "@/pages/AddDialySale/components/DialySales";
import { EditDialog } from "@/pages/AddDialySale/components/EditDialog";
import { SearchDailySales } from "@/pages/AddDialySale/components/SearchDailySales";
import { DialySale } from "@/type/DialySale";
import { Button, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useContext } from "react";
import ja from "dayjs/locale/ja";
import { CirclesWithBar } from "react-loader-spinner";
import { DialySalesContext } from "../context/DialySalesContextProvider";

export type AddDialySaleViewProps = {
  isLoading: boolean;
  isEditDialogOpen: boolean;
  isSearchDialySalesDispalay: boolean;
  rowSelectionModelValue?: DialySale;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleKikanShiteiOnClick: () => void;
  handleEditBtnOnClick: () => void;
  handleDeleteOnClick: () => void;
};

export const AddDialySaleView = (props: AddDialySaleViewProps) => {
  const {
    isLoading,
    isEditDialogOpen,
    isSearchDialySalesDispalay,
    rowSelectionModelValue,
    setIsEditDialogOpen,
    handleKikanShiteiOnClick,
    handleEditBtnOnClick,
    handleDeleteOnClick,
  } = props;

  const dialySaleContext = useContext(DialySalesContext);

  //DialySalesを当月分のみ取得する為の値
  dayjs.locale(ja);
  const TODAY = dayjs().format("YYYY-MM-DD"); //当日日付文字列
  const BEGINING_OF_THE_MONTH = dayjs().startOf("month").format("YYYY-MM-DD"); //当月１日文字列
  return (
    <>
      <Paper elevation={0} className="">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              {dialySaleContext.StoreModel?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              売り上げ登録
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <CreateDialySale />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-2">
          <Grid item>
            <Button className="text-gray-500" variant="text" onClick={handleKikanShiteiOnClick}>
              {isSearchDialySalesDispalay ? "隠す" : "期間を指定して表示する"}
            </Button>
          </Grid>
        </Grid>
        {isSearchDialySalesDispalay ? (
          <Grid container className="justify-center mt-3">
            <Grid item>
              <SearchDailySales />
            </Grid>
          </Grid>
        ) : null}
        {isLoading ? (
          <Grid container className="justify-center mt-9">
            <Grid item>
              <CirclesWithBar height="80" width="80" color="gray" ariaLabel="three-dots-loading" wrapperClass="mt-20" />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={0.75} className="justify-center mt-3">
              <Grid item>
                <DialySales startDialySaleDay={BEGINING_OF_THE_MONTH} endDialySaleDay={TODAY} />
              </Grid>
            </Grid>
            <Grid container className="justify-center mt-3">
              <Grid item>
                <Button className="text-gray-500" variant="text" onClick={handleEditBtnOnClick}>
                  変更
                </Button>
              </Grid>
              <Button className="text-gray-500" variant="text" onClick={handleDeleteOnClick}>
                削除
              </Button>
            </Grid>
          </>
        )}
      </Paper>
      <EditDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        rowSelectionModelValue={rowSelectionModelValue}
      />
    </>
  );
};
