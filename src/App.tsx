import './App.css'
import AppRouter from './routes/AppRoutes'
import { FeedbackProvider } from './providers/FeedbackProvider'
import { CartProvider } from './Components/CartContext'


function App() {
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App;