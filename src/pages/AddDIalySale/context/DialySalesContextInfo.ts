import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { DialySale } from "@/type/DialySale";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { TotalDialySaleModel } from "../type/model/TotalDialySaleModel";

export type DialySalesContextInfo = {
  UserModel?: UserModel;
  StoreModel?: StoreModel;
  OtherStoreModels?: StoreModel[];
  DialySaleModels?: DialySale[];
  TotalDialySaleModel?: TotalDialySaleModel;
  rowSelectionModel: GridRowSelectionModel;
};

export const DialySalesContextInitialState: DialySalesContextInfo = { rowSelectionModel: [] };
