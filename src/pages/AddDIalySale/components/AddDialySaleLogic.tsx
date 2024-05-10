import { DialySale } from "@/type/DialySale";
import { useContext, useEffect, useState } from "react";
import { AddDialySaleView } from "./AddDialySaleView";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { DialySalesContext, DialySalesDispatch } from "../context/DialySalesContextProvider";
import { DialySaleContextActionType } from "../context/DIalySalesContextReducer";

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

  const dialySalesContext = useContext(DialySalesContext);
  const dialySalesDspatch = useContext(DialySalesDispatch);

  // authenticationPossibleServerSidePropsで取得した情報をcontextに保存
  useEffect(() => {
    dialySalesDspatch({
      type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
      payload: { userModel, storeModel, otherStoreModels },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherStoreModels, storeModel, userModel]);

  //「期間を指定して表示する」押下時
  const handleKikanShiteiOnClick = () => {
    setIsSearchDialySalesDispalay((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  console.log("AddDialySaleLogic", dialySalesContext);
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
