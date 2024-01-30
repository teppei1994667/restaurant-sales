import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { FormDialySale } from "@/type/DialySale";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";
import { ControlledNumberTextField } from "./share/form/ControlledNumberTextField";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";

export const CreateDialySale = () => {
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
      await axios.post(LOCAL_DIALYSALES_ADDRESS, {
        dialy_sale: {
          sales_day: dialySaleForm.getValues("salesDay"),
          lunch_sales: Number(dialySaleForm.getValues("lunchSale")),
          dinner_sales: Number(dialySaleForm.getValues("dinnerSale")),
          lunch_visitor: Number(dialySaleForm.getValues("lunchVisitor")),
          dinner_visitor: Number(dialySaleForm.getValues("dinnerVisitor")),
          personnel_cost: Number(dialySaleForm.getValues("personnelCost")),
          purchase: Number(dialySaleForm.getValues("purchase")),
        },
      });
      console.log("createDialySale lunchSale", typeof Number(dialySaleForm.getValues("lunchSale")));

      //dialySaleの作成に成功したらformの値をリセット
      //TODO: 画面がリロードされてるから意味ないかもやけどいつかのされ無い実装の為に
      dialySaleForm.reset();

      //dialySaleの作成に成功したら画面を更新する
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //作成ボタン押下時のテスト用関数
  // const handleMakeDialySaleOnClickTest = () => {
  //   console.log("作成テスト", dialySaleForm.getValues());
  // };

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
          <Grid container spacing={0.75} className="justify-center mt-5">
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
            <Button variant="outlined" onClick={dialySaleForm.handleSubmit(handleMakeDialySaleOnClick)}>
              作成
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
