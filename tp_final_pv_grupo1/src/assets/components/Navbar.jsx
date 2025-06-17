import {Navbar, Nav, Container, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Header from "./Header"
import useLogin from "../hooks/useLogin";

export default function AppNavbar(){
    const {logout,isAuthenticated,user} = useLogin();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return(
        <div>
            <Header />
        <Navbar bg= "success" variant="dark" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        { isAuthenticated && user?.rol === 'USUARIO'
                         &&(<Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>)}

                        {isAuthenticated && user?.rol === 'ADMINISTRATIVO' && (
                        <>
                            <Nav.Link as={Link} to="/gestion-prod">Gestión de Productos</Nav.Link>
                            <Nav.Link as={Link} to="/agregar-prod">Agregar Producto</Nav.Link>
                        </>)}

                        <Nav.Link as={Link} to="/acerca-de">Acerca de</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                    {isAuthenticated?
                    (<Button variant="primary" onClick={handleLogout}>Cerrar Sesion</Button>):
                    (<Nav.Link className="text-white bg-dark px-3 rounded" as={Link} to="/login">Iniciar Sesion</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    );
}