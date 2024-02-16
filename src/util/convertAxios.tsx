import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

//axiosによるサーバー通信時のスネークケース、キャメルケースの変換を自動化する
export const convertAxios = applyCaseMiddleware(axios.create());
