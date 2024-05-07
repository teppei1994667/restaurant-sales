import { Reducer, useReducer } from "react";
import { DialySalesContextInfo, DialySalesContextInitialState } from "./DialySalesContextInfo";
import { DialySale } from "@/type/DialySale";

export enum DialySaleContextActionType {
  SAVE_DIALY_SALE_INFORMATION = "SAVE_DIALY_SALE_INFORMATION",
}

export type DialySaleCotextAction = {
  type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION;
  payload: { dialySaleModels?: DialySale[] };
};

export const dialySaleReducer: Reducer<DialySalesContextInfo, DialySaleCotextAction> = (state, action) => {
  switch (action.type) {
    case DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION:
      const updateDialySaleContext: DialySalesContextInfo = {
        ...state,
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
  state: { DialySaleModels: [] },
  dispatch: () => {},
};
