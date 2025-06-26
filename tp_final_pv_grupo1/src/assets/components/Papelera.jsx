import { useProductos } from '../hooks/useProductos';
import { Container, Row, Card, Button, Col , Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //importo use navigate
import useLogin from '../hooks/useLogin';
import { useState } from 'react';


const Papelera = () => {
  const {isAuthenticated,user} = useLogin();
  const { productos, recuperarProducto } = useProductos();
  //agrego navigate para redirigir la ruta dinamica definida en AppRoutes
  //para el detalle del producto
const navigate = useNavigate(); 

//Estados para el confirmar eliminacion
const [showModal, setShowModal] = useState(false);
const [productoARecuperar, setProductoARecuperar] = useState(null);


  const confirmarRecuperacion = (id) => {
    recuperarProducto(id);
    setShowModal(false);
  };

// Normalizar los datos de API y los nuevos prod
  const productosNormalizados = productos.map(p => ({
    id: p.id || p.Id,
    nombre: p.nombre || p.Nombre || p.title || "Sin nombre",
    precio: p.precio || p.Precio || p.price || 0,
    imagen: p.imagen || p["Imagen representativa"] || p.image || "https://www.italfren.com.ar/images/catalogo/imagen-no-disponible.jpeg",
    descripcion: p.descripcion || p.Descripcion || p.description || "Sin descripción",
    eliminado: p.eliminado || false
  }));


  return (
    <Container className='productos-page'>
      <h3 className='h3'>Papelera de Productos</h3>
      <Row>
        {productosNormalizados
        .filter((producto)=>producto.eliminado)
        .map((producto) => {

          return (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4 d-flex">
              <Card className='producto-card flex-fill d-flex flex-column'>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <Card.Body>
                  <Card.Title className='producto-nombre'>{producto.nombre}</Card.Title>
                  <Card.Text className='producto-precio'>${producto.precio} - ID: {producto.id}</Card.Text>
                  <Card.Text className='producto-descripcion'>{producto.descripcion.substring(0, 100)}</Card.Text>

                  {isAuthenticated && user?.rol === 'ADMINISTRATIVO' && (
                    <>
                      <Button
                        variant="outline-success"
                        className="me-2"
                        onClick={() => {
                        setProductoARecuperar(producto);
                        setShowModal(true);
                        }}>
                        Recuperar
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
       {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Recuperacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoARecuperar && (
            <p>
              ¿Estás seguro de recuperar el producto? <strong>{productoARecuperar.nombre}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={() => confirmarRecuperacion(productoARecuperar.id)}
          >
            Recuperar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Papelera;