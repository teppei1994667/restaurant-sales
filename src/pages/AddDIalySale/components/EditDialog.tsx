import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { ControlledNumberTextField } from "../../../components/share/form/ControlledNumberTextField";
import { ControlledDatePicker } from "../../../components/share/form/ControlledDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import { FormDialySale, DialySale } from "@/type/DialySale";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { convertDialySaleAxios } from "@/util/convertAxios";
import { calculateTotalDialySales } from "../util/DialySaleUtil";
import { DialySaleContextActionType } from "../context/DialySalesContextReducer";
import {
  DialySalesContext,
  DialySalesDispatch,
} from "../context/DialySalesContextProvider";

export type EditDialogProps = {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  rowSelectionModelValue?: DialySale;
};

export const EditDialog = (props: EditDialogProps) => {
  const { isEditDialogOpen, setIsEditDialogOpen, rowSelectionModelValue } =
    props;

  const dialySaleContext = useContext(DialySalesContext);
  const dialySalesDspatch = useContext(DialySalesDispatch);

  //ReactHookForm以外ではsalesDayをstringで管理しているので再度Date型に変換する
  const stringSalesDayToDate = useMemo(() => {
    return rowSelectionModelValue
      ? new Date(rowSelectionModelValue.salesDay.substring(0, 10))
      : null;
  }, [rowSelectionModelValue]);

  const dialySaleEditForm = useForm<FormDialySale>({
    defaultValues: {
      salesDay: null,
      lunchSale: "",
      dinnerSale: "",
      lunchVisitor: "",
      dinnerVisitor: "",
      personnelCost: "",
      purchase: "",
    },
  });

  // 選択した行のデータをformにセットする
  useEffect(() => {
    dialySaleEditForm.setValue("salesDay", stringSalesDayToDate);
    dialySaleEditForm.setValue(
      "lunchSale",
      rowSelectionModelValue?.lunchSales.toString()
    );
    dialySaleEditForm.setValue(
      "dinnerSale",
      rowSelectionModelValue?.dinnerSales.toString()
    );
    dialySaleEditForm.setValue(
      "lunchVisitor",
      rowSelectionModelValue?.lunchVisitor.toString()
    );
    dialySaleEditForm.setValue(
      "dinnerVisitor",
      rowSelectionModelValue?.dinnerVisitor.toString()
    );
    dialySaleEditForm.setValue(
      "personnelCost",
      rowSelectionModelValue?.personnelCost.toString()
    );
    dialySaleEditForm.setValue(
      "purchase",
      rowSelectionModelValue?.purchase.toString()
    );
  }, [
    dialySaleEditForm,
    rowSelectionModelValue,
    isEditDialogOpen,
    stringSalesDayToDate,
  ]);

  // 保存ボタン押下時
  const handleUpdateDialySaleOnClick = async () => {
    if (rowSelectionModelValue) {
      const updateId = rowSelectionModelValue.id;
      try {
        const res = await convertDialySaleAxios.put(`/${updateId}`, {
          dialySale: {
            storeId: dialySaleContext.StoreModel?.id,
            salesDay: dialySaleEditForm.getValues("salesDay"),
            lunchSales: Number(dialySaleEditForm.getValues("lunchSale")),
            dinnerSales: Number(dialySaleEditForm.getValues("dinnerSale")),
            lunchVisitor: Number(dialySaleEditForm.getValues("lunchVisitor")),
            dinnerVisitor: Number(dialySaleEditForm.getValues("dinnerVisitor")),
            personnelCost: Number(dialySaleEditForm.getValues("personnelCost")),
            purchase: Number(dialySaleEditForm.getValues("purchase")),
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

        dialySalesDspatch({
          type: DialySaleContextActionType.UPDATE_SNACKBAR,
          payload: {
            isSnackBarOpen: true,
            snackBarText: "営業データを変更しました",
          },
        });
      } catch (error: any) {
        alert(error.response.data);
      }
      setIsEditDialogOpen(false);
    }
  };

  // 閉じるボタン押下時
  const handleEditButtonOnClick = () => {
    setIsEditDialogOpen(false);
    dialySaleEditForm.reset();
  };

  return (
    <FormProvider {...dialySaleEditForm}>
      <Dialog
        open={isEditDialogOpen}
        fullWidth
        maxWidth="xl"
        sx={{ textAlign: "center" }}
      >
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
                helperText={
                  dialySaleEditForm.formState.errors.lunchSale?.message
                }
              />
            </Grid>
            <Grid item className="ml-7 w-52">
              <ControlledNumberTextField
                name="dinnerSale"
                label="ディナー売り上げ"
                helperText={
                  dialySaleEditForm.formState.errors.dinnerSale?.message
                }
              />
            </Grid>
            <Grid container spacing={0.75} className="justify-center mt-5">
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="lunchVisitor"
                  label="ランチ来客数"
                  helperText={
                    dialySaleEditForm.formState.errors.lunchVisitor?.message
                  }
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="dinnerVisitor"
                  label="ディナー来客数"
                  helperText={
                    dialySaleEditForm.formState.errors.dinnerVisitor?.message
                  }
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="personnelCost"
                  label="人件費"
                  helperText={
                    dialySaleEditForm.formState.errors.personnelCost?.message
                  }
                />
              </Grid>
              <Grid item className="ml-7 w-52">
                <ControlledNumberTextField
                  name="purchase"
                  label="仕入れ"
                  helperText={
                    dialySaleEditForm.formState.errors.purchase?.message
                  }
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
              <Button
                variant="outlined"
                onClick={dialySaleEditForm.handleSubmit(
                  handleUpdateDialySaleOnClick
                )}
              >
                保存
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
