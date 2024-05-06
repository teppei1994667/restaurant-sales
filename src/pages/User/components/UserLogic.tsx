import { useContext, useEffect } from "react";
import { UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { UserModel } from "../type/model/UserModel";
import { UserView } from "./UserView";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export type UserProps = { UserModel: UserModel; StoreModels?: StoreModel[] };

export const UserLogic = (props: UserProps) => {
  const { UserModel, StoreModels } = props;
  const userDispatch = useContext(UserDispatch);

  useEffect(() => {
    userDispatch({
      type: UserContexActionType.SAVE_USER_INFORMATION,
      payload: { userModel: UserModel, storeModels: StoreModels ? StoreModels : [] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserView />
    </>
  );
};
