import { createContext, useState, useEffect } from "react";
import { fetchMyData } from "../api/user";

export const AuthContext = createContext();

// didn't like squarebrackers around children ??
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getMe() {
      const response = await fetchMyData(token);
      console.log("register response: ", response);
      setUser(response.data);
    }
    if (token) {
      getMe();
    }
  }, [token]);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
