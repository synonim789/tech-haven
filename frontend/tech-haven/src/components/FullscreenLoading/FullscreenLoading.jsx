import { createPortal } from 'react-dom'
import './FullscreenLoading.css'

const FullscreenLoading = () => {
  return createPortal(
    <>
      <div className="loading__background"></div>
      <div className="loading__spinner"></div>
      <p className="loading__text">Loading...</p>
    </>,
    document.getElementById('portal')
  )
}
export default FullscreenLoading
