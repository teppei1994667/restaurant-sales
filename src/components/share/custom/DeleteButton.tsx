import { SelectDialySalesContext } from "@/components/SelectDialySalesContext";
import { Button } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import { useContext } from "react";

export const DeleteButton = () => {
  const { rowSlectionModel } = useContext(SelectDialySalesContext);

  //受け取ったidをサーバーへdeleteリクエストを行う
  const sendDelete = (deleteIds: GridRowSelectionModel) => {
    deleteIds.map((deleteId) => {
      return axios.delete(`http://localhost:3000/dialy_sales/${deleteId}`);
    });
  };

  //削除ボタン押下時の処理
  const handleDeleteOnClick = async () => {
    // 確認のダイアログを表示し「いいえ」を押下した場合処理終了
    if (!confirm("本当に削除しますか")) {
      return;
    }
    try {
      //APIを呼び出して、DialySaleを削除する
      await sendDelete(rowSlectionModel);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={handleDeleteOnClick} variant="outlined">
      削除
    </Button>
  );
};
