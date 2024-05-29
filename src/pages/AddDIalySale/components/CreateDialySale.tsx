import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormDialySale } from "@/type/DialySale";
import { ControlledDatePicker } from "../../../components/share/form/ControlledDatePicker";
import { ControlledNumberTextField } from "../../../components/share/form/ControlledNumberTextField";
import { convertDialySaleAxios } from "@/util/convertAxios";
import { DialySalesContext, DialySalesDispatch } from "../context/DialySalesContextProvider";
import { useContext } from "react";
import { DialySaleContextActionType } from "../context/DIalySalesContextReducer";
import { calculateTotalDialySales } from "../util/DialySaleUtil";

export type CreateDialySaleProps = {};

export const CreateDialySale = (props: CreateDialySaleProps) => {
  const dialySasesContext = useContext(DialySalesContext);
  const dialySalesDispatch = useContext(DialySalesDispatch);

  //新規売り上げ作成をformで管理
  const dialySaleForm = useForm<FormDialySale>({
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

  //フォームの入力値を更新する関数(TODO: 各textFieldから返却される値がstringの為サーバーに送信する前にnumberに変換する)
  const handleMakeDialySaleOnClick = async () => {
    try {
      //apiを呼び出してDialySaleを作成する
      const res = await convertDialySaleAxios.post("/", {
        dialySale: {
          storeId: dialySasesContext.StoreModel?.id,
          salesDay: dialySaleForm.getValues("salesDay"),
          lunchSales: Number(dialySaleForm.getValues("lunchSale")),
          dinnerSales: Number(dialySaleForm.getValues("dinnerSale")),
          lunchVisitor: Number(dialySaleForm.getValues("lunchVisitor")),
          dinnerVisitor: Number(dialySaleForm.getValues("dinnerVisitor")),
          personnelCost: Number(dialySaleForm.getValues("personnelCost")),
          purchase: Number(dialySaleForm.getValues("purchase")),
        },
      });

      const totalDailySale = calculateTotalDialySales(res.data);

      dialySalesDispatch({
        type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
        payload: { dialySaleModels: res.data, totalDialySaleModel: totalDailySale },
      });

      dialySalesDispatch({
        type: DialySaleContextActionType.UPDATE_SNACKBAR,
        payload: { isSnackBarOpen: true, snackBarText: "新規営業データを追加しました。" },
      });

      dialySaleForm.reset();
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <FormProvider {...dialySaleForm}>
        <Grid container spacing={0.75} className="justify-center">
          <Grid item>
            <ControlledDatePicker
              name="salesDay"
              label="日付"
              helperText={dialySaleForm.formState.errors.salesDay?.message}
            />
          </Grid>
          <Grid item className="ml-7">
            <ControlledNumberTextField
              name="lunchSale"
              label="ランチ売り上げ"
              helperText={dialySaleForm.formState.errors.lunchSale?.message}
            />
          </Grid>
          <Grid item className="ml-7">
            <ControlledNumberTextField
              name="dinnerSale"
              label="ディナー売り上げ"
              helperText={dialySaleForm.formState.errors.dinnerSale?.message}
            />
          </Grid>
          <Grid container spacing={0.75} className="justify-center mt-3">
            <Grid item className="ml-7">
              <ControlledNumberTextField
                name="lunchVisitor"
                label="ランチ来客数"
                helperText={dialySaleForm.formState.errors.lunchVisitor?.message}
              />
            </Grid>
            <Grid item className="ml-7">
              <ControlledNumberTextField
                name="dinnerVisitor"
                label="ディナー来客数"
                helperText={dialySaleForm.formState.errors.dinnerVisitor?.message}
              />
            </Grid>
            <Grid item className="ml-7">
              <ControlledNumberTextField
                name="personnelCost"
                label="人件費"
                helperText={dialySaleForm.formState.errors.personnelCost?.message}
              />
            </Grid>
            <Grid item className="ml-7">
              <ControlledNumberTextField
                name="purchase"
                label="仕入れ"
                helperText={dialySaleForm.formState.errors.purchase?.message}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0.75} className="justify-center mt-5">
          <Grid item>
            <Button
              className="text-gray-500"
              variant="text"
              onClick={dialySaleForm.handleSubmit(handleMakeDialySaleOnClick)}
            >
              作成
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
