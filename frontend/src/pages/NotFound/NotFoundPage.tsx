import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center flex-col min-h-[80vh]">
      <h2 className="text-red-500 text-9xl">404</h2>
      <h2 className="text-4xl">Page Not Found</h2>
      <Link
        to="/"
        className="bg-[#405684] text-white px-4 py-2 rounded-lg shadow-lg text-2xl font-bold mt-5"
      >
        Back To Home
      </Link>
    </main>
  )
}
export default NotFoundPage
