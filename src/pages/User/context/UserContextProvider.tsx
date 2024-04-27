import { ReactNode, createContext, useReducer } from "react";
import { defaultUserContextReducer, useUserContextReducer, userContextReducer } from "./UserContextReducer";
import { UserContextInfoInitialState } from "./UserContextInfo";

const { state, dispatch } = defaultUserContextReducer;
export const UserContext = createContext(state);
export const UserDispatch = createContext(dispatch);

type Props = {
  children: ReactNode;
};

export const UserContextProvider = (props: Props) => {
  const { state, dispatch } = useUserContextReducer();
  const { children } = props;

  return (
    <UserContext.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserContext.Provider>
  );
};
