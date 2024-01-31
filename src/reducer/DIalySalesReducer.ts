import { DisplayDialySale } from "@/type/DialySale";
import { useReducer } from "react";

type ReturnDialySalesType = {
  dialySales: DisplayDialySale[];
};

type DialySaleAction = {
  type: "returnData";
  payload: {
    id: number;
    salesDay: string;
    lunchSales: number;
    dinnerSales: number;
    lunchVisitor: number;
    dinnerVisitor: number;
    personnelCost: number;
    purchase: number;
    totalSale: number;
    totalVisitor: number;
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
