import { SignInParams, SignUpParams } from "@/type/User";
import { convertAxios } from "./convertAxios";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return convertAxios.post("auth", params);
};

// サインイン
export const signIn = (params: SignInParams) => {
  return convertAxios.post("auth/sign_in", params);
};
