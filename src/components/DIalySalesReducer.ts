import { DialySaleAction, DialySaleType, ReturnDialySalesType } from "@/type/DialySale";
import { useReducer } from "react";

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
