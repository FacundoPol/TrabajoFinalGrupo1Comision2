import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

import ProductoFormulario from '../components/ProductoFormulario'

export default function Formulario(){
//con Productos solo llamo al compunente ListaProductos, allí es en donde se encuentra el desarrollo de la funcion
    return(
      < Container>
    
      <ProductoFormulario/>
    
     <Footer></Footer>
      </Container> 

    );
}