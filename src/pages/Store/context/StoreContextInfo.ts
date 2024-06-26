import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "../type/model/StoreModel";

export type StoreContextInfo = {
  StoreModel?: StoreModel;
  UserModel?: UserModel;
  OtherStoreModels?: StoreModel[];
};

export const storeContextInfoInitialState: StoreContextInfo = {
  StoreModel: undefined,
  UserModel: undefined,
  OtherStoreModels: undefined,
};
