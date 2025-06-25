import { Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const ProtectorRoutes = ({roles,children})=>{
    const {isAuthenticated,user} = useLogin();

    if(!isAuthenticated){
        return <Navigate to="/error" replace />
    }

    if(roles && !roles.includes(user?.rol)){
        return <Navigate to="/error" replace />
    }

    return children;
}

export default ProtectorRoutes;