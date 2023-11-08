import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import './Footer.css'
const Footer = () => {
  const location = useLocation()

  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password'
  ) {
    return null
  }

  let date = new Date()

  return (
    <footer className="footer">
      <div className="footer__links">
        <p className="footer__links-title">TechHaven</p>
        <div className="footer__links-links">
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
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
        <div className="footer__socials-links">
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
        <p className="footer__socials-copyright">
          © {date.getFullYear()} <span>TechHaven</span> All Rights reserved
        </p>
      </div>
    </footer>
  )
}
export default Footer
