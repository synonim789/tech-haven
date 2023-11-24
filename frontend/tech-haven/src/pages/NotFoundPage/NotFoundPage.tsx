import { Link } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__description">Page Not Found</h2>
      <Link to="/" className="not-found__cta">
        Back To Home
      </Link>
    </main>
  )
}
export default NotFoundPage
