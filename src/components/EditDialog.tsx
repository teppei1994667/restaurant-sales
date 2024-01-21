import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { ControlledNumberTextField } from "./share/form/ControlledNumberTextField";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import { DialySaleEditFormType, DialySaleType } from "@/type/DialySale";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

export type EditDialogProps = {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  rowSelectionModelValue?: DialySaleType;
};

export const EditDialog = (props: EditDialogProps) => {
  const { isEditDialogOpen, setIsEditDialogOpen, rowSelectionModelValue } = props;

  //ReactHookForm以外ではdayをstringで管理しているので再度Date型に変換する
  const stringDayToDate = useMemo(() => {
    return rowSelectionModelValue ? new Date(rowSelectionModelValue.day.substring(0, 10)) : null;
  }, [rowSelectionModelValue]);

  const dialySaleEditForm = useForm<DialySaleEditFormType>({
    defaultValues: {
      day: null,
      lunchSale: undefined,
      dinnerSale: undefined,
      lunchVisitor: undefined,
      dinnerVisitor: undefined,
      lunchPersonnelCost: undefined,
      dinnerPersonnelCost: undefined,
      purchase: undefined,
    },
  });

  //選択した行のデータをformにセットする
  useEffect(() => {
    dialySaleEditForm.setValue("day", stringDayToDate);
    dialySaleEditForm.setValue("lunchSale", rowSelectionModelValue?.lunch_sales);
    dialySaleEditForm.setValue("dinnerSale", rowSelectionModelValue?.dinner_sales);
    dialySaleEditForm.setValue("lunchVisitor", rowSelectionModelValue?.lunch_visitor);
    dialySaleEditForm.setValue("dinnerVisitor", rowSelectionModelValue?.dinner_visitor);
    dialySaleEditForm.setValue("lunchPersonnelCost", rowSelectionModelValue?.lunch_personnel_cost);
    dialySaleEditForm.setValue("dinnerPersonnelCost", rowSelectionModelValue?.dinner_personnel_cost);
    dialySaleEditForm.setValue("purchase", rowSelectionModelValue?.purchase);
  }, [dialySaleEditForm, stringDayToDate, rowSelectionModelValue]);

  //EditDialog ×ボタン押下時
  const handleEditButtonOnClick = () => {
    setIsEditDialogOpen(false);
    dialySaleEditForm.reset;
  };

  return (
    <FormProvider {...dialySaleEditForm}>
      <Dialog open={isEditDialogOpen} fullWidth maxWidth="xl" sx={{ textAlign: "center" }}>
        <DialogTitle>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Grid container spacing={0.75}>
                <Grid item>
                  <Typography variant="h3">編集画面</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={0.75}>
                <Grid item>
                  <Button onClick={handleEditButtonOnClick}>×</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className="h-72">
          <Grid container spacing={0.75} className="justify-center mt-2">
            <Grid item className="w-52">
              <ControlledDatePicker name="day" label="日付" />
            </Grid>
            <Grid item className="ml-7 w-52">
              <ControlledNumberTextField name="lunchSale" label="ランチ売り上げ" />
            </Grid>
            <Grid item className="ml-7 w-52">
              <ControlledNumberTextField name="dinnerSale" label="ディナー売り上げ" />
            </Grid>
            <Grid container spacing={0.75} className="justify-center mt-5">
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField name="lunchVisitor" label="ランチ来客数" />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField name="dinnerVisitor" label="ディナー来客数" />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField name="lunchPersonnelCost" label="ランチー人件費" />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField name="dinnerPersonnelCost" label="ディナー人件費" />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField name="purchase" label="仕入れ" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="justify-center mt-10">
            <Grid item>
              <Button variant="outlined">保存</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
