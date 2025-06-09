// assets/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Favoritos from "../pages/Favoritos";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/acerca-de" element={<About />} />
    </Routes>
  );
}
