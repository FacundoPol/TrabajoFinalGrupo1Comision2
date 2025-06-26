import { Card, Container, Row, Col } from "react-bootstrap"
import Footer from "../components/Footer";
import integrantesData from "../data/integrantesData.json"
import "../css/about.css"

export default function Acerca () {

return (
<div className="acerca-page">
     <Container>
     <h2 className="mb-3">
      Acerca de Nuestro Proyecto
     </h2>
     <p className="text-center">
      Aquí encontrarás información detallada sobre esta aplicación y sus desarrolladores.
     </p>
     <hr className="my-4" />
     <h2 className="mb-3">Propósito y Funcionalidad</h2>
     <p className="parrafo-about">
      Esta aplicación tiene como principal funcionalidad la gestión completa de productos como
      agregar nuevos productos, editar la información de los existentes, eliminar productos 
      que ya no sean necesarios y listar eficientemente todos los elementos cargados en el sistema. 
     </p>
     <h2 className="mb-3 mt-4">Contexto y Desarrollo</h2>
     <p className="parrafo-about">
      Este proyecto fue desarrollado por estudiantes de la carrera de Analista Programador Universitario (APU)
      como parte de su proyecto final para la materia Programación Visual.
      El objetivo principal de la aplicación es demostrar los conocimientos y habilidades técnicas
      adquiridas durante el cursado, aplicando conceptos de desarrollo frontend y backend en un entorno práctico.
     </p>
     <p className="parrafo-about">
      La aplicación fue construida utilizando las siguientes tecnologías:
     </p>
       <ul>
           <li className="li-about">React.js: Para la construcción de la interfaz de usuario interactiva y dinámica.</li>
           <li className="li-about">React-Bootstrap: Para un diseño responsivo y cracion de interfaz de usuario.</li>
           <li className="li-about">React Router DOM: Para la gestión de rutas y la navegación entre las diferentes páginas de la aplicación.</li>
       </ul>
       <br />
          <h2 className="text-center mb-4">Nuestro Equipo de Desarrollo</h2>
          <p className="text-center">
          Los integrantes que hicieron posible este proyecto son:
          </p>
    <Row xs={1} md={2} lg={3} className="g-4 justify-content-center"> 
     {integrantesData.map((integrante, idx) => (
         <Col key={idx} className="d-flex" >
         <Card className="flex-fill"> 
         <Card.Img variant="top" src={integrante.img} alt={`Foto de ${integrante.nombre}`} />
             <Card.Body className="d-flex flex-column">
             <Card.Title>{integrante.nombre}</Card.Title>
             <Card.Text className="mb-auto"> 
               Correo: {integrante.correo}
             </Card.Text>
              <Card.Text>
               GitHub: <a href={integrante.link} target="_blank" rel="noopener noreferrer">{integrante.link.split('https://github.com/')[1]}</a> 
             </Card.Text>
             </Card.Body>
         </Card>
         </Col>
       ))}
    </Row>
    <Footer></Footer>
    </Container>
    
 </div>
);
};

