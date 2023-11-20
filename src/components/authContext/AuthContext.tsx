import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userID: string | null;
  setUserID: Dispatch<SetStateAction<string | null>>;
}

const AuthDefaultContext: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  userID: null,
  setUserID: () => { },
};

const AuthContext = createContext<AuthContextType>(AuthDefaultContext);

interface AuthProviderProps {
  children: ReactNode
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;