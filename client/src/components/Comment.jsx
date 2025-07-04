import React from 'react'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { URL } from '../../url'
import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

function Comment({c}) {
  const { user } = useContext(UserContext)

  const deleteComment = async () => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {withCredentials: true})
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='px-2 py-2 bg-gray-200 w-[90vh] rounded-lg my-2'>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-gray-600'>@{caches.author}</h3>

        <div className='flex justify-center items-center span-x-4'>
          <p>{Date(caches.updatedAt).toString().slice(3, 15)}</p>
          {
            user?._id === c?.userId? <div className='flex items-center justify-center space-x-2'>
              <p className='cursor-pointer' onClick={() => deleteComment(c._id)}><MdDelete/></p>
            </div> : ""
          }
        </div>
      </div>

      <p className='px-4 mt-2'>{c.comment}</p>
    </div>
  )
}

export default Comment
