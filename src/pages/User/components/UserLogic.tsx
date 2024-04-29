import { useContext, useEffect } from "react";
import { UserContext, UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { LoginUserModel } from "../type/model/LoginUserModel";
import { UserView } from "./UserView";

export type UserProps = { LoginUserModel: LoginUserModel; storeNames?: string[] };

export const UserLogic = (props: UserProps) => {
  console.log("UserLogic", props.storeNames);
  const { LoginUserModel, storeNames } = props;
  const userContext = useContext(UserContext);
  const userDispatch = useContext(UserDispatch);

  useEffect(() => {
    userDispatch({
      type: UserContexActionType.SAVE_USER_INFORMATION,
      payload: { loginUserModel: LoginUserModel, storeNames: storeNames ? storeNames : [] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("ユーザーロジック userContext", userContext);
  return (
    <>
      <UserView />
    </>
  );
};
