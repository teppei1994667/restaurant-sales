import { useContext, useEffect } from "react";
import { UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { LoginUserModel } from "../type/model/LoginUserModel";
import { UserView } from "./UserView";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export type UserProps = { LoginUserModel: LoginUserModel; StoreModels?: StoreModel[] };

export const UserLogic = (props: UserProps) => {
  const { LoginUserModel, StoreModels } = props;
  const userDispatch = useContext(UserDispatch);

  useEffect(() => {
    userDispatch({
      type: UserContexActionType.SAVE_USER_INFORMATION,
      payload: { loginUserModel: LoginUserModel, storeModels: StoreModels ? StoreModels : [] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserView />
    </>
  );
};
