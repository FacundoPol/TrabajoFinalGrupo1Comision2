import { BrowserRouter } from "react-router-dom";
import AppNavbar from "./assets/components/Navbar";
import AppRoutes from "./assets/routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
