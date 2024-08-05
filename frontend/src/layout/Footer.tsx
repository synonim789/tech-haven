import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

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

  const date = new Date()

  const submit = () => {
    toast.success('Email added to newsletter')
  }

  return (
    <footer className="mt-auto bg-white py-8 dark:bg-[#121212] dark:text-slate-300">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 px-4 lg:flex-row ">
        <div className="flex basis-1/3 flex-col items-center">
          <p className="relative text-center text-3xl font-bold text-[#405684] after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-1 after:w-4/5 after:bg-orange-500 after:content-['']">
            TechHaven
          </p>
          <div className="mt-6 flex flex-col items-center">
            <Link
              to="/products"
              className="block text-2xl font-semibold hover:text-[#405684]"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block text-2xl font-semibold hover:text-[#405684]"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-2xl font-semibold hover:text-[#405684]"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden basis-1/3 flex-col items-center gap-7 lg:flex">
          <p className="relative text-3xl font-bold uppercase text-[#405684] after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-1 after:w-4/5 after:bg-orange-500 after:content-['']">
            Newsletter
          </p>
          <input
            type="text"
            placeholder="Enter Email"
            className="shadow-smt placeholder:#5b5050 rounded-full border-2 border-slate-400 bg-transparent px-5 py-2 text-2xl "
          />
          <button
            className="rounded-full bg-[#405684] px-6 py-3 text-2xl font-semibold text-white transition-opacity hover:opacity-80"
            onClick={submit}
          >
            Subscribe
          </button>
        </div>
        <div className="flex basis-1/3 flex-col items-center gap-8">
          <p className="relative text-2xl font-bold text-[#405684] after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-1 after:w-4/5 after:bg-orange-500 after:content-['']">
            Socials
          </p>
          <div className="flex  gap-3 text-2xl ">
            <a
              href="http://facebook.com"
              target="blank"
              className="transition hover:text-[#405684]"
            >
              <FaFacebook />
            </a>
            <a
              href="http://instagram.com"
              target="blank"
              className="transition hover:text-[#405684]"
            >
              <FaInstagram />
            </a>
            <a
              href="http://tiktok.com"
              target="blank"
              className="transition hover:text-[#405684]"
            >
              <FaTiktok />
            </a>
            <a
              href="http://youtube.com"
              target="blank"
              className="transition hover:text-[#405684]"
            >
              <FaYoutube />
            </a>
            <a
              href="http://twitter.com"
              target="blank"
              className="transition hover:text-[#405684]"
            >
              <FaTwitter />
            </a>
          </div>
          <p className="font-bold">
            © {date.getFullYear()}{' '}
            <span className="text-[#405684]">TechHaven</span> All Rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
