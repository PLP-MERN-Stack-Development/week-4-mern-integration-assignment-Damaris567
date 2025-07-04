import React from 'react'
import {IF} from '../../url'

function HomePost({ post }) {
  const hasImage = post.photo && post.photo.trim() !== "";
  const imageUrl = hasImage ? IF + post.photo : "";
  
  console.log("Post data:", post);
  console.log("Has image:", hasImage, "Image URL:", imageUrl);
  
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      {/* Image Section */}
      <div className='h-48 overflow-hidden bg-gray-100'>
        {hasImage ? (
          <img 
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' 
            src={imageUrl} 
            alt={post.title || "Blog post image"}
            onError={(e) => {
              console.log("Image failed to load:", imageUrl)
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full flex items-center justify-center ${hasImage ? 'hidden' : 'flex'}`}
          style={{display: hasImage ? 'none' : 'flex'}}
        >
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">No Image</p>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className='p-4'>
        {/* Title */}
        <h2 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2'>
          {post.title || "Untitled Post"}
        </h2>
        
        {/* Author */}
        <p className='text-sm text-blue-600 font-medium mb-3'>
          By {post.username || "Unknown Author"}
        </p>
        
        {/* Description */}
        <div className='text-gray-700 text-sm leading-relaxed'>
          <p className='line-clamp-3'>
            {post.desc ? post.desc.slice(0, 120) + (post.desc.length > 120 ? "..." : "") : "No description available"}
          </p>
        </div>
        
        {/* Read More Link */}
        <div className='mt-3'>
          <span className='text-blue-600 text-sm font-medium hover:text-blue-800 cursor-pointer'>
            Read More →
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomePost
