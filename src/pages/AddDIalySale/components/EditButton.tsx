import { DialySalesStateContext } from "@/pages/AddDialySale/context/DialySalesContextProvider";
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
    state.DialySaleModels.map((dialySaleModel) => {
      if (dialySaleModel.id === Number(rowSelectionModel)) {
        setRowSelectionModelValue(dialySaleModel);
      }
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Button className="text-gray-500" variant="text" onClick={handleEditBtnOnClick}>
      変更
    </Button>
  );
};
