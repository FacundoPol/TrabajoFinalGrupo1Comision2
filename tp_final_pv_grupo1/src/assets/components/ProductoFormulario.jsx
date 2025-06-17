import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react"; 

const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,:;(){}\[\]$#"&%°'!/\-*+–_]+$/;
const soloNumeros = /^\d+(\.\d{1,2})?$/; // Permite enteros o decimales con hasta 2 dígitos después del punto
const base64Regex = /^data:image\/(jpeg|png|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/; // Para validar Base64 de imagen

  /* ProductoFormulario es un componente  formulario para ingresar datos de un producto.
   Recopila los datos y los pasa a una función de carga del componente padre.
   Se resetea cuando se le indica */


   const esImagenValida = (img) => {
  if (!img) return false;
  if (img.startsWith("data:image/")) return true; // base64
  return /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(img); // URL
};

const ProductoFormulario = ({ 
    cargarDatos,
  resetearFormulario,
  datosIniciales = null,
  esEdicion = false,

 }) => { 
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenArchivo, setImagenArchivo] = useState(null); 
    const [imagenPrevisualizacion, setImagenPrevisualizacion] = useState(''); // Para la URL Base64
    const [mostrarValidacion, setMostrarValidacion] = useState(false);




     // P/ cargar datos si es edición
  useEffect(() => {
    if (datosIniciales) {
      console.log("Datos iniciales cargados:", datosIniciales);
      setNombre(datosIniciales.nombre || "");
      setPrecio(datosIniciales.precio?.toString() || "");
      setCategoria(datosIniciales.categoria || "");
      setDescripcion(datosIniciales.descripcion || "");
      setImagenPrevisualizacion(datosIniciales.imagen || "");
    }
  }, [datosIniciales]);

    /*el siguente useEffect resetea los campos del formulario
     cuando la prop `resetearFormulario` cambia a true.*/
    useEffect(() => {
        if (resetearFormulario) {
            setNombre('');
            setPrecio('');
            setCategoria('');
            setDescripcion('');
            setImagenArchivo(null);
            setImagenPrevisualizacion('');
            setMostrarValidacion(false); 
        }
    }, [resetearFormulario]); 

    /* la siguiente funcion se encarga de la selección de un archivo de imagen, lo guarda
    y crea una URL de previsualización en Base64. */
    const imagenCarga = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenArchivo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPrevisualizacion(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagenArchivo(null);
            setImagenPrevisualizacion('');
        }
    };

    /* handleLocalSubmit es una funcion que se encarga del manejo envío del formulario.
       Previene la recarga de la página,
       el objeto de producto y lo pasa a la función `cargarDatos` del padre */
    const handleLocalSubmit = (event) => {
        event.preventDefault();
        setMostrarValidacion(true); 
    
 // Validaciones de los campos
  if (!nombre || !soloLetras.test(nombre)) return;
  if (!precio || !soloNumeros.test(precio) || parseFloat(precio) <= 0) return;
  if (!categoria || !soloLetras.test(categoria)) return;
  if (!descripcion.trim()) return;

  // Validación de imagen:
  if (!imagenPrevisualizacion) {
    return; // cuando no hay imagen ni previa ni nueva
  }

  if (imagenArchivo && !base64Regex.test(imagenPrevisualizacion)) {
    return; // si se sube una nueva imagen, pero es inválida
  }


    /*se crea un objeto nuevoProducto*/
     const nuevoProducto = {
         id: datosIniciales?.id || undefined,
         nombre,
         precio: parseFloat(precio),
         categoria,
         descripcion, 
         imagen: imagenPrevisualizacion, //esta seria La URL Base64
    };
        cargarDatos(nuevoProducto); //llama a la funcion padre
    };

 return (
 <Container className="my-5">
     <Row className="justify-content-center align-items-center">
     <Col md={6} xs={12} sm={10}>
         <Card>
         <Card.Header as="h5"> 
          {esEdicion ? "Editar Producto" : "Agregar Producto"}
         </Card.Header>
         <Card.Body>
         <Form onSubmit={handleLocalSubmit} noValidate>
             <Form.Group className="mb-3">
             <Form.Label>Subir Imagen</Form.Label>
             <Form.Control
               type="file"
               id="imagen"
               accept="image/*"
              /* * isInvalid={mostrarValidacion && (!imagenArchivo || !base64Regex.test(imagenPrevisualizacion))}}*/
               onChange={imagenCarga}
                isInvalid={
                      mostrarValidacion && !esImagenValida(imagenPrevisualizacion)
                    } 
             />
              <Form.Control.Feedback type="invalid">
                Debes subir una imagen válida (base64 o URL con formato de imagen).
              {/*{mostrarValidacion && (!imagenArchivo || !base64Regex.test(imagenPrevisualizacion))
                ? "Debe seleccionar una imagen válida."
                : "Por favor, selecciona un archivo de imagen."} */}
              </Form.Control.Feedback>
                {imagenPrevisualizacion && (
                <div className="mt-2">
                <img
                src={imagenPrevisualizacion}
                alt="Previsualización de la imagen"
                className="img-thumbnail"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
               />
               </div>
               )}
             </Form.Group>
                      
             <Form.Group className="mb-3">
             <Form.Label>Producto</Form.Label>
             <Form.Control
              type="text"
              placeholder="ingrese nombre de producto"
              id='nombre'
              value={nombre}
              isInvalid={mostrarValidacion && (!nombre || !soloLetras.test(nombre))}
              onChange={(e) => setNombre(e.target.value)}
             />
              <Form.Control.Feedback type="invalid">
                {mostrarValidacion && !nombre
                  ? "El nombre es obligatorio."
                  : "El nombre debe contener solo letras y espacios."}
               </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="$999,99"
              id="precio"
              value={precio}
              isInvalid={mostrarValidacion && (!precio || !soloNumeros.test(precio) || parseFloat(precio) <= 0)}
              onChange={(e) => setPrecio(e.target.value)}
             />
              <Form.Control.Feedback type="invalid">
                 {mostrarValidacion && (!precio || parseFloat(precio) <= 0)
                  ? "El precio es obligatorio y mayor que cero."
                  : "El precio debe ser un número válido."}
              </Form.Control.Feedback>
             </Form.Group>

             <Form.Group className="mb-3">
             <Form.Label>Categoria</Form.Label> 
             <Form.Control
               type="text"
               placeholder="ingrese categoria"
               id="categoria"
               value={categoria}
               isInvalid={mostrarValidacion && (!categoria || !soloLetras.test(categoria))}
               onChange={(e) => setCategoria(e.target.value)}
              />
               <Form.Control.Feedback type="invalid">
                {mostrarValidacion && !categoria
                ? "La categoria es obligatoria."
                : "La categoria debe contener solo letras y espacios."}
                </Form.Control.Feedback>
             </Form.Group>

             <Form.Group className="mb-3">
             <Form.Label>descripcion</Form.Label> 
             <Form.Control
                as="textarea"
                rows={4}
                placeholder="ingrese descripcion"
                id="detalle" 
                value={descripcion} 
                isInvalid={mostrarValidacion && (!descripcion || descripcion.trim() === '')}
                onChange={(e) => setDescripcion(e.target.value)} 
             />
              <Form.Control.Feedback type="invalid">
                 {mostrarValidacion && !descripcion
                 ? "La descripcion es obligatoria."
                 : "La descripcion no puede estar vacía."}
              </Form.Control.Feedback>
             </Form.Group>

             <Button variant="primary" type="submit">
              {esEdicion ? "Guardar Cambios" : "Agregar"}
             </Button>
        </Form>
     </Card.Body>
     </Card>
  </Col>
  </Row>
</Container>
    );
};

export default ProductoFormulario;