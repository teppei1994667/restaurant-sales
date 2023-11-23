import { Button, Grid, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { FormEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import { DialySaleFormType } from "@/type/DialySale";
import { ControlledTextField } from "./share/form/ControlledTextField";

export const CreateDialySaleForm = () => {
  //formの入力値を管理するstate
  const [day, setDay] = useState<Date | null>();

  const dialySaleForm = useForm<DialySaleFormType>({
    defaultValues: { day: null, lunchSale: "", dinnerSale: "" },
  });

  //フォームの入力値を更新する関数
  const handleMakeDialySaleOnClick = async (event: FormEvent) => {
    event.preventDefault();

    try {
      //apiを呼び出してDialySaleを作成する
      await axios.post("http://localhost:3000/dialy_sales", {
        dialy_sale: {
          day,
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

  //日付の変更時に値をsetStateする
  const handleDayOnChange = (newValue: Date | null) => {
    setDay(newValue);
  };

  console.log("createDialySaleForm");

  return (
    <>
      <FormProvider {...dialySaleForm}>
        <Grid container spacing={0.75} sx={{ alignItems: "center" }}>
          <Grid item>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ja}
            >
              <DatePicker
                label="日付"
                value={day}
                onChange={handleDayOnChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item className="ml-9">
            <ControlledTextField name="lunchSale" label="ランチ売り上げ" />
          </Grid>
          <Grid item className="ml-9">
            <ControlledTextField name="dinnerSale" label="ディナー売り上げ" />
          </Grid>
          <Grid item className="ml-9">
            <Button variant="outlined" onClick={handleMakeDialySaleOnClick}>
              作成
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
