import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

import Productos from '../components/ListaProductos'

export default function Home(){
//con Productos solo llamo al compunente ListaProductos, allí es en donde se encuentra el desarrollo de la funcion
    return(
      < Container>
    
      <Productos/>
    
     <Footer></Footer>
      </Container> 

    );
}