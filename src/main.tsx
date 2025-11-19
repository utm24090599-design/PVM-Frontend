import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from './catalogue/ProductCard.tsx'
import GridCatalogue from './catalogue/ProductGrid.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
// deje el gridcatalogue en el main como prueba de mientras
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <GridCatalogue/>
        </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
);