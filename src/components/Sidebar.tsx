import React, { ChangeEvent } from 'react'
import { useStore } from '../store/store'

const Sidebar = () => {

  const {notes, searchTerm, findNote} = useStore();
    
  return (
    <div className='w-[30%] h-screen sticky bottom-0 top-0 bg-white shadow-lg p-[1rem]'>
        <div className='w-full border p-[.5rem] rounded-[.5rem]'>
        <input type="text" name="" id="" placeholder='Search Notes...' onChange={(e: ChangeEvent<HTMLInputElement>) => searchTerm(e.target.value)} className='bg-transparent w-full outline-none'/>
        </div>

        <div className='mt-[1rem] flex flex-col gap-[.5rem]'>
          {notes.length > 0 ? 
          <>
              {notes.map((note) => (
                   <div onClick={() => findNote(note)} className='flex items-center gap-[.5rem] hover:bg-gray-100 cursor-pointer transition-colors p-[.5rem] rounded-[.5rem]'>

                     <div style={{background: note.color}} className='w-[1rem] h-[1rem] shadow-lg border rounded-full' />

                    <div
                   className='text-ellipsis overflow-hidden whitespace-nowrap w-full'
                   key={note.id}
                   dangerouslySetInnerHTML={{ __html: note.content as string }} // Render styled HTML
                 />
                   </div>
              ))}
          </> : 
          <div className='flex items-center justify-center mt-[4rem]'>
             <p className='text-center font-semibold'>Notes are empty.</p>
          </div>}
        </div>
    </div>
  )
}

export default Sidebar