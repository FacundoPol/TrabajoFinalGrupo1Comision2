import { createContext, useMemo, useState } from "react";

import datosProductos from "../data/ProductosData.json"

export const ProductosContext = createContext(null);

export function ProductosProvider({hijo}){
    const [productos,setProductos] = useState(datosProductos);


    const valoresContext = useMemo(()=>{
        productos;
    },[productos])

    return(
        <ProductosContext.Provider value={valoresContext}>
            {hijo}
        </ProductosContext.Provider>
    )
}