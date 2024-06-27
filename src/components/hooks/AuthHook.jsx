import { useContext } from "react";
import { AuthContext } from "../store/UserProvider";

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth };