import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "./Header"

export default function AppNavbar(){
    return(
        <div>
            <Header />
        <Navbar bg= "success" variant="dark" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
                        <Nav.Link as={Link} to="/acerca-de">Acerca de</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    );
}