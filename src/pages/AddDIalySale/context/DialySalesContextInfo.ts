import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { DialySale } from "@/type/DialySale";

export type DialySalesContextInfo = {
  UserModel?: UserModel;
  StoreModel?: StoreModel;
  OtherStoreModels?: StoreModel[];
  DialySaleModels: DialySale[];
};

export const DialySalesContextInitialState: DialySalesContextInfo = { DialySaleModels: [] };
