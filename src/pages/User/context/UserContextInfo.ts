import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { UserModel } from "../type/model/UserModel";

export type UserContextInfo = {
  UserModel?: UserModel;
  StoreModels: StoreModel[];
  isCreateStoreOpen: boolean;
};

export const userContextInfoInitialState: UserContextInfo = {
  StoreModels: [],
  isCreateStoreOpen: false,
};
