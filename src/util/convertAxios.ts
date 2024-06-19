import {
  LOCAL_ADDRESS,
  LOCAL_AUTHUSER_ADDRESS,
  LOCAL_DIALYSALES_ADDRESS_COMAPRISON,
  LOCAL_DIALYSALES_ADDRESS,
  LOCAL_STORES_ASRESS,
} from "@/constants/serverAdress";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

export const convertDefaultAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_ADDRESS,
  }),
  options
);

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const convertDialySaleAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_DIALYSALES_ADDRESS,
  }),
  options
);

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const convertDialySaleAxiosComparison = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_DIALYSALES_ADDRESS_COMAPRISON,
  }),
  options
);

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const convertAuthUserAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_AUTHUSER_ADDRESS,
  }),
  options
);

export const convertStoreAxios = applyCaseMiddleware(
  axios.create({
    baseURL: LOCAL_STORES_ASRESS,
  }),
  options
);
