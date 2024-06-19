import { UserModel } from "@/pages/User/type/model/UserModel";
import { DialySaleComparisonView } from "./DialySaleComparisonView";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { useCallback, useContext, useEffect } from "react";
import {
  DialySaleComparisonContext,
  DialySaleComparisonDispatch,
} from "../context/DialySaleConparisonContextProvider";
import { DialySaleComparisonContextActionType } from "../context/DialySaleComparisonContextReducer";
import { convertDialySaleAxiosComparison } from "@/util/convertAxios";

export type DialySaleComparisonLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
  otherStoreModels?: StoreModel[];
};

export const DialySaleComparisonLogic = (
  props: DialySaleComparisonLogicProps
) => {
  const { userModel, storeModel, otherStoreModels } = props;

  const dialySaleComparisonContext = useContext(DialySaleComparisonContext);
  const dialySaleComparisonDispatch = useContext(DialySaleComparisonDispatch);

  useEffect(() => {
    dialySaleComparisonDispatch({
      type: DialySaleComparisonContextActionType.SAVE_DIALY_SALE_CONPARISON_INFORMATION,
      payload: { userModel, storeModel, otherStoreModels },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherStoreModels, storeModel, userModel]);

  // サーバーから比較用売り上げデータを取得
  const fetchComparisonDialySale = useCallback(async () => {
    const storeId = dialySaleComparisonContext.StoreModel?.id;
    const res = await convertDialySaleAxiosComparison.get(`/${storeId}`);
    console.log("fetchComparisonDialySale", res);
  }, [dialySaleComparisonContext.StoreModel?.id]);

  useEffect(() => {
    if (dialySaleComparisonContext.StoreModel?.id) {
      fetchComparisonDialySale();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialySaleComparisonContext.StoreModel?.id]);
  return <DialySaleComparisonView />;
};
