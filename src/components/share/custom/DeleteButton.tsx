import { Button } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";

export type DeleteButtonProps = {
  ids: GridRowSelectionModel[];
};

export const DeleteButton = (props: DeleteButtonProps) => {
  console.log("DeleteButton", props.ids);
  const sendDelete = (deleteIds: GridRowSelectionModel[]) => {
    deleteIds.map((deleteId) => {
      return axios.delete(`http://localhost:3000/dialy_sales/${deleteId}`);
    });
  };
  const handleDelete = async () => {
    // 確認のダイアログを表示し「いいえ」を押下した場合処理終了
    if (!confirm("本当に削除しますか")) {
      return;
    }
    try {
      //APIを呼び出して、DialySaleを削除する
      await sendDelete(props.ids);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={handleDelete} variant="outlined">
      削除
    </Button>
  );
};
