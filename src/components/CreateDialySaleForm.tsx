import axios from "axios";
import { FormEvent, useState } from "react";

export const CreateDialySaleForm = () => {
  //formの入力値を管理するstate
  const [day, setDay] = useState("");
  const [lunchSale, setLunchSale] = useState("");
  const [dinnerSale, setDinnerSale] = useState("");

  //フォームの入力値を更新する関数
  const handleSubmit = async (event: FormEvent) => {
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
      setDay("");
      setLunchSale("");
      setDinnerSale("");

      //dialySaleの作成に成功したら画面を更新する
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
};
