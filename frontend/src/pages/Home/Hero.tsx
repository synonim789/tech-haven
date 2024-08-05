import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Phone from '../../assets/rsz_iphone.png'

const Hero = () => {
  return (
    <section className="mx-auto mt-5 grid max-w-screen-xl gap-5 px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
      <motion.div
        className="mb-5 mr-auto w-full place-self-center text-center md:lg:text-left lg:col-span-6 lg:mb-0"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
      >
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
          Make your life a Tech Haven
        </h1>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-[#405684] px-5 py-3 text-center text-2xl font-bold text-white transition hover:scale-105"
        >
          Shop Now
        </Link>
      </motion.div>
      <div className="mx-auto lg:col-span-6 lg:ml-auto lg:block">
        <img
          src={Phone}
          className="mx-auto w-3/4 animate-movingY lg:mx-0 lg:w-full"
        />
      </div>
    </section>
  )
}
export default Hero
