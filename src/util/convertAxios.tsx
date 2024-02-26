import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const convertAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_DIALYSALES_ADDRESS,
  }),
  options
);
