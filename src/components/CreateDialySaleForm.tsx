import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { DialySaleFormType } from "@/type/DialySale";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";
import { ControlledNumberTextField } from "./share/form/ControlledNumberTextField";

export const CreateDialySaleForm = () => {
  //新規売り上げ作成をformで管理
  const dialySaleForm = useForm<DialySaleFormType>({
    defaultValues: {
      day: null,
      lunchSale: "",
      dinnerSale: "",
      lunchVisitor: "",
      dinnerVisitor: "",
      lunchPersonnelCost: "",
      dinnerPersonnelCost: "",
      purchase: "",
    },
  });

  //サーバーに送信する前にdayをstringに変換する
  const dayToString = () => {
    const dayString = dialySaleForm.getValues("day");
    if (dayString) {
      return dayString.toLocaleDateString();
    }
  };

  //フォームの入力値を更新する関数
  const handleMakeDialySaleOnClick = async () => {
    try {
      //apiを呼び出してDialySaleを作成する
      await axios.post("http://localhost:3000/dialy_sales", {
        dialy_sale: {
          day: dayToString(),
          lunch_sales: dialySaleForm.getValues("lunchSale"),
          dinner_sales: dialySaleForm.getValues("dinnerSale"),
          lunch_visitor: dialySaleForm.getValues("lunchVisitor"),
          dinner_visitor: dialySaleForm.getValues("dinnerVisitor"),
          lunch_personnel_cost: dialySaleForm.getValues("lunchPersonnelCost"),
          dinner_personnel_cost: dialySaleForm.getValues("dinnerPersonnelCost"),
          purchase: dialySaleForm.getValues("purchase"),
        },
      });

      //dialySaleの作成に成功したらformの値をリセット
      dialySaleForm.reset;

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
            <ControlledDatePicker name="day" label="日付" helperText={dialySaleForm.formState.errors.day?.message} />
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
                name="lunchPersonnelCost"
                label="ランチー人件費"
                helperText={dialySaleForm.formState.errors.lunchPersonnelCost?.message}
              />
            </Grid>
            <Grid item className="ml-7">
              <ControlledNumberTextField
                name="dinnerPersonnelCost"
                label="ディナー人件費"
                helperText={dialySaleForm.formState.errors.dinnerPersonnelCost?.message}
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
