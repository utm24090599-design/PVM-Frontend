import './App.css'
import AppRouter from './routes/AppRoutes'
import { FeedbackProvider } from './providers/FeedbackProvider'
import { CartProvider } from './components/CartContext'


function App() {
  return (
    <>
    <CartProvider>
      <FeedbackProvider>
        <AppRouter />
      </FeedbackProvider>
    </CartProvider>
    </>
  )
}

export default App;