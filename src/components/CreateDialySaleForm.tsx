import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { FormEvent } from "react";
import { DialySaleFormType } from "@/type/DialySale";
import { ControlledTextField } from "./share/form/ControlledTextField";
import { ControlledDatePicker } from "./share/form/ControlledDatePicker";

export const CreateDialySaleForm = () => {
  //新規売り上げ作成をformで管理
  const dialySaleForm = useForm<DialySaleFormType>({
    defaultValues: { day: null, lunchSale: "", dinnerSale: "" },
  });

  //サーバーに送信する前にdayをstringに変換する
  const dayToString = () => {
    const dayString = dialySaleForm.getValues("day");
    if (dayString) {
      return dayString.toLocaleDateString();
    }
  };

  //フォームの入力値を更新する関数
  const handleMakeDialySaleOnClick = async (event: FormEvent) => {
    event.preventDefault();

    try {
      //apiを呼び出してDialySaleを作成する
      await axios.post("http://localhost:3000/dialy_sales", {
        dialy_sale: {
          day: dayToString(),
          lunch_sales: dialySaleForm.getValues("lunchSale"),
          dinner_sales: dialySaleForm.getValues("dinnerSale"),
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

  console.log("createDialySaleForm");

  //作成ボタン押下時のテスト用関数
  const handleMakeDialySaleOnClickTest = () => {
    console.log("作成テスト", dialySaleForm.getValues());
  };

  return (
    <>
      <FormProvider {...dialySaleForm}>
        <Grid container spacing={0.75} sx={{ alignItems: "center" }}>
          <Grid item>
            <ControlledDatePicker name="day" label="日付" />
          </Grid>
          <Grid item className="ml-9">
            <ControlledTextField name="lunchSale" label="ランチ売り上げ" />
          </Grid>
          <Grid item className="ml-9">
            <ControlledTextField name="dinnerSale" label="ディナー売り上げ" />
          </Grid>
          <Grid item className="ml-9">
            <Button variant="outlined" onClick={handleMakeDialySaleOnClickTest}>
              作成
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
