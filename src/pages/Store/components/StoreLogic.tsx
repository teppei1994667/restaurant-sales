import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreView } from "./StoreView";
import { StoreModel } from "../type/model/StoreModel";
import { StoreDispatch } from "../context/StoreContextProvider";
import { useContext, useEffect } from "react";
import { StoreContexActionType } from "../context/StoreContextReducer";

export type StoreLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
};

export const StoreLogic = (props: StoreLogicProps) => {
  console.log("StoreLogic props", props);
  const { userModel, storeModel } = props;
  const storeDispatch = useContext(StoreDispatch);

  useEffect(() => {
    storeDispatch({
      type: StoreContexActionType.SAVE_STORE_INFORMATION,
      payload: { storeModel: storeModel, userModel: userModel },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeModel, userModel]);

  return (
    <>
      <StoreView />
    </>
  );
};
