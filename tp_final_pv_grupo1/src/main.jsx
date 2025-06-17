import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductosProvider } from './assets/contexts/ProductosContexts.jsx';
import { LogProvider } from './assets/contexts/LoginContexts.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogProvider>
    <ProductosProvider>
      <App />
    </ProductosProvider>
    </LogProvider>
  </StrictMode>,
)
