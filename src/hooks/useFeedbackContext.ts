import { useContext } from 'react'
import { FeedbackContext } from '../contexts/feedbackContext'

export const useFeedbackContext = () => {
  const ctx = useContext(FeedbackContext)
  if (!ctx) throw new Error('useFeedbackContext must be used within FeedbackProvider')
  return ctx
}