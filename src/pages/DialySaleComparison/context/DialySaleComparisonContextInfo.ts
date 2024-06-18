import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { UserModel } from "@/pages/User/type/model/UserModel";

export type DialySaleComparisonContextInfo = {
  UserModel?: UserModel;
  StoreModel?: StoreModel;
  OtherStoreModels?: StoreModel[];
};

export const DialySaleComparisonContextInitialState: DialySaleComparisonContextInfo =
  {};
