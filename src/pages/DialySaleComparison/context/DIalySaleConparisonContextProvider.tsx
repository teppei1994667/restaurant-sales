import { ReactNode, createContext } from "react";
import {
  defaultDialySaleComparisonReducerContext,
  useDialySaleComparisonReducer,
} from "./DialySaleComparisonContextReducer";

type Props = {
  children: ReactNode;
};

const { state, dispatch } = defaultDialySaleComparisonReducerContext;

export const DialySaleComparisonContext = createContext(state);
export const DialySaleComparisonDispatch = createContext(dispatch);

export const DialySaleComparisonContextProvider = (props: Props) => {
  const { state, dispatch } = useDialySaleComparisonReducer();
  const { children } = props;
  return (
    <DialySaleComparisonContext.Provider value={state}>
      <DialySaleComparisonDispatch.Provider value={dispatch}>
        {" "}
        {children}
      </DialySaleComparisonDispatch.Provider>
    </DialySaleComparisonContext.Provider>
  );
};
