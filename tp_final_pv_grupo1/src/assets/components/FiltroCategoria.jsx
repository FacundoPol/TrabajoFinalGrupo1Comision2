import { useProductos } from '../hooks/useProductos';
import { Form, Row, Col } from "react-bootstrap";
import "../css/filtro.css";


const FiltroCategoria = () => {
  const { productos, categoriaSeleccionada, setCategoriaSeleccionada } = useProductos()

  // p/ extraer cat de prod
  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  return (
    <Form.Group as={Row} controlId="categoriaSelect" className="mb-4 filtro">
      <Form.Label column sm="2">Categoría:</Form.Label>
      <Col sm="10">
        <Form.Select
        className="filtro-select"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
              </option>
          ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default FiltroCategoria;