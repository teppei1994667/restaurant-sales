import { SignInParams, SignUpParams } from "@/type/User";
import { convertAxios } from "./convertAxios";
import Cookies from "js-cookie";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return convertAxios.post("auth", params);
};

// サインイン
export const signIn = (params: SignInParams) => {
  return convertAxios.post("auth/sign_in", params);
};

// サインアウト
export const signOut = () => {
  return convertAxios.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access-toke"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access-toke") || !Cookies.get("_client") || !Cookies.get("_uid")) {
    return convertAxios.get("auth/sign_in", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
};
