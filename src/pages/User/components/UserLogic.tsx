import { useContext, useEffect } from "react";
import { UserContext, UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { GetServerSideProps } from "next";
import { LoginUserModel } from "../const/LoginUserModel";
import { Button, Grid, Link, Typography } from "@mui/material";
import { UserView } from "./UserView";

export type UserProps = { LoginUserModel: LoginUserModel };

export const UserLogic = (props: UserProps) => {
  const userContext = useContext(UserContext);
  const userDispatch = useContext(UserDispatch);

  useEffect(() => {
    userDispatch({
      type: UserContexActionType.SAVE_LOGIN_USER_MODEL,
      payload: { loginUserModel: props.LoginUserModel },
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
