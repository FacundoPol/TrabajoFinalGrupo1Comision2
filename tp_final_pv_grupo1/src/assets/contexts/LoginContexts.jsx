import { createContext, useCallback, useMemo, useState } from "react";

import usersData from '../data/usuariosData.json';

export const LogContext = createContext(null);

export function LogProvider ({children}){
    const [user,setUser] = useState(false)

    const login = useCallback((credenciales) => {
        try {
            const usuarioEncontrado = usersData.find((u)=> u.username === credenciales.username && u.password === credenciales.password)
            if(usuarioEncontrado)
            {
                const {password,...userSinPass} = usuarioEncontrado;
                setUser(userSinPass);
                return{success : true}
            }
            else
            {
                setUser(null);
                return{success:false , message: 'Credenciales Invalidas. Porfavor ingrese nuevamente sus datos!'}
            }
        } catch (error) {
            setUser(null);
            return { success:false , message: 'Surgio un error inesperado'};
        }
    },[])

    const logout = useCallback(()=>{
        setUser(null);
    },[])

    const loginContextValue = useMemo(()=> ({
        user,
        login,
        logout,
        isAuthenticated: !!user
    }),[user,login,logout])

    return (
        <LogContext.Provider value={loginContextValue}>
            {children}
        </LogContext.Provider>
    )
}