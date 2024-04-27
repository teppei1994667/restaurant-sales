import { Reducer, useReducer } from "react";
import { UserContextInfo, UserContextInfoInitialState } from "./UserContextInfo";

export enum UserContexActionType {
  UPDATE_CREATE_STORE_OPEN = "UPDATE_CREATE_STORE_OPEN",
}

export type UserContextAction = {
  type: UserContexActionType.UPDATE_CREATE_STORE_OPEN;
  payload: { isCreateStoreOpen: boolean };
};

export const userContextReducer: Reducer<UserContextInfo, UserContextAction> = (state, action) => {
  switch (action.type) {
    case UserContexActionType.UPDATE_CREATE_STORE_OPEN:
      const newState: UserContextInfo = {
        ...state,
        isCreateStoreOpen: action.payload.isCreateStoreOpen,
      };
      return newState;
  }
};

export const useUserContextReducer = () => {
  const [state, dispatch] = useReducer(userContextReducer, UserContextInfoInitialState);

  return { state, dispatch };
};

export const defaultUserContextReducer: ReturnType<typeof useUserContextReducer> = {
  state: { isCreateStoreOpen: false },
  dispatch: () => {},
};
