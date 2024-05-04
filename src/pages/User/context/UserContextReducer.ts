import { Reducer, useReducer } from "react";
import { UserContextInfo, userContextInfoInitialState } from "./UserContextInfo";
import { LoginUserModel } from "../type/model/LoginUserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export enum UserContexActionType {
  SAVE_USER_INFORMATION = "SAVE_USER_INFORMATION",
  UPDATE_CREATE_STORE_OPEN = "UPDATE_CREATE_STORE_OPEN",
}

export type UserContextAction =
  | {
      type: UserContexActionType.SAVE_USER_INFORMATION;
      payload: { loginUserModel?: LoginUserModel; storeModels: StoreModel[] };
    }
  | {
      type: UserContexActionType.UPDATE_CREATE_STORE_OPEN;
      payload: { isCreateStoreOpen: boolean };
    };

export const userContextReducer: Reducer<UserContextInfo, UserContextAction> = (state, action) => {
  switch (action.type) {
    case UserContexActionType.SAVE_USER_INFORMATION:
      const updateLoginUserModelState: UserContextInfo = {
        ...state,
        LoginUserModel: action.payload.loginUserModel ?? state.LoginUserModel,
        StoreModels: action.payload.storeModels,
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
  state: { isCreateStoreOpen: false, StoreModels: [] },
  dispatch: () => {},
};
