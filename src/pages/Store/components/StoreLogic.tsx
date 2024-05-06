import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreView } from "./StoreView";
import { StoreModel } from "../type/model/StoreModel";
import { StoreContext, StoreDispatch } from "../context/StoreContextProvider";
import { useContext, useEffect } from "react";
import { StoreContexActionType } from "../context/StoreContextReducer";

export type StoreLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
  otherStoreModels?: StoreModel[];
};

export const StoreLogic = (props: StoreLogicProps) => {
  const { userModel, storeModel, otherStoreModels } = props;
  const storeContext = useContext(StoreContext);
  const storeDispatch = useContext(StoreDispatch);

  useEffect(() => {
    storeDispatch({
      type: StoreContexActionType.SAVE_STORE_INFORMATION,
      payload: { storeModel: storeModel, userModel: userModel, otherStoreModels: otherStoreModels },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeModel, userModel, otherStoreModels]);

  console.log("StoreLogic storeContext", storeContext);

  return (
    <>
      <StoreView />
    </>
  );
};
