import { DialySale } from "@/type/DialySale";
import { useEffect, useState } from "react";
import { AddDialySaleView } from "./AddDialySaleView";

export const AddDialySaleLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSearchDialySalesDispalay, setIsSearchDialySalesDispalay] = useState(false);

  //チェックボックスで選択した行のデータを保持
  const [rowSelectionModelValue, setRowSelectionModelValue] = useState<DialySale>();

  //「期間を指定して表示する」押下時
  const handleKikanShiteiOnClick = () => {
    setIsSearchDialySalesDispalay((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <AddDialySaleView
        isLoading={isLoading}
        isEditDialogOpen={isEditDialogOpen}
        isSearchDialySalesDispalay={isSearchDialySalesDispalay}
        rowSelectionModelValue={rowSelectionModelValue}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setRowSelectionModelValue={setRowSelectionModelValue}
        handleKikanShiteiOnClick={handleKikanShiteiOnClick}
      />
    </>
  );
};
