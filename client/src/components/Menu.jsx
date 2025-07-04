import React from 'react'
import UserContext  from "../context/UserContext";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { URL } from '../../url'

function Menu() {

    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await axios.get(URL + "/api/auth/logout", {withCredentials: true})
            setUser(null)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='bg-white shadow-lg w-56 z-20 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-2xl p-4 space-y-2 border border-cyan-100'>
        {
            !user && <Link to="/login" className='w-full px-3 py-2 rounded-lg text-cyan-700 font-semibold hover:bg-cyan-50 transition'>Login</Link>
        }
        {
            !user && <Link to="/register" className='w-full px-3 py-2 rounded-lg text-cyan-700 font-semibold hover:bg-cyan-50 transition'>Register</Link>
        }
        {
            user && <Link to={`/profile/${user._id}`} className='w-full px-3 py-2 rounded-lg text-cyan-700 font-semibold hover:bg-cyan-50 transition'>Profile</Link>
        }
        {
            user && <Link to={`/write/${user._id}`} className='w-full px-3 py-2 rounded-lg text-cyan-700 font-semibold hover:bg-cyan-50 transition'>Write</Link>
        }
        {
            user && <Link to={`/myblogs/${user._id}`} className='w-full px-3 py-2 rounded-lg text-cyan-700 font-semibold hover:bg-cyan-50 transition'>MyBlogs</Link>
        }
        {
            user && <button onClick={handleLogout} className='w-full px-3 py-2 rounded-lg text-red-500 font-semibold hover:bg-red-50 transition text-left'>Logout</button>
        }
    </div>
  )
}

export default Menu
