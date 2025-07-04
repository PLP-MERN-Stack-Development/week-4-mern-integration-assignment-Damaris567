import React from 'react'
import axios from 'axios'
import HomePost from '../Pages/HomePost'
import Footer from '../components/Footer'
import { URL } from '../../url'
import { useEffect, useState, useContext } from 'react'
import { Link, useAsyncError, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import  UserContext  from '../context/UserContext'


function Home() {

  const {search} = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  const [cat, setCat] = useState([])
  const [filterData, setFilterData] = useState([])
  
  
  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + '/api/posts/' + search)
      setPosts(res.data)
      setFilterData(res.data)
      let cata = res.data.map((item) => {return item.categories})
      let sets = new Set()
      cata.forEach((category) => {
        category?.forEach((catas) => {
          if(cata.length > 0) sets.add(catas)
        })
        
      })
      setCat(Array.from(sets))
      console.log(res.data)

      if(res.data.length === 0) {
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      
      setLoader(false)

    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  const FilterData = (category) => {
    let newpost = posts.filter((pos) => {
      return pos?.categories.includes(category)
    })
    setFilterData(newpost)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className='flex flex-wrap'>
          <div className='p-3 m-5 flex flex-wrap justify-center'>
            {
              cat.length && cat?.map((categories) =>{
                return <button key={categories} className='p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black' onClick={() => FilterData(categories)}>
                  {categories}
                </button>
              })
            }
          </div>
        </div>

        <div className='flex flex-wrap w-[95%] justify-center'>
          {
            loader ? <div className='h-screen flex justify-center items-center'>
              <Loader />
            </div> : !noResults ? filterData.map((post) => (
              <div key={post._id} className='flex flex-wrap m-2 sm:w-[35vw] lg:w-[45vw] md:w-[50vw]'>
                <Link to={user ? `/posts/post/${post._id}`: "/login"} >
                  <HomePost key={post._id} post={post}/>
                </Link>
              </div>
            )) : <h3 className='text-center font-bold mt-16'>No Posts available</h3>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;