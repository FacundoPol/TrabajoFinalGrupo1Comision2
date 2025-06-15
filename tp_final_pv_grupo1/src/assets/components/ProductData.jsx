import { useState } from "react";
import ProductoFormulario from "../pages/ProductPage";
import { Alert } from "react-bootstrap"; 
import {useProduct} from '../hook/useProduct'

const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const soloNumeros = /^\d+(\.\d{1,2})?$/;
const base64Regex = /^data:image\/(jpeg|png|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;

/*  ProductoData es un componente funcional que maneja la lógica de validación y
 el envío de datos de un formulario de producto al contexto global.
  Maneja los mensajes de éxito/error.
 */
const ProductoData = () => {
    //se obtiene los datos y funciones del contexto con hook personalizado
     const { productos, loading, error: errorContext, agregarProducto } = useProduct();

    // Estados para mensajes de éxito y error locales del formulario
    const [error, setError] = useState({ error: false, mensaje: '' });
    const [exito, setExito] = useState(false);

    // Estado para indicarle al formulario que debe resetearse
    const [resetearFormulario, setResetearFormulario] = useState(false);

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
        } else if (!producto.categoria || !soloLetras.test(producto.categoria)) {
            valid = false;
            mensaje = 'La categoría es obligatoria y solo debe contener letras.';
        } else if (!producto.descripcion || producto.descripcion.trim() === '') {
            valid = false;
            mensaje = 'La descripción es obligatoria.';
        } else if (!producto.imagen || !base64Regex.test(producto.imagen)) {
            valid = false;
            mensaje = 'Debe seleccionar una imagen válida (JPG, PNG, GIF, etc.).';
        }

        
        setError({ error: !valid, mensaje: mensaje });
        return valid;
    };

    /* La siguente funcion cargarDatos es una funcion callback que recibe los datos del formulario hijo.
      Valida los datos y si son correctos, los agrega al contexto de productos.
      Gestiona los estados de éxito y reseteo del formulario.
    */
    const cargarDatos = (nuevoProductoRecibido) => {
        setError({ error: false, mensaje: '' });
        setExito(false);
        setResetearFormulario(false);

        const esValido = validarFormu(nuevoProductoRecibido);

        if (!esValido) {
            return; // Detiene el proceso si la validación falla
        }

        agregarProducto(nuevoProductoRecibido);
        setExito(true);
        setResetearFormulario(true); //activa el reseteo del formulario hijo
    };

return (
  <>
     {exito &&  (
      <Alert variant="success" className="mt-3">
        Producto agregado con exito
      </Alert>
    )}
    {error.error && (
       <Alert variant="danger" className="mt-3">
      ¡Error! {error.mensaje || "Por favor, complete todos los campos correctamente."}
      </Alert>
      )}
    {!errorContext && !loading && (
    <ProductoFormulario cargarDatos={cargarDatos} resetearFormulario={resetearFormulario} />
      )}
 </>
);
};

export default ProductoData;