import { useProductos } from '../hooks/useProductos';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';

const Productos = () => {
  //  extraemos productos, verDetalles, favoritos y toggleFavorito desde el contexto
  const { productos, verDetalles, favoritos, toggleFavorito } = useProductos();

  return (
    <Container>
      <h3>Lista de Productos:</h3>
      <Row>
        {productos.map((producto) => {
          const esFavorito = favoritos.includes(producto.Id); // Ver si está marcado

          return (
            <Col key={producto.Id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={producto["Imagen representativa"]} style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}/>
                <Card.Body>
                  <Card.Title>{producto.Nombre}</Card.Title>
                  <Card.Text>
                    {producto.Precio} - {producto.Id}
                  </Card.Text>
                  
                  
                  <Button variant="dark" className="me-2" onClick={() => verDetalles(producto.Id)}>
                    Ver Detalles
                  </Button>
                  
                  {/* Botón para marcar o desmarcar favorito */}
                  <Button
                    variant={esFavorito ? "danger" : "outline-secondary"}
                    onClick={() => toggleFavorito(producto.Id)}
                  >
                    {esFavorito ? "❤️ Favorito" : "♡ Marcar favorito"}
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