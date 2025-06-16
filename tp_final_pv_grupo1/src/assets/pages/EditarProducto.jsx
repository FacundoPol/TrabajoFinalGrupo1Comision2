import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import ProductoData from '../components/ProductData';

export default function EditarProducto() {
  return (
    <Container>
      <ProductoData esEdicion={true} />
      <Footer />
    </Container>
  );
}