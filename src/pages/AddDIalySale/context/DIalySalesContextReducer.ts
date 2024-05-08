import { Reducer, useReducer } from "react";
import { DialySalesContextInfo, DialySalesContextInitialState } from "./DialySalesContextInfo";
import { DialySale } from "@/type/DialySale";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export enum DialySaleContextActionType {
  SAVE_DIALY_SALE_INFORMATION = "SAVE_DIALY_SALE_INFORMATION",
}

export type DialySaleCotextAction = {
  type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION;
  payload: {
    userModel?: UserModel;
    storeModel?: StoreModel;
    otherStoreModels?: StoreModel[];
    dialySaleModels?: DialySale[];
  };
};

export const dialySaleReducer: Reducer<DialySalesContextInfo, DialySaleCotextAction> = (state, action) => {
  switch (action.type) {
    case DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION:
      const updateDialySaleContext: DialySalesContextInfo = {
        ...state,
        UserModel: action.payload.userModel ?? state.UserModel,
        StoreModel: action.payload.storeModel ?? state.StoreModel,
        OtherStoreModels: action.payload.otherStoreModels ?? state.OtherStoreModels,
        DialySaleModels: action.payload.dialySaleModels ?? state.DialySaleModels,
      };
      return updateDialySaleContext;
  }
};

export const useDialySalesReducer = () => {
  const [state, dispatch] = useReducer(dialySaleReducer, DialySalesContextInitialState);

  return { state, dispatch };
};

export const defaultDialySalesReducerContext: ReturnType<typeof useDialySalesReducer> = {
  state: { StoreModel: undefined, UserModel: undefined, OtherStoreModels: undefined, DialySaleModels: [] },
  dispatch: () => {},
};
