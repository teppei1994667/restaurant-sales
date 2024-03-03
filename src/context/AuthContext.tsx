import { ReactNode, createContext, useState } from "react";
import { User } from "@/type/User";

type AuthContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // currentUser: User | undefined;
  // setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState<User | undefined>()

  return (
    <AuthContext.Provider value={{ isLoading, setIsLoading, isSignedIn, setIsSignedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
