import React from 'react'
import { useBlog } from '../providers/BlogProvider'
import BlogCard from './cards/BlogCard';


const Blogs = () => {

    const {blogs} = useBlog();

  return (
    <>
       {blogs.length < 0 ? 
         <div className='grid grid-cols-3 gap-[1rem] mx-[2rem]'>
         {blogs.map((blog) => (
              <div key={blog.id}>
                 <BlogCard blog={blog}/>
              </div>
         ))}
     </div> : 
     <div className='text-center mx-[2rem] flex items-center justify-center'>
         <h1 className='text-[1.5rem] font-bold'>No blogs</h1>
     </div>
       }
    </>
  )
}

export default Blogs