import { Link, useLocation } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa'
const Footer = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }
  return (
    <footer className="footer">
      <div className="footer__links">
        <p className="footer__title">TechHaven</p>

        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer__newsletter">
        <p className="footer__newsletter-title">Newsletter</p>
        <input
          type="text"
          placeholder="Enter Email"
          className="footer__newsletter-input"
        />
        <button className="footer__newsletter-cta">Subscribe</button>
      </div>
      <div className="footer__socials">
        <p className="footer__socials-title">Socials</p>
        <a href="http://facebook.com" target="blank">
          <FaFacebook />
        </a>
        <a href="http://instagram.com" target="blank">
          <FaInstagram />
        </a>
        <a href="http://tiktok.com" target="blank">
          <FaTiktok />
        </a>
        <a href="http://youtube.com" target="blank">
          <FaYoutube />
        </a>
        <a href="http://twitter.com" target="blank">
          <FaTwitter />
        </a>
      </div>
    </footer>
  )
}
export default Footer
