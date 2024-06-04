import { UserModel } from "@/pages/User/type/model/UserModel";
import { DialySaleComparisonView } from "./DialySaleComparisonView";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { useContext } from "react";
import { DialySaleComparisonDispatch } from "../context/DIalySaleConparisonContextProvider";
import { DialySaleComparisonContextActionType } from "../context/DialySaleComparisonContextReducer";

export type DialySaleComparisonLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
  otherStoreModels?: StoreModel[];
};

export const DialySaleComparisonLogic = (props: DialySaleComparisonLogicProps) => {
  const { userModel, storeModel, otherStoreModels } = props;

  const dialySaleComparisonDispatch = useContext(DialySaleComparisonDispatch);

  dialySaleComparisonDispatch({
    type: DialySaleComparisonContextActionType.SAVE_DIALY_SALE_CONPARISON_INFORMATION,
    payload: { userModel, storeModel, otherStoreModels },
  });
  return <DialySaleComparisonView />;
};
