import { ReactNode, createContext } from "react";
import {
  defaultDialySalesReducerContext,
  useDialySalesReducer,
} from "./DialySalesContextReducer";

type Props = {
  children: ReactNode;
};

const { state, dispatch } = defaultDialySalesReducerContext;

export const DialySalesContext = createContext(state);
export const DialySalesDispatch = createContext(dispatch);

export const DialySalesContextProvider = (props: Props) => {
  const { state, dispatch } = useDialySalesReducer();
  const { children } = props;
  return (
    <DialySalesContext.Provider value={state}>
      <DialySalesDispatch.Provider value={dispatch}>
        {" "}
        {children}
      </DialySalesDispatch.Provider>
    </DialySalesContext.Provider>
  );
};
