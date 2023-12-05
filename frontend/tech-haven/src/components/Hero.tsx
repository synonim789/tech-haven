import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="min-h-[90vh] bg-hero bg-center bg-no-repeat bg-cover relative flex justify-center items-center">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-16 px-4">
        <h1 className="uppercase font-bold text-white text-6xl text-center relative after:content-[''] after:w-4/5 after:absolute after:h-2 after:bg-orange-500 after:-bottom-4 after:left-0 after:right-0 after:mx-auto">
          Make your life a tech haven
        </h1>
        <Link
          to="/products"
          className="text-[#120b90] bg-white px-12 py-6 font-semibold text-4xl rounded-full hover:scale-110 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  )
}
export default Hero
