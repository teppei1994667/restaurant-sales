import { DialySale } from "@/type/DialySale";

export type DialySalesContextInfo = {
  DialySaleModels: DialySale[];
};

export const DialySalesContextInitialState: DialySalesContextInfo = { DialySaleModels: [] };
