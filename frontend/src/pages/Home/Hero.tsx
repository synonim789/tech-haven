import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Phone from '../../assets/rsz_iphone.png'

const Hero = () => {
  return (
    <section className="grid max-w-screen-xl py-8 mt-5 px-4 mx-auto gap-5 lg:gap-8 lg:py-16 lg:grid-cols-12">
      <motion.div
        className="mr-auto place-self-center text-left lg:col-span-6 w-full mb-5 lg:mb-0"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Make your life a Tech Haven
        </h1>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-5 py-3 font-bold text-center text-2xl text-white rounded-full bg-[#405684] hover:scale-105 transition"
        >
          Shop Now
        </Link>
      </motion.div>
      <div className="lg:col-span-6 mx-auto lg:ml-auto lg:block">
        <img
          src={Phone}
          className="w-3/4 mx-auto lg:w-full lg:mx-0 animate-movingY"
        />
      </div>
    </section>
  )
}
export default Hero
