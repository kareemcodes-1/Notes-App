import React, { useState } from 'react'
import CreateBlog from './modals/CreateBlog';

const Hero = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
       {isOpen && <CreateBlog closeModal={() => setIsOpen(false)} />}
      <div className='flex items-center justify-center mx-auto w-full mt-[2rem] mb-[2rem]'>
        <div className='flex items-center gap-[10rem]'>
           <h1 className='text-[2rem] font-bold'>My Blogs</h1>

           <button type="button" className='text-[1rem] bg-[#000] text-white py-[.7rem] px-[1rem] rounded-[.5rem]' onClick={() => setIsOpen(true)}>Create Blog</button>
        </div>
    </div>
    </>
  )
}

export default Hero