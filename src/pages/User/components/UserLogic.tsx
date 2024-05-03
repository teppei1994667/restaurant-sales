import { useContext, useEffect } from "react";
import { UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { LoginUserModel } from "../type/model/LoginUserModel";
import { UserView } from "./UserView";

export type UserProps = { LoginUserModel: LoginUserModel; storeNames?: string[] };

export const UserLogic = (props: UserProps) => {
  const { LoginUserModel, storeNames } = props;
  const userDispatch = useContext(UserDispatch);

  useEffect(() => {
    userDispatch({
      type: UserContexActionType.SAVE_USER_INFORMATION,
      payload: { loginUserModel: LoginUserModel, storeNames: storeNames ? storeNames : [] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserView />
    </>
  );
};
