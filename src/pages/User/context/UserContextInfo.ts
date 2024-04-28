import { LoginUserModel } from "../const/LoginUserModel";

export type UserContextInfo = {
  LoginUserModel?: LoginUserModel;
  isCreateStoreOpen: boolean;
};

export const userContextInfoInitialState: UserContextInfo = {
  isCreateStoreOpen: false,
};
