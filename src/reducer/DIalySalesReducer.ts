import { DisplayDialySale } from "@/type/DialySale";
import { useReducer } from "react";

type ReturnDialySalesType = {
  dialySales: DisplayDialySale[];
};

type DialySaleAction = {
  type: "returnData";
  payload: {
    id: number;
    sales_day: string;
    lunch_sales: number;
    dinner_sales: number;
    lunch_visitor: number;
    dinner_visitor: number;
    personnel_cost: number;
    purchase: number;
    total_sale: number;
    total_visitor: number;
    total_personnel_cost: number;
  }[];
};

export const dialySalesInitialState: ReturnDialySalesType = { dialySales: [] };

export const dialySalesReducer = (state: ReturnDialySalesType, action: DialySaleAction): ReturnDialySalesType => {
  switch (action.type) {
    case "returnData":
      return { dialySales: action.payload };
  }
};

export const useDialySalesReducer = () => {
  const [state, dispatch] = useReducer(dialySalesReducer, dialySalesInitialState);

  return { state, dispatch };
};

export const defaultDialySalesReducerContext: ReturnType<typeof useDialySalesReducer> = {
  state: { dialySales: [] },
  dispatch: () => {},
};
