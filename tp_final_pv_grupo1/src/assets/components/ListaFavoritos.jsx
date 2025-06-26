import { useProductos } from '../hooks/useProductos';
import { Container, Row, Col, Card, Button, CardBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import "../css/favoritos.css";

//exporto el componente ListaFavoritos para usarlo dentro de Favoritos.jsx
//y mostrar los productos marcados como fav. 
export default function ListaFavoritos(){

    // llamo a los arrays productos,favoritos y la funcion toogleFavorito declarados 
    // en ProductosContexts.jsx mediante el hook useProductos()
    const {productos, favoritos, toggleFavorito} = useProductos()
    
    /*creo un nuevo array llamado productosFavoritos que contiene sola los productos
    cuyo ID esta presente en el array favoritos*/ 
    const productosFavoritos = productos.filter((p) => favoritos.includes(p.id))

    const navigate = useNavigate();

    return (
        <Container className='productos-page'>
            <Row>
                {productosFavoritos.lenght === 0 ? (
                 <p>No hay productos marcados como favoritos</p>   
                ):(
                    productosFavoritos.map((producto) => (
                        <Col key={producto.id} className='mb-4 d-flex'>
                            <Card className='producto-card flex-fill d-flex flex-column'>
                                <Card.Img
                                    variant="top"
                                    src={producto.imagen}
                                    style={{
                                        height: '200px',
                                        objectFit: 'contain',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                    />
                                    <Card.Body>
                                        <Card.Title className='producto-nombre'>{producto.nombre}</Card.Title>
                                        <Card.Text className='producto-precio'>${producto.precio}</Card.Text>
                                        <Button
                                            variant="danger"
                                            onClick={() => toggleFavorito(producto.id)}>  Quitar de Favoritos
                                        </Button>
                                        <Button variant="dark"  
                                            className="me-2" //activo la ruta que ya esta definida en AppRoute /producto/:id
                                            onClick={() => navigate(`/producto/${producto.id}`)}> Ver Detalles
                                        </Button>

                                    </Card.Body>

                            </Card>
                        </Col>
                    )
                ))
            }
            </Row>
        </Container>
    )
} 