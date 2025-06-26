import { useProductos } from '../hooks/useProductos';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //importo use navigate
import useLogin from '../hooks/useLogin';
import "../css/home.css";

const Productos = () => {
  const {isAuthenticated,user,login} = useLogin();
  const { productosFiltrados, eliminarProducto, verDetalles, favoritos, toggleFavorito } = useProductos();
  //agrego navigate para redirigir la ruta dinamica definida en AppRoutes
  //para el detalle del producto
const navigate = useNavigate(); 


// Normalizar los datos de API y los nuevos prod
  const productosNormalizados = productosFiltrados.map(p => ({
    id: p.id || p.Id,
    nombre: p.nombre || p.Nombre || p.title || "Sin nombre",
    precio: p.precio || p.Precio || p.price || 0,
    imagen: p.imagen || p["Imagen representativa"] || p.image || "https://www.italfren.com.ar/images/catalogo/imagen-no-disponible.jpeg",
    descripcion: p.descripcion || p.Descripcion || p.description || "Sin descripción",
    eliminado: p.eliminado || false
  }));


  return (
    <Container className='productos-page'>
      <h3 className='h3'>Lista de Productos</h3>
      <Row>
        {productosNormalizados
        .filter((producto)=>!producto.eliminado)
        .map((producto) => {
          const esFavorito = favoritos.includes(producto.id);

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
                  <Card.Text className='producto-descripcion'>{producto.descripcion.substring(0, 50)}</Card.Text>

                  <Button variant="dark"  
                  className="me-2" //activo la ruta que ya esta definida en AppRoute /producto/:id
                  onClick={() => navigate(`/producto/${producto.id}`)}> Ver Detalles
                  </Button>    

                  { isAuthenticated && user?.rol === 'USUARIO'
                  &&(<Button className="me-2"
                    variant={esFavorito ? "danger" : "outline-secondary"}
                    onClick={() => toggleFavorito(producto.id)}
                  >
                    {esFavorito ? "❤️ Favorito" : "♡ Marcar favorito"}
                  </Button>)}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Productos;