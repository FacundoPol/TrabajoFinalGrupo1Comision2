import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useEffect, useState } from "react";
import ProductoData from "../components/ProductData"; 


const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const existente = productos.find((p) => String(p.id) === id);
    if (existente) {
      setProductoSeleccionado(existente);
      setLoading(false);
    }
  }, [productos]);

  const handleEdicionExitosa = () => {
    navigate("/productos");
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!productoSeleccionado) return <p>Producto no encontrado</p>;

  return (
    <>
      <ProductoData
        datosIniciales={productoSeleccionado}
        esEdicion={true}
        onEdicionExitosa={handleEdicionExitosa}
      />
      <Footer />
    </>
  );
};

export default EditarProducto;

