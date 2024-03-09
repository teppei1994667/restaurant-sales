import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "@/type/User";

export type AuthContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  console.log("AuthContext isLoading", isLoading);
  console.log("AuthContext isSignedIn", isSignedIn);
  console.log("AuthContext currentUser", currentUser);

  return (
    <AuthContext.Provider value={{ isLoading, setIsLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
