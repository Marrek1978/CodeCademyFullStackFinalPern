import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";

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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn !== null ? JSON.parse(storedIsLoggedIn) : false;
  });


  const [userID, setUserID] = useState<string | null>(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID !== null) {
      try {
        return JSON.parse(storedUserID.trim());
      } catch (error) {
        console.error("Error parsing userID from localStorage:", error);
        // Handle the error or return a default value
        return null;
      }
    }
    return null;

  });


  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("userID", JSON.stringify(userID));
  }, [isLoggedIn, userID]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;