import { DialySalesStateContext } from "@/constants/DialySalesContext";
import { SelectDialySalesContext } from "@/context/SelectDialySalesContext";
import { DialySaleType } from "@/type/DialySale";
import { Button } from "@mui/material";
import { useContext, useState } from "react";

export const EditButton = () => {
  const { state } = useContext(DialySalesStateContext);
  const { rowSlectionModel } = useContext(SelectDialySalesContext);
  const [rowSelectionModelValue, setRowSelectionModelValue] = useState<DialySaleType>();

  //変更ボタン押下時
  const handleEditBtnOnClick = () => {
    if (rowSlectionModel.length > 1) {
      alert("同時に複数のデータの変更はできません。変更したいデータを１つだけ選択してください。");
      return;
    }
    //選ばれている行のデータをstateにセット
    state.dialySales.map((dialySale) => {
      if (dialySale.id === Number(rowSlectionModel)) {
        setRowSelectionModelValue(dialySale);
      }
    });
    //TODO: ダイアログ実装後そのオープン処理実装
  };

  console.log("EditButton rowSelectionModelValue", rowSelectionModelValue);
  return (
    <Button onClick={handleEditBtnOnClick} variant="outlined">
      変更
    </Button>
  );
};
