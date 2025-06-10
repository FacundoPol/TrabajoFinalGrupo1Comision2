import { createContext, useMemo, useState } from "react";
import datosProductos from "../data/ProductosData.json";

export const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(datosProductos);
//agrega estado del arreglo "favoritos" y lo inicializa en vacío
   const [favoritos, setFavoritos] = useState([]);


   //Función para alternar entre "favorito/no Favorito"
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
//con "prev" evaluamos el estado anterior de "favoritos", con "prev.includes" verificamos
//si esta marcado el id como "favorito",con "prev.filter" lo usamos para
//quitarlo del arreglo, y con "...prev, id" , si no está copia los elementos
//anteriores y agrega el nuevo id al final

  const valoresContext = useMemo(() => {
    return {
      productos,
      favoritos,
      toggleFavorito,
      //verDetalles (lo inhabilito porque no lo estoy usando,pero iria aqui)
    };
  }, [productos, favoritos]);

  return (
    <ProductosContext.Provider value={valoresContext}>
      {children}
    </ProductosContext.Provider>
  );
}