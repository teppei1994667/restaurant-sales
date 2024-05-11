import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { DialySale } from "@/type/DialySale";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export type DialySalesContextInfo = {
  UserModel?: UserModel;
  StoreModel?: StoreModel;
  OtherStoreModels?: StoreModel[];
  DialySaleModels?: DialySale[];
  rowSelectionModel: GridRowSelectionModel;
};

export const DialySalesContextInitialState: DialySalesContextInfo = { rowSelectionModel: [] };
