import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { URL, IF } from '../../url'
import { useState, useEffect, useContext } from 'react'
import Loader from '../components/Loader'
import { FcManager } from 'react-icons/fc'
import UserContext from '../context/UserContext'

function PostDetails() {
  const PostId = useParams().id
  const [post, setPost] = useState({})
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const fetchPost = async () => {
    try {
      const res = await axios.get( URL + "/api/posts/" + PostId)
      setPost(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete("/api/posts/" + PostId, { withCredentials: true })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    fetchPost()
  }, [PostId])

  const fetchPostComments = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/comments/post/" + PostId)
      setComments(res.data)
      setLoader(false)
    } catch (error) {
      setLoader(true)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPostComments()
  }, [PostId])

  const postComment = async (e) => {
    e.preventDefault()
    try {
      await axios.post(URL + "/api/comments/create/", {
        comment:comment, author: user.username, postId: PostId, userId: user._id},
      { withCredentials:true })
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  // Fallbacks
  const hasImage = post.photo && post.photo.trim() !== "";
  const imageUrl = hasImage ? IF + post.photo : "";
  const author = post.username || "Unknown Author";
  const title = post.title || "Untitled Post";
  const desc = post.desc || "No description available";

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center py-8">
      {loader ? (
        <div className='h-[80vh] flex justify-center items-center w-full'>
          <Loader/>
        </div>
      ) : (
        <div className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-8'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6'>
            <h1 className='text-3xl font-bold text-cyan-700'>{title}</h1>
            <div className='flex flex-col md:items-end mt-2 md:mt-0'>
              <span className='text-sm text-cyan-600 font-semibold'>By {author}</span>
              {user?._id === post?.userId && (
                <button onClick={handleDeletePost} className='mt-2 flex items-center text-red-500 hover:text-red-700 font-semibold text-sm'>
                  <MdDelete className='mr-1'/> Delete Post
                </button>
              )}
            </div>
          </div>
          <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center'>
              {hasImage ? (
                <img src={imageUrl} className='object-cover h-[45vh] mx-auto mt-4 rounded-2xl shadow' alt={title} onError={e => {e.target.style.display='none'}} />
              ) : (
                <div className='h-[45vh] w-full flex items-center justify-center bg-gray-100 mt-4 rounded-2xl shadow'>
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">No Image</p>
                  </div>
                </div>
              )}
            </div>
            <p className='mx-auto mt-8 w-full border p-5 shadow bg-cyan-50 rounded-2xl text-gray-700'>{desc}</p>
            <div className='flex justify-center items-center mt-8 space-x-4 font-semibold'>
              <p className='text-cyan-700'>Categories: </p>
              <div className='flex justify-center items-center space-x-2 flex-wrap'>
                {post.categories && post.categories.length > 0 ? (
                  post.categories.map((c, i) => (
                    <div key={i} className='bg-cyan-100 text-cyan-700 rounded-full px-3 py-1 mb-2'>{c}</div>
                  ))
                ) : (
                  <span className='text-gray-400'>No categories</span>
                )}
              </div>
            </div>
            <div className='flex justify-center items-center p-3 flex-col mt-4'>
              <h3 className='flex justify-center items-center mt-8 space-x-4 font-semibold text-cyan-700'>Comments</h3>
              {comments?.map((c) => (
                <Comment className='' key={c._id} c={c} post={post}/>
              ))}
              <div className='flex justify-center flex-col mt-4 md:flex-row w-full'>
                <input onChange={(e) => setComment(e.target.value)} type='text' placeholder='Write your comment' className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border rounded-full focus:border-cyan-500 placeholder-gray-400' />
                <button onClick={postComment} className='bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white text-base font-semibold px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded-full hover:opacity-90 transition tracking-wide shadow whitespace-nowrap'>Post </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default PostDetails
