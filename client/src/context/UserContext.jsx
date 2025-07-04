import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../../url'

const UserContext = createContext()

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const res = await axios.get(URL + '/api/auth/refetch', { withCredentials: true })
      setUser(res.data)
    } catch (error) {
      // Don't log 401 errors as they are expected when no user is logged in
      if (error.response?.status !== 401) {
        console.log(error)
      }
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

