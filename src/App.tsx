import './App.css'
import AppRouter from './routes/AppRoutes'
import { FeedbackProvider } from './contexts/FeedbackProvider'

function App() {
  
  return (
    <>
      <FeedbackProvider>
        <AppRouter />
      </FeedbackProvider>
    </>
  )
}

export default App
