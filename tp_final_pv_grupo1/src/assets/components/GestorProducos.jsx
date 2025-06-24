import { useProductos } from '../hooks/useProductos';
import { Container, Row, Card, Button, Col , Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //importo use navigate
import useLogin from '../hooks/useLogin';
import { useState } from 'react';
const GestorProductos = () => {
  const {isAuthenticated,user} = useLogin();
  const { productos, eliminarProducto, favoritos } = useProductos();
  //agrego navigate para redirigir la ruta dinamica definida en AppRoutes
  //para el detalle del producto
const navigate = useNavigate(); 

//Estados para el confirmar eliminacion
const [showModal, setShowModal] = useState(false);
const [productoAEliminar, setProductoAEliminar] = useState(null);

  const confirmarEliminacion = (id) => {
    eliminarProducto(id);
    setShowModal(false);
  };

// Normalizar los datos de API y los nuevos prod
  const productosNormalizados = productos.map(p => ({
    id: p.id || p.Id,
    nombre: p.nombre || p.Nombre || p.title || "Sin nombre",
    precio: p.precio || p.Precio || p.price || 0,
    imagen: p.imagen || p["Imagen representativa"] || p.image || "https://www.italfren.com.ar/images/catalogo/imagen-no-disponible.jpeg",
    descripcion: p.descripcion || p.Descripcion || p.description || "Sin descripción",
  }));


  return (
    <Container>
      <h3>Lista de Productos:</h3>
      <Row>
        {productosNormalizados.map((producto) => {
          const esFavorito = favoritos.includes(producto.id);

          return (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>${producto.precio} - ID: {producto.id}</Card.Text>
                  <Card.Text>{producto.descripcion.substring(0, 100)}</Card.Text>

                  <Button variant="dark" 
                  className="me-2" //activo la ruta que ya esta definida en AppRoute /producto/:id
                  onClick={() => navigate(`/producto/${producto.id}`)}> Ver Detalles
                  </Button>    

                  { isAuthenticated && user?.rol === 'ADMINISTRATIVO'
                  &&(
                   <Button 
                    className="me-2"
                    variant="warning"
                    onClick={() => navigate(`/editar-producto/${producto.id}`)}
                    >
                       Editar
                    </Button>)}

                  {isAuthenticated && user?.rol === 'ADMINISTRATIVO' && (
                    <>
                      <Button
                        variant="outline-danger"
                        className="me-2"
                        onClick={() => {
                          setProductoAEliminar(producto);
                          setShowModal(true);
                        }}
                      >
                        🗑️ Eliminar
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
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoAEliminar && (
            <p>
              ¿Estás seguro de eliminar <strong>{productoAEliminar.nombre}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmarEliminacion(productoAEliminar.id)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestorProductos;