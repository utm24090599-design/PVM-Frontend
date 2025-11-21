import { useFeedbackContext } from '../contexts/FeedbackProvider'

export default function useFeedback() {
  const { showToast, showConfirm } = useFeedbackContext()
  return { showToast, showConfirm }
}