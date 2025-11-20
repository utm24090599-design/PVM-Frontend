// src/App.tsx
import React from 'react';
// ➡️ Importa tu página de prueba
import StockTestPage from './pages/StockTestPage'; 
import AppRouter from './routes/AppRoutes';

function App() {
  // ➡️ Temporalmente, renderiza SOLO tu página de prueba.
  // Esto salta el router, la protección y el login.
  return (
    <AppRouter />
  );
}

export default App;

// Si tu App.tsx contenía el router antes:
/*
import AppRouter from './routes/AppRouter';
function App() {
  return (
    <AppRouter />
  );
}
export default App;
*/
