import { CreateDialySale } from "@/components/CreateDialySale";
import { DialySales } from "@/components/DialySales";
import { DialySalesContextProvider } from "@/context/DialySalesContext";
import { SelectDialySalesContextProvider } from "@/context/SelectDialySalesContext";
import { TotalDialySale } from "@/components/TotalDialySale";
import { DeleteButton } from "@/components/share/custom/DeleteButton";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { EditButton } from "@/components/share/custom/EditButton";
import { EditDialog } from "@/components/EditDialog";
import { DialySale } from "@/type/DialySale";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { SearchDailySales } from "@/components/SearchDailySales";
import { GetServerSideProps } from "next";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const AddDialySale = (props: GetServerSideProps) => {
  console.log("AddDialySale", props);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSearchDialySalesDispalay, setIsSearchDialySalesDispalay] = useState(false);

  //チェックボックスで選択した行のデータを保持
  const [rowSelectionModelValue, setRowSelectionModelValue] = useState<DialySale>();

  //DialySalesを当月分のみ取得する為の値
  dayjs.locale(ja);
  const TODAY = dayjs().format("YYYY-MM-DD"); //当日日付文字列
  const BEGINING_OF_THE_MONTH = dayjs().startOf("month").format("YYYY-MM-DD"); //当月１日文字列

  //「期間を指定して表示する」押下時
  const handleKikanShiteiOnClick = () => {
    setIsSearchDialySalesDispalay((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <DialySalesContextProvider>
        <SelectDialySalesContextProvider>
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
                  <CirclesWithBar
                    height="80"
                    width="80"
                    color="gray"
                    ariaLabel="three-dots-loading"
                    wrapperClass="mt-20"
                  />
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
        </SelectDialySalesContextProvider>
      </DialySalesContextProvider>
    </>
  );
};

export default AddDialySale;
