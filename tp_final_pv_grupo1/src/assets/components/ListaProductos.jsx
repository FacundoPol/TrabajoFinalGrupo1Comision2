import { useProductos } from '../hooks/useProductos';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //importo use navigate

const Productos = () => {
  const { productos, eliminarProducto, verDetalles, favoritos, toggleFavorito } = useProductos();
  //agrego navigate para redirigir la ruta dinamica definida en AppRoutes
  //para el detalle del producto
const navigate = useNavigate(); 
  return (
    <Container>
      <h3>Lista de Productos:</h3>
      <Row>
        {productos.map((producto) => {
          const id = producto.id || producto.Id;
          const nombre = producto.Nombre || producto.title || "Sin nombre";
          const precio = producto.Precio || producto.price || 0;
          const imagen = producto["Imagen representativa"] || producto.image || "https://www.italfren.com.ar/images/catalogo/imagen-no-disponible.jpeg";
          const descripcion = producto.Descripcion || producto.description || "Sin descripción";

          const esFavorito = favoritos.includes(id);

          return (
            <Col key={id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={imagen}
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <Card.Body>
                  <Card.Title>{nombre}</Card.Title>
                  <Card.Text>${precio} - ID: {id}</Card.Text>
                  <Card.Text>{descripcion.substring(0, 100)}</Card.Text>

                  <Button variant="dark"  
                  className="me-2" //activo la ruta que ya esta definida en AppRoute /producto/:id
                  onClick={() => navigate(`/producto/${id}`)}> Ver Detalles
                  </Button>    

                  <Button
                    variant={esFavorito ? "danger" : "outline-secondary"}
                    onClick={() => toggleFavorito(id)}
                  >
                    {esFavorito ? "❤️ Favorito" : "♡ Marcar favorito"}
                  </Button>

                  <Button
                    variant="outline-danger"
                    className="me-2"
                    onClick={() => eliminarProducto(id)}
                  >
                    🗑️ Eliminar
                  </Button>
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
