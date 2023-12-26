import { ReactNode, createContext } from "react";
import { defaultDialySalesReducerContext, useDialySalesReducer } from "./DIalySalesReducer";

type Props = {
  children: ReactNode;
};

export const DialySalesStateContext = createContext(defaultDialySalesReducerContext);

export const DialySalesContextProvider = (props: Props) => {
  return (
    <DialySalesStateContext.Provider value={useDialySalesReducer()}>{props.children}</DialySalesStateContext.Provider>
  );
};
