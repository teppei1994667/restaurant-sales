import { SignUpParams } from "@/type/User";
import { convertAxios } from "./convertAxios";

export const signUp = (params: SignUpParams) => {
  return convertAxios.post("auth", params);
};
