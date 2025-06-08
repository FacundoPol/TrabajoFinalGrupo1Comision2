import { useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContexts";

export function useProductos () {
    const contexto = useContext(ProductosContext);

    if(contexto === null )
        throw new Error('useProductos debe ser usado dentro del PorductosProvider');

    return contexto;
}