// assets/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Favoritos from "../pages/Favoritos";
import About from "../pages/About";
import ProductoDetalle from "../pages/ProductDetalle"; 
import ProductoData from "../components/ProductData";
import EditarProducto from "../pages/EditarProducto";
import LoginForm from "../pages/LoginForm";
import GestionProductos from "../pages/GestionProductos";
import Error from "../pages/Error";
import ProtectorRoutes from "../components/ProtectorRoutes";
import PapeleraProductos from "../pages/PapeleraProductos"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/acerca-de" element={<About />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} /> 
      <Route path="/favoritos" element={<ProtectorRoutes roles={['USUARIO']}><Favoritos /></ProtectorRoutes>} />
      <Route path="/agregar-prod" element={<ProtectorRoutes roles={['ADMINISTRATIVO']}><ProductoData /></ProtectorRoutes>} />
      <Route path="/editar-producto/:id" element={<ProtectorRoutes roles={['ADMINISTRATIVO']}><EditarProducto /></ProtectorRoutes>} />
      <Route path="/gestion-prod" element={<ProtectorRoutes roles={['ADMINISTRATIVO']}><GestionProductos/></ProtectorRoutes>} />
      <Route path="/papelera-prod" element={<ProtectorRoutes roles={['ADMINISTRATIVO']}><PapeleraProductos/></ProtectorRoutes>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/error" element={<Error/>} />

    </Routes> //agrego la ruta product/:id para usarla en listaProductos.jsx
  );
}