import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  const volver = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <Card className="text-center p-4 shadow rounded-4">
            <Card.Body>
              <Card.Title as="h1" className="display-3 text-danger">UPS ERROR!</Card.Title>
              <Card.Text className="fs-4">Página no encontrada</Card.Text>
              <Button variant="primary" onClick={volver}>Volver al inicio</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Error;