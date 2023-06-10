import { createContext, useState, useEffect } from "react";
import { fetchMyData } from "../api/user";

export const AuthContext = createContext();

const AuthProvder = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const { user } = await fetchMyData();
        
        setUser(user);
        console.log("current user true", user);
        setLoggedIn(true);
      } catch (error) {
        setUser({ username: "Guest" });
        console.log("current user false", user);
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
console.log("current user", user);
console.log("is logged in ?", loggedIn)
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvder;
