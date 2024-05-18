import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormDialySale } from "@/type/DialySale";
import { ControlledDatePicker } from "../../../components/share/form/ControlledDatePicker";
import { ControlledNumberTextField } from "../../../components/share/form/ControlledNumberTextField";
import { convertDialySaleAxios } from "@/util/convertAxios";
import { DialySalesContext } from "../context/DialySalesContextProvider";
import { useContext } from "react";

export const CreateDialySale = () => {
  const dialySaleContext = useContext(DialySalesContext);
  //新規売り上げ作成をformで管理
  const dialySaleForm = useForm<FormDialySale>({
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

  //フォームの入力値を更新する関数(TODO: 各textFieldから返却される値がstringの為サーバーに送信する前にnumberに変換する)
  const handleMakeDialySaleOnClick = async () => {
    try {
      //apiを呼び出してDialySaleを作成する
      await convertDialySaleAxios.post("/", {
        dialySale: {
          storeId: dialySaleContext.StoreModel?.id,
          salesDay: dialySaleForm.getValues("salesDay"),
          lunchSales: Number(dialySaleForm.getValues("lunchSale")),
          dinnerSales: Number(dialySaleForm.getValues("dinnerSale")),
          lunchVisitor: Number(dialySaleForm.getValues("lunchVisitor")),
          dinnerVisitor: Number(dialySaleForm.getValues("dinnerVisitor")),
          personnelCost: Number(dialySaleForm.getValues("personnelCost")),
          purchase: Number(dialySaleForm.getValues("purchase")),
        },
      });

      //dialySaleの作成に成功したらformの値をリセット
      //TODO: 画面がリロードされてるから意味ないかもやけどいつかのされ無い実装の為に
      dialySaleForm.reset();

      //dialySaleの作成に成功したら画面を更新する
      window.location.reload();
    } catch (error) {
      console.log(error);
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
        <Grid container spacing={0.75} className="justify-center mt-2">
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
