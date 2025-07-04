import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { URL } from '../../url'
import UserContext from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/auth/login", {
        email: email, 
        password: password 
      }, { withCredentials: true });
      setUser(res.data)
      setErr(false)
      navigate("/")
    } catch (error) {
      setErr(true)
      console.log(error)
    }
  }

  return (
    <div className='grid w-[100%] h-screen place-items-center bg-cyan-400'>
      <div className='w-[430px] bg-white p-8 rounded-2xl shadow-lg'>
        {/*Header Title*/}
        <div className='flex justify-center mb-4'>
          <h2 className='text-3xl font-semibold text-center'>Login</h2>
        </div>
        {/*Tab Controls*/}
        <div className='relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden'>
          <button className={`w-1/2 text-lg font-medium transition-all z-10 text-white bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200`}>
            Login
          </button>
          <button onClick={() => navigate('/register')} className={`w-1/2 text-lg font-medium transition-all z-10 text-black`}>
            Sign Up
          </button>
          <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all left-0`}></div>
        </div>
        {/* Form Section */}
        <form className='space-y-4' onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder='Email address' 
            required 
            className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Password' 
            required 
            className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='text-right'>
            <a href="#" className="text-cyan-600 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className='w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition'>
            Login
          </button>
          {err && <h3 className='text-red-500 text-sm text-center'>Something went wrong!</h3>}
          <p className='text-center text-gray-600'>Don't have an account?
            <button type="button" onClick={() => navigate('/register')} className='text-cyan-600 hover:underline ml-1'>SignUp now</button>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Login

