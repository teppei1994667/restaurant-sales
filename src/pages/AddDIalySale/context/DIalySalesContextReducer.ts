import { Reducer, useReducer } from "react";
import { DialySalesContextInfo, DialySalesContextInitialState } from "./DialySalesContextInfo";
import { DialySale } from "@/type/DialySale";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { TotalDialySaleModel } from "../type/model/TotalDialySaleModel";

export enum DialySaleContextActionType {
  SAVE_DIALY_SALE_INFORMATION = "SAVE_DIALY_SALE_INFORMATION",
  SELECT_GRID_ROW_MODEL = "SELECT_GRID_ROW_MODEL",
}

export type DialySaleCotextAction =
  | {
      type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION;
      payload: {
        userModel?: UserModel;
        storeModel?: StoreModel;
        otherStoreModels?: StoreModel[];
        dialySaleModels?: DialySale[];
        totalDialySaleModel?: TotalDialySaleModel;
      };
    }
  | {
      type: DialySaleContextActionType.SELECT_GRID_ROW_MODEL;
      payload: { gridRowSelected: GridRowSelectionModel };
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
        TotalDialySaleModel: action.payload.totalDialySaleModel ?? state.TotalDialySaleModel,
      };
      return updateDialySaleContext;
    case DialySaleContextActionType.SELECT_GRID_ROW_MODEL:
      const selectGridRowModel: DialySalesContextInfo = {
        ...state,
        rowSelectionModel: action.payload.gridRowSelected,
      };
      return selectGridRowModel;
  }
};

export const useDialySalesReducer = () => {
  const [state, dispatch] = useReducer(dialySaleReducer, DialySalesContextInitialState);

  return { state, dispatch };
};

export const defaultDialySalesReducerContext: ReturnType<typeof useDialySalesReducer> = {
  state: {
    StoreModel: undefined,
    UserModel: undefined,
    OtherStoreModels: undefined,
    DialySaleModels: [],
    rowSelectionModel: [],
  },
  dispatch: () => {},
};
