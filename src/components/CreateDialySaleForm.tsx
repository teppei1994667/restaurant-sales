import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";

export const CreateDialySaleForm = () => {
  //formの入力値を管理するstate
  const [day, setDay] = useState<Date | null>();
  const [lunchSale, setLunchSale] = useState("");
  const [dinnerSale, setDinnerSale] = useState("");

  //フォームの入力値を更新する関数
  const handleMakeDialySaleOnClick = async (event: FormEvent) => {
    event.preventDefault();

    try {
      //apiを呼び出してDialySaleを作成する
      await axios.post("http://localhost:3000/dialy_sales", {
        dialySale: {
          day,
          lunchSale,
          dinnerSale,
        },
      });

      //dialySaleの作成に成功したらformの値をリセット
      setDay(null);
      setLunchSale("");
      setDinnerSale("");

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

  //lunchSale(昼の売上)の変更時に値をsetStateする
  const handleLunchSaleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLunchSale(event.target.value);
  };

  //dinnerSale(夜の売上)の変更時に値をsetStateする
  const handleDinnerSaleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDinnerSale(event.target.value);
  };

  return (
    <>
      <Grid container spacing={0.75} sx={{ alignItems: "center" }}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <DatePicker label="日付" value={day} onChange={handleDayOnChange} />
          </LocalizationProvider>
        </Grid>
        <Grid item className="ml-9">
          <TextField
            label="ランチ売り上げ"
            value={lunchSale}
            onChange={handleLunchSaleOnChange}
          />
        </Grid>
        <Grid item className="ml-9">
          <TextField
            label="ディナー売り上げ"
            value={dinnerSale}
            onChange={handleDinnerSaleOnChange}
          />
        </Grid>
        <Grid item className="ml-9">
          <Button variant="outlined" onClick={handleMakeDialySaleOnClick}>
            作成
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
