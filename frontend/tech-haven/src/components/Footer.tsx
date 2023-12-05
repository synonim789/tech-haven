import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/admin')
  ) {
    return null
  }

  let date = new Date()

  return (
    <footer className="bg-white  py-8 mt-auto">
      <div className="mx-auto max-w-5xl flex justify-between flex-col lg:flex-row gap-10 ">
        <div className="basis-1/3 flex flex-col items-center">
          <p className="text-[#120b90] font-bold text-center relative text-3xl after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto">
            TechHaven
          </p>
          <div className="mt-6 flex flex-col items-center">
            <Link
              to="/products"
              className="block font-semibold text-2xl hover:text-[#120b90]"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block font-semibold text-2xl hover:text-[#120b90]"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block font-semibold text-2xl hover:text-[#120b90]"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden flex-col items-center gap-7 basis-1/3 lg:flex">
          <p className="text-3xl font-bold uppercase text-[#120b90] relative after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto">
            Newsletter
          </p>
          <input
            type="text"
            placeholder="Enter Email"
            className="px-5 py-2 rounded-full shadow-sm bg-[#d9d9d9] text-2xl placeholder:#5b5050 "
          />
          <button className="bg-[#120b90] text-white text-2xl font-semibold rounded-full py-3 px-6 hover:opacity-80 transition-opacity de">
            Subscribe
          </button>
        </div>
        <div className="flex items-center flex-col basis-1/3 gap-8">
          <p className="text-[#120b90] text-2xl font-bold relative after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto">
            Socials
          </p>
          <div className="flex  text-2xl gap-3 ">
            <a
              href="http://facebook.com"
              target="blank"
              className="hover:text-[#120b90] transition"
            >
              <FaFacebook />
            </a>
            <a
              href="http://instagram.com"
              target="blank"
              className="hover:text-[#120b90] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="http://tiktok.com"
              target="blank"
              className="hover:text-[#120b90] transition"
            >
              <FaTiktok />
            </a>
            <a
              href="http://youtube.com"
              target="blank"
              className="hover:text-[#120b90] transition"
            >
              <FaYoutube />
            </a>
            <a
              href="http://twitter.com"
              target="blank"
              className="hover:text-[#120b90] transition"
            >
              <FaTwitter />
            </a>
          </div>
          <p className="font-bold">
            © {date.getFullYear()}{' '}
            <span className="text-[#120b90]">TechHaven</span> All Rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
