import { ReactNode, createContext } from "react";
import { defaultStoreContextReducer, useStoreContextReducer } from "./StoreContextReducer";

const { state, dispatch } = defaultStoreContextReducer;
export const StoreContext = createContext(state);
export const StoreDispatch = createContext(dispatch);

type Props = {
  children: ReactNode;
};

export const StoreContextProvider = (props: Props) => {
  const { state, dispatch } = useStoreContextReducer();
  const { children } = props;

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatch.Provider value={dispatch}>{children}</StoreDispatch.Provider>
    </StoreContext.Provider>
  );
};
