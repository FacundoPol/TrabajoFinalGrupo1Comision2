import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import ListaFavoritos from '../components/ListaFavoritos';


export default function Favoritos() {
  return (
    <Container>
      
      <h1>Mis Productos Favoritos</h1>
      <ListaFavoritos/>
      <Footer />
    </Container>
  );
}