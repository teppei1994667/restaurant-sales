import { ReactNode, createContext, useReducer } from "react";
import { DialySaleAction, DialySaleType } from "@/type/DialySale";
import { defaultDialySalesReducerContext, useDialySalesReducer } from "./DIalySalesReducer";

// export type DialySalesContextType = {
//   state: DialySaleType[];
//   dispatch: (value: DialySaleAction) => void;
// };

type Props = {
  children: ReactNode;
};

export const DialySalesStateContext = createContext(defaultDialySalesReducerContext);

export const DialySalesContextProvider = (props: Props) => {
  return (
    <DialySalesStateContext.Provider value={useDialySalesReducer()}>{props.children}</DialySalesStateContext.Provider>
  );
};
