import { createContext, useState , useEffect } from "react";


export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);
//agrega estado del arreglo "favoritos" y lo inicializa en vacío
   const [favoritos, setFavoritos] = useState([]);

 useEffect(() => { 
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok){
                throw new Error (`Error HTTP: ${response.status} - ${response.statusText || 'Desconocido'}`);
            }
        const data = await response.json();
  const productosTransformados = data.map((p) => ({
          id: p.id,
          nombre: p.title,
          precio: p.price,
          categoria: p.category,
          descripcion: p.description,
          imagen: p.image,
          eliminado:false
        }));

        setProductos(productosTransformados);
        }
        catch(err){
            console.error("Fallo al solicitar los productos" , err);
            setError(err.message || 'Error al guardar los productos');
        }
        finally{
            setLoading(false);
        }
    };
    fetchProductos();
  }, []); 

  const agregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => { 
      const maxId = prevProductos.length > 0
        ? Math.max(...prevProductos.map(p => p.id || p.Id)) 
        : 0;
      const idParaNuevoProducto = maxId + 1;
       return [...prevProductos, {...nuevoProducto, id: idParaNuevoProducto}]; });
    console.log("Nuevo producto agregado localmente en el Context:", nuevoProducto);
  };
const editarProducto = (productoEditado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoEditado.id ? productoEditado : p))
    );
  };

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

// función p/ filtrar los prod s/  cat seleccionada
const productosFiltrados = categoriaSeleccionada
  ? productos.filter(p => p.categoria === categoriaSeleccionada)
  : productos;


    //Funcion para eliminar producto
  const eliminarProducto = (id) => {
    setProductos((prevProductos) =>
    prevProductos.map((producto) => producto.id === id? {...producto, eliminado:true } : producto)
  );}

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

  const valoresContext = { 
      productos,
      loading,
      error,
      productosFiltrados, // <-  prod que coincidan con la cat seleccionada
      categoriaSeleccionada,
      setCategoriaSeleccionada,
      favoritos,
      eliminarProducto,
      agregarProducto,
       editarProducto,
      toggleFavorito,
      //verDetalles (lo inhabilito porque no lo estoy usando,pero iria aqui)
  };

  return (
    <ProductosContext.Provider value={valoresContext}>
      {children}
    </ProductosContext.Provider>
  );
}