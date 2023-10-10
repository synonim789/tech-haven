import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__left">
        <h1 className="hero__title">Make your life a tech haven</h1>
        <Link to="/products" className="hero__cta">
          Shop Now
        </Link>
      </div>
    </section>
  )
}
export default Hero
