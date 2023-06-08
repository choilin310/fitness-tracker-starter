import { useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
