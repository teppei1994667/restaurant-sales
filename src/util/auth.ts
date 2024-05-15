import { SignInParams, SignUpParams } from "@/type/User";
import { convertAuthUserAxios } from "./convertAxios";
import Cookies from "js-cookie";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return convertAuthUserAxios.post("/", params);
};

// サインイン
export const signIn = (params: SignInParams) => {
  return convertAuthUserAxios.post("sign_in", params);
};

// サインアウト
export const signOut = () => {
  return convertAuthUserAxios.delete("sign_out", {
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
    return convertAuthUserAxios.get("sign_in", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
};
