import { Reducer, useReducer } from "react";
import { UserContextInfo, userContextInfoInitialState } from "./UserContextInfo";
import { LoginUserModel } from "../const/LoginUserModel";

export enum UserContexActionType {
  SAVE_LOGIN_USER_MODEL = "SAVE_LOGINUSERMODEL",
  UPDATE_CREATE_STORE_OPEN = "UPDATE_CREATE_STORE_OPEN",
}

export type UserContextAction =
  | {
      type: UserContexActionType.SAVE_LOGIN_USER_MODEL;
      payload: { loginUserModel?: LoginUserModel };
    }
  | {
      type: UserContexActionType.UPDATE_CREATE_STORE_OPEN;
      payload: { isCreateStoreOpen: boolean };
    };

export const userContextReducer: Reducer<UserContextInfo, UserContextAction> = (state, action) => {
  switch (action.type) {
    case UserContexActionType.SAVE_LOGIN_USER_MODEL:
      const updateLoginUserModelState: UserContextInfo = {
        ...state,
        LoginUserModel: action.payload.loginUserModel ?? state.LoginUserModel,
      };
      return updateLoginUserModelState;
    case UserContexActionType.UPDATE_CREATE_STORE_OPEN:
      const updateIsCreateStoreOpenState: UserContextInfo = {
        ...state,
        isCreateStoreOpen: action.payload.isCreateStoreOpen,
      };
      return updateIsCreateStoreOpenState;
  }
};

export const useUserContextReducer = () => {
  const [state, dispatch] = useReducer(userContextReducer, userContextInfoInitialState);

  return { state, dispatch };
};

export const defaultUserContextReducer: ReturnType<typeof useUserContextReducer> = {
  state: { isCreateStoreOpen: false },
  dispatch: () => {},
};
