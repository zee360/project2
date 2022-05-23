import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) {
      throw new Error('useAuthContext can only be used inside AuthProvider');
    }
    return authContext;
  };

export default useAuthContext;
  