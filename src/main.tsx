import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import './index.css'
import FormApp from './form/formapp.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <FormApp />
        </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
);