import { DialySalesStateContext } from "@/context/DialySalesContext";
import { SelectDialySalesContext } from "@/context/SelectDialySalesContext";
import { DialySale } from "@/type/DialySale";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";

export type EditButtonProps = {
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRowSelectionModelValue: Dispatch<SetStateAction<DialySale | undefined>>;
};

export const EditButton = (props: EditButtonProps) => {
  const { setIsEditDialogOpen, setRowSelectionModelValue } = props;
  const { state } = useContext(DialySalesStateContext);
  const { rowSelectionModel } = useContext(SelectDialySalesContext);

  //変更ボタン押下時
  const handleEditBtnOnClick = () => {
    if (rowSelectionModel.length !== 1) {
      if (rowSelectionModel.length > 1) {
        alert("同時に複数のデータの変更はできません。変更したいデータを１つだけ選択してください。");
        return;
      }
      if (rowSelectionModel.length < 1) {
        alert("編集するデータを選択してください。");
        return;
      }
    }
    //選ばれている行のデータをstateにセット
    state.dialySales.map((dialySale) => {
      if (dialySale.id === Number(rowSelectionModel)) {
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
