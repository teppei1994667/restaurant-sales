import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import { LoginUserModel } from "../type/model/LoginUserModel";

export type UserContextInfo = {
  LoginUserModel?: LoginUserModel;
  StoreModels: StoreModel[];
  isCreateStoreOpen: boolean;
};

export const userContextInfoInitialState: UserContextInfo = {
  StoreModels: [],
  isCreateStoreOpen: false,
};
