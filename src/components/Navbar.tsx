import Link from "next/link"

function Navbar() {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link href="/" className="flex cursor-pointer title-font font-medium items-center text-white mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">Fake Shopping</span>
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base cursor-pointer justify-center">
        <a className="mr-5 hover:text-white">Home</a>
        <a className="mr-5 hover:text-white">Second Link</a>
        <a className="mr-5 hover:text-white">Third Link</a>
        <a className="mr-5 hover:text-white">Fourth Link</a>
      </nav>

      <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Login
      
    </button> <button className="ml-2 inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Sign up
      
      </button>
    </div>
  </header>
  )
}

export default Navbar