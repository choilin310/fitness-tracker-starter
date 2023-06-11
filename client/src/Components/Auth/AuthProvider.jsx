import { createContext, useState, useEffect } from "react";
import { fetchMyData } from "../../api/user";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  /*useEffect(() => {
    async function getMe() {
      const response = await fetchMyData(token);
      console.log("register response: ", response);
      setUser(response.user);
    }
    if (token) {
      getMe();
    }
  }, [token]);*/

  useEffect(() => {
    async function getMe() {
      try {
        const result = await fetchMyData();
        if (result.success) {
          setLoggedIn(true);
          setUser(user);
        } else {
          setUser({ username: "Guest" });
          setLoggedIn(false);
        }
      } catch (error) {
        setUser({ username: "Guest" });
        setLoggedIn(false);
      }
    }
    getMe();
  }, [loggedIn]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
