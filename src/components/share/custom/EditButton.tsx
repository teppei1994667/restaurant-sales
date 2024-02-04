import { DialySalesStateContext } from "@/context/DialySalesContext";
import { SelectDialySalesContext } from "@/context/SelectDialySalesContext";
import { DisplayDialySale } from "@/type/DialySale";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";

export type EditButtonProps = {
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsInfomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRowSelectionModelValue: Dispatch<SetStateAction<DisplayDialySale | undefined>>;
};

export const EditButton = (props: EditButtonProps) => {
  const { setIsEditDialogOpen, setIsInfomationDialogOpen, setRowSelectionModelValue } = props;
  const { state } = useContext(DialySalesStateContext);
  const { rowSlectionModel } = useContext(SelectDialySalesContext);

  //変更ボタン押下時
  const handleEditBtnOnClick = () => {
    if (rowSlectionModel.length !== 1) {
      if (rowSlectionModel.length > 1) {
        setIsInfomationDialogOpen(true);
        return;
      }
      if (rowSlectionModel.length < 1) {
        alert("編集するデータを選択してください。");
        return;
      }
    }
    //選ばれている行のデータをstateにセット
    state.dialySales.map((dialySale) => {
      if (dialySale.id === Number(rowSlectionModel)) {
        setRowSelectionModelValue(dialySale);
      }
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Button onClick={handleEditBtnOnClick} variant="outlined">
      変更
    </Button>
  );
};
