import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Routes>
        <Route path="/login" element={<div />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/test" element={<div />} />
      </Routes>
  </StrictMode>,
)

