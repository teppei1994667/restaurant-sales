import { Reducer, useReducer } from "react";
import {
  DialySaleComparisonContextInfo,
  DialySaleComparisonContextInitialState,
} from "./ DialySaleComparisonContextInfo";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";

export enum DialySaleComparisonContextActionType {
  SAVE_DIALY_SALE_CONPARISON_INFORMATION = "SAVE_DIALY_SALE_CONPARISON_INFORMATION",
}

export type DialySaleComparisonCotextAction = {
  type: DialySaleComparisonContextActionType.SAVE_DIALY_SALE_CONPARISON_INFORMATION;
  payload: {
    userModel?: UserModel;
    storeModel?: StoreModel;
    otherStoreModels?: StoreModel[];
  };
};

export const dialySaleComparisonReducer: Reducer<DialySaleComparisonContextInfo, DialySaleComparisonCotextAction> = (
  state,
  action
) => {
  switch (action.type) {
    case DialySaleComparisonContextActionType.SAVE_DIALY_SALE_CONPARISON_INFORMATION:
      const newDialySaleComparisonContext: DialySaleComparisonContextInfo = {
        ...state,
        UserModel: action.payload.userModel ?? state.UserModel,
        StoreModel: action.payload.storeModel ?? state.StoreModel,
        OtherStoreModels: action.payload.otherStoreModels ?? state.OtherStoreModels,
      };
      return newDialySaleComparisonContext;
  }
};

export const useDialySaleComparisonReducer = () => {
  const [state, dispatch] = useReducer(dialySaleComparisonReducer, DialySaleComparisonContextInitialState);

  return { state, dispatch };
};

export const defaultDialySaleComparisonReducerContext: ReturnType<typeof useDialySaleComparisonReducer> = {
  state: {
    StoreModel: undefined,
    UserModel: undefined,
    OtherStoreModels: undefined,
  },
  dispatch: () => {},
};
