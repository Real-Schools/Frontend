import AuthContext from "@/context/AuthorizationContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
