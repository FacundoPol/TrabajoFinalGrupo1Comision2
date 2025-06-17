import { useContext } from "react";
import { LogContext } from "../contexts/LoginContexts"

function useLogin(){
    const context = useContext(LogContext);

    if(context === null)
        throw new Error('useLogin debe ser usado dentro de un LogProvider');

    return context;
}

export default useLogin;