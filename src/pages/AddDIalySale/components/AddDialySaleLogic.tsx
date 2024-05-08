import { DialySale } from "@/type/DialySale";
import { useEffect, useState } from "react";
import { AddDialySaleView } from "./AddDialySaleView";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export type AddDialySaleLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
  otherStoreModels?: StoreModel[];
};

export const AddDialySaleLogic = (props: AddDialySaleLogicProps) => {
  const { userModel, storeModel, otherStoreModels } = props;

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
