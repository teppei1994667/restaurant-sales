import { LOCAL_AUTHUSER_ADDRESS, LOCAL_DIALYSALES_ADDRESS, LOCAL_STORES_ASRESS } from "@/constants/serverAdress";
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

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const authUserAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_AUTHUSER_ADDRESS,
  }),
  options
);

export const storeAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_STORES_ASRESS,
  }),
  options
);
