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


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/acerca-de" element={<About />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} /> 
      <Route path="/agregar-prod" element={<ProductoData />} />
      <Route path="/editar-producto/:id" element={<EditarProducto />} />
      <Route path="/gestion-prod" element={<GestionProductos/>} />
      <Route path="/login" element={<LoginForm/>} />

    </Routes> //agrego la ruta product/:id para usarla en listaProductos.jsx
  );
}