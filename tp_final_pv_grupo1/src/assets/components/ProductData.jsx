import { useState, useEffect } from "react";
import ProductoFormulario from "./ProductoFormulario";
import { Alert } from "react-bootstrap"; 
import {useProductos} from '../hooks/useProductos'
import {useParams} from "react-router-dom"

const soloLetras =/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,:;(){}\[\]$#"&%°'!/\-*+–_]+$/;
const soloNumeros = /^\d+(\.\d{1,2})?$/;
const base64Regex = /^data:image\/(jpeg|png|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;

/*  ProductoData es un componente funcional que maneja la lógica de validación y
 el envío de datos de un formulario de producto al contexto global.
  Maneja los mensajes de éxito/error.
 */
const ProductoData = ({ esEdicion = false, onEdicionExitosa }) => {
    //se obtiene los datos y funciones del contexto con hook personalizado
     const { productos, loading, error: errorContext, agregarProducto, editarProducto } = useProductos();
     const { id } = useParams(); // ID del producto en la URL

     const [datosIniciales, setDatosIniciales] = useState(null);


    // Estados para mensajes de éxito y error locales del formulario
    const [error, setError] = useState({ error: false, mensaje: '' });
    const [exito, setExito] = useState(false);

    // Estado para indicarle al formulario que debe resetearse
    const [resetearFormulario, setResetearFormulario] = useState(false);

       useEffect(() => {
    if (esEdicion && id && productos.length > 0) {
      const productoEncontrado = productos.find(p => String(p.id) === id);
      if (productoEncontrado) {
        setDatosIniciales(productoEncontrado);
      } else {
        // Producto no encontrado
        setDatosIniciales(null);
      }
    }
  }, [id, productos, esEdicion]);

    /* la siguiente es una funcion boolenana que devuelve true si todos los campos de un objeto de producto son validos
    repetando las reglas definidas y false si no.
    Actualiza el estado de error con el mensaje correspondiente.
   */
    const validarFormu = (producto) => {
        let valid = true;
        let mensaje = '';

        if (!producto.nombre || !soloLetras.test(producto.nombre)) {
            valid = false;
            mensaje = 'El nombre del producto es obligatorio y solo debe contener letras.';
        } else if (isNaN(producto.precio) || producto.precio <= 0 || !soloNumeros.test(String(producto.precio))) {
            
            valid = false;
            mensaje = 'El precio debe ser un número válido y mayor que cero.';
        } else if (!producto.categoria) {
            valid = false;
            mensaje = 'La categoría es obligatoria. Por favor, selecciona una opción.';
        } else if (!producto.descripcion || producto.descripcion.trim() === '') {
            valid = false;
            mensaje = 'La descripción es obligatoria.';
        } else if (!producto.imagen ||  (!base64Regex.test(producto.imagen) && !producto.imagen.startsWith('http'))
  ) {
            valid = false;
            mensaje = 'Debe seleccionar una imagen válida (JPG, PNG, GIF, etc.).';
        }

        
        setError({ error: !valid, mensaje: mensaje });
        return valid;
    };

    const cargarDatos = (nuevoProductoRecibido) => {
        setError({ error: false, mensaje: '' });
        setExito(false);
        setResetearFormulario(false);

        const esValido = validarFormu(nuevoProductoRecibido);

        if (!esValido) {
            return; // Detiene el proceso si la validación falla
        }
         if (esEdicion) {
      editarProducto(nuevoProductoRecibido);
      setExito(true);
      if (onEdicionExitosa) onEdicionExitosa();
    } else {

        agregarProducto(nuevoProductoRecibido);
        setExito(true);
        setResetearFormulario(true); //activa el reseteo del formulario hijo
    };
};

return (
  <>
     {exito &&  (
      <Alert variant="success" className="mt-3">
        {esEdicion ? "Producto editado con éxito" : "Producto agregado con éxito"}
      </Alert>
    )}
    {error.error && (
       <Alert variant="danger" className="mt-3">
      ¡Error! {error.mensaje || "Por favor, complete todos los campos correctamente."}
      </Alert>
      )}
    {!errorContext && !loading && (
    <ProductoFormulario
        cargarDatos={cargarDatos}
        resetearFormulario={resetearFormulario}
        datosIniciales={datosIniciales}
        esEdicion={esEdicion}
    />
      )}
 </>
);
};

export default ProductoData;