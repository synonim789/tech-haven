import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }
  return <footer className="footer">Footer</footer>
}
export default Footer
