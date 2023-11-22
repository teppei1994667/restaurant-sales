import { DialySaleType } from "@/type/DialySale";
import { Box, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { DialySale } from "./DIalySale";

//売り上げ一覧を表示するコンポーネント
export const DialySales = () => {
  //DialySale一覧を管理するstate
  const [dialySales, setDialySales] = useState<DialySaleType[]>([]);

  //DialySale一覧を取得する関数
  const fetchDialySales = async () => {
    //APIからDialySale一覧を取得する
    try {
      const res = await axios.get<DialySaleType[]>(
        "http://localhost:3000/dialy_sales"
      );
      setDialySales(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされたタイミングでDailySale一覧を取得する関数を事項する
  useEffect(() => {
    fetchDialySales();
  }, []);

  return (
    <Paper>
      {dialySales.map((dialySale) => (
        <Box key={String(dialySale.day)}>
          <DialySale dialySale={dialySale} />
        </Box>
      ))}
    </Paper>
  );
};
