import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from './catalogue/ProductCard.tsx'
import GridCatalogue from './catalogue/ProductGrid.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
);