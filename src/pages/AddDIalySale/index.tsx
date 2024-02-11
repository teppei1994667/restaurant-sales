import { CreateDialySale } from "@/components/CreateDialySale";
import { DialySales } from "@/components/DialySales";
import { DialySalesContextProvider } from "@/context/DialySalesContext";
import { SelectDialySalesContextProvider } from "@/context/SelectDialySalesContext";
import { TotalDialySale } from "@/components/TotalDialySale";
import { DeleteButton } from "@/components/share/custom/DeleteButton";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { EditButton } from "@/components/share/custom/EditButton";
import { EditDialog } from "@/components/EditDialog";
import { DisplayDialySale } from "@/type/DialySale";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { InfomationDialog } from "@/components/share/custom/InfomationDialog";

export const AddDialySale = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInfomationDialogOpen, setIsInfomationDialogOpen] = useState(false);
  const [infomationKinds, setInfomationKinds] = useState("");
  const [infomationMessage, setInfomationMessage] = useState("");

  //チェックボックスで選択した行のデータを保持
  const [rowSelectionModelValue, setRowSelectionModelValue] = useState<DisplayDialySale>();

  //DialySalesを期間ごとに取得する為の値
  dayjs.locale(ja);
  const TODAY = dayjs().format("YYYY-MM-DD"); //当日日付文字列
  const BEGINING_OF_THE_MONTH = dayjs().startOf("month").format("YYYY-MM-DD"); //当月１日文字列
  const BEGINING_OF_THE_YEAR = dayjs().startOf("year").format("YYYY-MM-DD"); //当年１日文字列

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
                <Grid container spacing={0.75} className="justify-center mt-9">
                  <Grid item>
                    <DialySales firstDialySaleDay={BEGINING_OF_THE_YEAR} lastDialySaleDay={TODAY} />
                  </Grid>
                </Grid>
                <Grid container className="justify-center mt-9">
                  <Grid item>
                    <EditButton
                      setIsEditDialogOpen={setIsEditDialogOpen}
                      setIsInfomationDialogOpen={setIsInfomationDialogOpen}
                      setRowSelectionModelValue={setRowSelectionModelValue}
                      setInfomationKinds={setInfomationKinds}
                      setInfomationMessage={setInfomationMessage}
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
      <InfomationDialog
        isInfomationDialogOpen={isInfomationDialogOpen}
        setIsInfomationDialogOpen={setIsInfomationDialogOpen}
        infomationKinds={infomationKinds}
        infomationMessage={infomationMessage}
      />
    </>
  );
};

export default AddDialySale;
