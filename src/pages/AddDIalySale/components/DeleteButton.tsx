import { SelectDialySalesContext } from "@/context/SelectDialySalesContext";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";
import { Button } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import { useContext } from "react";

export const DeleteButton = () => {
  const { rowSelectionModel } = useContext(SelectDialySalesContext);

  //受け取ったidをサーバーへdeleteリクエストを行う
  const sendDelete = (deleteIds: GridRowSelectionModel) => {
    deleteIds.map((deleteId) => {
      return axios.delete(`${LOCAL_DIALYSALES_ADDRESS}/${deleteId}`);
    });
  };

  //削除ボタン押下時の処理
  const handleDeleteOnClick = () => {
    // 確認のダイアログを表示し「いいえ」を押下した場合処理終了
    if (rowSelectionModel.length !== 0) {
      if (!confirm("本当に削除しますか")) {
        return;
      }
      try {
        //APIを呼び出して、DialySaleを削除する
        sendDelete(rowSelectionModel);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Button className="text-gray-500" variant="text" onClick={handleDeleteOnClick}>
      削除
    </Button>
  );
};
