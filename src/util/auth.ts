import { SignUpParams } from "@/type/User";
import { convertAxios } from "./convertAxios";

//サインアップ
export const signUp = (params: SignUpParams) => {
  return convertAxios.post("auth", params);
};
