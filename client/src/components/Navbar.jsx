import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { FaBars } from 'react-icons/fa'
import Menu from './Menu'
import UserContext from "../context/UserContext"

function Navbar() {
  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname
  const { user } = useContext(UserContext)

  const showMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav className="w-full bg-white shadow-md rounded-b-2xl px-4 md:px-[200px] py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Brand */}
      <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 bg-clip-text text-transparent tracking-tight">
        NeBlog
      </Link>

      {/* Search Bar (only on home) */}
      {path === "/" && (
        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner mx-2 w-56 md:w-80">
          <input
            className="flex-1 bg-transparent outline-none px-3 py-1 text-gray-700 placeholder-gray-400 rounded-full"
            placeholder="Search"
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && navigate(prompt ? `?search${prompt}` : "/")}
          />
          <button
            onClick={() => navigate(prompt ? `?search${prompt}` : "/")}
            className="p-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white hover:opacity-90 transition"
          >
            <BsSearch />
          </button>
        </div>
      )}

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-2 md:space-x-4">
        {user ? (
          <Link
            to="/write"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            Create Post
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>
        )}
        {user ? (
          <div onClick={showMenu} className="relative cursor-pointer">
            <FaBars className="text-2xl text-gray-700" />
            {menu && <Menu />}
          </div>
        ) : (
          <Link
            to="/register"
            className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-700 font-semibold hover:bg-cyan-50 transition"
          >
            Register
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div onClick={showMenu} className="md:hidden text-2xl text-cyan-700 cursor-pointer relative">
        <FaBars />
        {menu && <div className="absolute right-0 mt-2"><Menu /></div>}
      </div>
    </nav>
  )
}

export default Navbar
