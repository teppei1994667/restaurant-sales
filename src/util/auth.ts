import { SignInParams, SignUpParams } from "@/type/User";
import { authUserAxios } from "./convertAxios";
import Cookies from "js-cookie";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return authUserAxios.post("sign_up", params);
};

// サインイン
export const signIn = (params: SignInParams) => {
  return authUserAxios.post("sign_in", params);
};

// サインアウト
export const signOut = () => {
  return authUserAxios.delete("sign_out", {
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
    return authUserAxios.get("sign_in", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
};
