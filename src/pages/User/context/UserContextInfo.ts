import { LoginUserModel } from "../type/model/LoginUserModel";

export type UserContextInfo = {
  LoginUserModel?: LoginUserModel;
  isCreateStoreOpen: boolean;
};

export const userContextInfoInitialState: UserContextInfo = {
  isCreateStoreOpen: false,
};
