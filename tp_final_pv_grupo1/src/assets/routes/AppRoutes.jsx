// assets/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Favoritos from "../pages/Favoritos";
import About from "../pages/About";
import ProductoDetalle from "../pages/ProductDetalle"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/acerca-de" element={<About />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} /> 
    </Routes> //agrego la ruta product/:id para usarla en listaProductos.jsx
  );
}
