import { CreateDialySale } from "@/components/CreateDialySale";
import { DialySales } from "@/components/DialySales";
import { EditDialog } from "@/components/EditDialog";
import { SearchDailySales } from "@/components/SearchDailySales";
import { TotalDialySale } from "@/components/TotalDialySale";
import { DeleteButton } from "@/components/share/custom/DeleteButton";
import { EditButton } from "@/components/share/custom/EditButton";
import { DialySale } from "@/type/DialySale";
import { Button, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import ja from "dayjs/locale/ja";
import { CirclesWithBar } from "react-loader-spinner";

export type AddDialySaleViewProps = {
  isLoading: boolean;
  isEditDialogOpen: boolean;
  isSearchDialySalesDispalay: boolean;
  rowSelectionModelValue?: DialySale;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRowSelectionModelValue: Dispatch<SetStateAction<DialySale | undefined>>;
  handleKikanShiteiOnClick: () => void;
};

export const AddDialySaleView = (props: AddDialySaleViewProps) => {
  const {
    isLoading,
    isEditDialogOpen,
    isSearchDialySalesDispalay,
    rowSelectionModelValue,
    setIsEditDialogOpen,
    setRowSelectionModelValue,
    handleKikanShiteiOnClick,
  } = props;

  //DialySalesを当月分のみ取得する為の値
  dayjs.locale(ja);
  const TODAY = dayjs().format("YYYY-MM-DD"); //当日日付文字列
  const BEGINING_OF_THE_MONTH = dayjs().startOf("month").format("YYYY-MM-DD"); //当月１日文字列
  return (
    <>
      <Paper elevation={0} className="pt-5">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-700 font-mono" variant="h3">
              売り上げ登録
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-9">
          <Grid item>
            <CreateDialySale />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-5">
          <Grid item>
            <Button onClick={handleKikanShiteiOnClick}>
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
            <Grid container className="justify-center mt-9">
              <Grid item>
                <EditButton
                  setIsEditDialogOpen={setIsEditDialogOpen}
                  setRowSelectionModelValue={setRowSelectionModelValue}
                />
              </Grid>
              <Grid item className="ml-5">
                <DeleteButton />
              </Grid>
            </Grid>
            <Grid container className="justify-center mt-9">
              <Grid item>
                <TotalDialySale />
              </Grid>
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