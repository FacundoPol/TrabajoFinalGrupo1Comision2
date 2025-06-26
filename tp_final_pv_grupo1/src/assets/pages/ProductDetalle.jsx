import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { Container, Card, Button } from "react-bootstrap";
import useLogin from "../hooks/useLogin";

export default function ProductoDetalle(){
    const { id } = useParams()
    const { productos, favoritos, toggleFavorito } = useProductos();
    const {isAuthenticated,user} = useLogin();

//  busca en el array productos el objeto cuyo id coincida con el id recibido a travez de useParams 
    const producto = productos.find((p) => String(p.id) === id) 

    //obtengo la funcion navigate del hook useNavigate para cambiar de rutas
    const navigate=useNavigate(); 

    if(!producto) return <p>Producto no encontrado</p>

    const esFavorito = favoritos.includes(producto.id)

    return (
        <Container className="my-4">
            <Card>
                <Card.Img
                variant="top"
                src={producto.imagen}
                style={{height: '300px', objectFit: 'contain'}}
                />
                <Card.Body>
                    <Card.Title className="producto-nombre">{producto.title}</Card.Title>
                    <Card.Text className="producto-precio">
                        Precio: ${producto.precio}
                    </Card.Text>
                    <Card.Text className="producto-categoria">
                        Categoria: {producto.category || producto.categoria}
                    </Card.Text>
                    <Card.Text className="producto-descripcion">
                        Descripcion: {producto.description || producto.descripcion}
                    </Card.Text>
                    
                    { isAuthenticated && user?.rol === 'USUARIO'
                    &&(<Button className="me-2"
                    variant={esFavorito ? 'danger' : 'outline-secondary'}
                    onClick={() => toggleFavorito(producto.id)}
                    >
                    {esFavorito ? 'Quitar de favoritos' : 'Marcar como favorito'}    
                    </Button>)}
                    <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}> 
                        Volver
                    </Button>
                </Card.Body>
            </Card>

        </Container>
    )
}