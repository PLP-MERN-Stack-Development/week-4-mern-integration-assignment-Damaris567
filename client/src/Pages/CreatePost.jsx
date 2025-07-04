import React from 'react'
import Footer from "../components/Footer"
import { ImCross } from 'react-icons/im'
import { useState, useContext } from 'react'
import UserContext from "../context/UserContext"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../url'

function CreatePost() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState("")
  const [cat, setCat] = useState("a")
  const [cats, setCats] = useState([])
  const [errors, setErrors] = useState({})
  const { user } = useContext(UserContext)
  
  const navigate = useNavigate()

  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCats(updatedCats)
  }

  const deleteCategory = (index) => {
    let updatedCats = [...cats]
    updatedCats.splice(index, 1)
    setCats(updatedCats)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!desc.trim()) {
      newErrors.desc = "Description is required"
    }
    
    if (cats.length === 0) {
      newErrors.categories = "At least one category is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const post = {
      title: title.trim(), 
      desc: desc.trim(),
      username: user.username,
      userId: user._id,
      categories: cats,
      photo: "" // Default empty photo
    }

    // Upload image first if file is selected
    if(file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data)
        if (imgUpload.status === 200) {
          post.photo = filename
        }
      } catch (error) {
        alert("Failed to upload image. Please try again.")
        return // Don't create post if image upload fails
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {withCredentials: true})
      navigate("/posts/post/" + res.data._id)
    } catch (error) {
      alert("Failed to create post. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col justify-center items-center py-8">
      <div className='w-full max-w-xl bg-white rounded-2xl shadow-lg p-8'>
        <h1 className='font-bold text-2xl mb-6 text-center text-cyan-700'>Create a Post</h1>
        <form className='flex flex-col space-y-6' onSubmit={handleCreate}>
          <div>
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              type="text" 
              placeholder='Enter post title *' 
              className={`w-full px-4 py-3 outline-none border rounded-full focus:border-cyan-500 placeholder-gray-400 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              value={title}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <input 
              onChange={(e) => setFile(e.target.files[0])} 
              type="file" 
              accept="image/*"
              placeholder='Upload image' 
              className='w-full px-4 py-3 border border-gray-300 rounded-full bg-gray-50'
            />
            <p className="text-gray-600 text-sm mt-1">Upload an image for your blog post (optional)</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4'>
              <select 
                name="" 
                id="" 
                value={cat} 
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-full focus:border-cyan-500 bg-gray-50"
              >
                <option value="">Select a category</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Big Data">Big Data</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Business Management">Business Management</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Database">Database</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="DevOps">DevOps</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <button type="button" onClick={addCategory} className='px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white font-semibold hover:opacity-90 transition'>
                Add Category
              </button>
            </div>
            <div className='flex flex-wrap mt-3 gap-2'>
              {cats?.map((c, i) => (
                <div key={i} className='flex items-center space-x-2 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm'>
                  <span>{c}</span>
                  <span onClick={() => deleteCategory(i)} className='text-cyan-700 hover:text-red-500 cursor-pointer'><ImCross/></span>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
            <div className="mt-4">
              <textarea 
                onChange={(e) => setDesc(e.target.value)} 
                rows={7} 
                className={`w-full px-4 py-3 outline-none font-semibold border rounded-2xl focus:border-cyan-500 placeholder-gray-400 ${errors.desc ? 'border-red-500' : 'border-gray-300'}`}
                placeholder='Enter post description *'
                value={desc}
              />
              {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
            </div>
            <button 
              type="submit"
              className='w-full py-3 mt-4 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white font-semibold text-lg rounded-full hover:opacity-90 transition'>
              Create Post
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default CreatePost
