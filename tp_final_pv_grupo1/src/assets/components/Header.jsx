import '../css/header.css';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Nav.Link as={Link} to="/" className="logo-link">
    <div className="logo">
      <div className="logo-icon"></div>
      <div className="logo-text">Tienda<span>Fácil</span></div>
    </div>
    </Nav.Link>
  );
};

export default Header;