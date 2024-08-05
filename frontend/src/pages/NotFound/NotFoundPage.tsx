import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      <h2 className="text-9xl text-red-500">404</h2>
      <h2 className="text-4xl">Page Not Found</h2>
      <Link
        to="/"
        className="mt-5 rounded-lg bg-[#405684] px-4 py-2 text-2xl font-bold text-white shadow-lg"
      >
        Back To Home
      </Link>
    </main>
  )
}
export default NotFoundPage
