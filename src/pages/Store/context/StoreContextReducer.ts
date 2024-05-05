import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "../type/model/StoreModel";
import { Reducer, useReducer } from "react";
import { StoreContextInfo, storeContextInfoInitialState } from "./StoreContextInfo";

export enum StoreContexActionType {
  SAVE_STORE_INFORMATION = "SAVE_STORE_INFORMATION",
}

export type StoreContextAction = {
  type: StoreContexActionType.SAVE_STORE_INFORMATION;
  payload: { userModel?: UserModel; storeModel: StoreModel };
};

export const storeContextReducer: Reducer<StoreContextInfo, StoreContextAction> = (state, action) => {
  switch (action.type) {
    case StoreContexActionType.SAVE_STORE_INFORMATION:
      const updateStoreModelState: StoreContextInfo = {
        ...state,
        UserModel: action.payload.userModel ?? state.UserModel,
        StoreModel: action.payload.storeModel ?? state.StoreModel,
      };
      return updateStoreModelState;
  }
};

export const useStoreContextReducer = () => {
  const [state, dispatch] = useReducer(storeContextReducer, storeContextInfoInitialState);

  return { state, dispatch };
};

export const defaultStoreContextReducer: ReturnType<typeof useStoreContextReducer> = {
  state: { StoreModel: undefined, UserModel: undefined },
  dispatch: () => {},
};
