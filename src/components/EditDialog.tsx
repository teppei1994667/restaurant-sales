import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { ControlledNumberTextField } from "./share/form/ControlledNumberTextField";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import { FormDialySale, DisplayDialySale } from "@/type/DialySale";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import axios from "axios";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";

export type EditDialogProps = {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  rowSelectionModelValue?: DisplayDialySale;
};

export const EditDialog = (props: EditDialogProps) => {
  const { isEditDialogOpen, setIsEditDialogOpen, rowSelectionModelValue } = props;

  //ReactHookForm以外ではdayをstringで管理しているので再度Date型に変換する
  const stringDayToDate = useMemo(() => {
    return rowSelectionModelValue ? new Date(rowSelectionModelValue.salesDay.substring(0, 10)) : null;
  }, [rowSelectionModelValue]);

  const dialySaleEditForm = useForm<FormDialySale>({
    defaultValues: {
      salesDay: null,
      lunchSale: undefined,
      dinnerSale: undefined,
      lunchVisitor: undefined,
      dinnerVisitor: undefined,
      personnelCost: undefined,
      purchase: undefined,
    },
  });

  // 選択した行のデータをformにセットする
  useEffect(() => {
    dialySaleEditForm.setValue("salesDay", stringDayToDate);
    dialySaleEditForm.setValue("lunchSale", rowSelectionModelValue?.lunchSales);
    dialySaleEditForm.setValue("dinnerSale", rowSelectionModelValue?.dinnerSales);
    dialySaleEditForm.setValue("lunchVisitor", rowSelectionModelValue?.lunchVisitor);
    dialySaleEditForm.setValue("dinnerVisitor", rowSelectionModelValue?.dinnerVisitor);
    dialySaleEditForm.setValue("personnelCost", rowSelectionModelValue?.personnelCost);
    dialySaleEditForm.setValue("purchase", rowSelectionModelValue?.purchase);
  }, [dialySaleEditForm, rowSelectionModelValue, isEditDialogOpen, stringDayToDate]);

  // 保存ボタン押下時
  const handleUpdateDIalySaleOnClick = async () => {
    if (rowSelectionModelValue) {
      const updateId = rowSelectionModelValue.id;
      try {
        await axios.put(`${LOCAL_DIALYSALES_ADDRESS}/${updateId}`, {
          dialy_sale: {
            sales_day: dialySaleEditForm.getValues("salesDay"),
            lunch_sales: dialySaleEditForm.getValues("lunchSale"),
            dinner_sales: dialySaleEditForm.getValues("dinnerSale"),
            lunch_visitor: dialySaleEditForm.getValues("lunchVisitor"),
            dinner_visitor: dialySaleEditForm.getValues("dinnerVisitor"),
            personnel_cost: dialySaleEditForm.getValues("personnelCost"),
            purchase: dialySaleEditForm.getValues("purchase"),
          },
        });
      } catch (error) {
        console.error(error);
      }
      setIsEditDialogOpen(false);
      window.location.reload();
      //TODO: 画面がリロードされてるから意味ないかもやけどいつかのされ無い実装の為に
      dialySaleEditForm.reset();
    }
  };

  // 閉じるボタン押下時
  const handleEditButtonOnClick = () => {
    setIsEditDialogOpen(false);
    dialySaleEditForm.reset();
  };

  return (
    <FormProvider {...dialySaleEditForm}>
      <Dialog open={isEditDialogOpen} fullWidth maxWidth="xl" sx={{ textAlign: "center" }}>
        <DialogTitle>
          <Grid container spacing={0.75} justifyContent="center">
            <Grid item>
              <Typography variant="h3">編集画面</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className="h-72">
          <Grid container spacing={0.75} className="justify-center mt-2">
            <Grid item className="w-52">
              <ControlledDatePicker name="salesDay" label="日付" />
            </Grid>
            <Grid item className="ml-7 w-52">
              <ControlledNumberTextField
                name="lunchSale"
                label="ランチ売り上げ"
                helperText={dialySaleEditForm.formState.errors.lunchSale?.message}
              />
            </Grid>
            <Grid item className="ml-7 w-52">
              <ControlledNumberTextField
                name="dinnerSale"
                label="ディナー売り上げ"
                helperText={dialySaleEditForm.formState.errors.dinnerSale?.message}
              />
            </Grid>
            <Grid container spacing={0.75} className="justify-center mt-5">
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="lunchVisitor"
                  label="ランチ来客数"
                  helperText={dialySaleEditForm.formState.errors.lunchVisitor?.message}
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="dinnerVisitor"
                  label="ディナー来客数"
                  helperText={dialySaleEditForm.formState.errors.dinnerVisitor?.message}
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="personnelCost"
                  label="人件費"
                  helperText={dialySaleEditForm.formState.errors.personnelCost?.message}
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="purchase"
                  label="仕入れ"
                  helperText={dialySaleEditForm.formState.errors.purchase?.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="justify-center mt-10">
            <Grid item>
              <Button variant="outlined" onClick={handleEditButtonOnClick}>
                閉じる
              </Button>
            </Grid>
            <Grid item className="ml-5">
              <Button variant="outlined" onClick={dialySaleEditForm.handleSubmit(handleUpdateDIalySaleOnClick)}>
                保存
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
