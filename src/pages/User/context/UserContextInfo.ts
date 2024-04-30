import { LoginUserModel } from "../type/model/LoginUserModel";

export type UserContextInfo = {
  LoginUserModel?: LoginUserModel;
  storeNames: string[];
  isCreateStoreOpen: boolean;
};

export const userContextInfoInitialState: UserContextInfo = {
  storeNames: [],
  isCreateStoreOpen: false,
};
