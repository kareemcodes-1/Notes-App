import React, {FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Blog, useBlog } from '../../providers/BlogProvider';


type FormData = {
    title: string;
    description: string;
    image: string;
}

interface EditBlogProps {
    closeModal: () => void;
    blog: Blog;
}

const EditBlog: FC<EditBlogProps> = ({closeModal, blog}) => {

    const {register, handleSubmit, formState: {isSubmitting, errors}} = useForm<FormData>({
        defaultValues: {
            title: blog.title,
            description: blog.description,
            image: blog.image,
          },
    });
    const {editBlog} = useBlog();

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        const updatedData = {
            title: data.title,
            description: data.description,
            image: data.image
        }
        editBlog(blog, updatedData);
        closeModal();
    }

  return (
    createPortal(
        <div className='fixed w-full h-screen top-0 left-0 right-0'> 
            <div className='bg-[#0000004f] fixed top-0 w-full h-screen' onClick={closeModal}/>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center mx-auto gap-[1rem] mt-[10rem]'>
            <div className='bg-[#fff] z-[1000] p-[1rem] w-[50%] rounded-[1rem] flex items-start flex-col gap-[1rem] '>
                <h1 className='text-[1.5rem] font-bold'>Edit Blog</h1>
                <div className='w-full'>
                <input  type="text" {...register("title", {required: 'Title is required'})} className='w-full h-full bg-transparent outline-none border p-[.5rem] rounded-[1rem]' placeholder='Enter title'  id="" />
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>


               <div className='w-full'>
               <input type="text" {...register("description", {required: 'Description is required'})} className='w-full h-full bg-transparent outline-none border p-[.5rem] rounded-[1rem]' placeholder='Enter Description'  id="" />
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
               </div>

               <div className='w-full'>
               <input type="text"  {...register("image", {required: 'ImageUrl is required'})} className='w-full h-full bg-transparent outline-none border p-[.5rem] rounded-[1rem]' placeholder='Enter Image URL'  id="" />
                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
               </div>

               <button className='border z-[1000] shadow-md bg-[#fff] w-[5rem] rounded-[1rem] py-[.7rem] px-[1rem] gap-[1rem]' type='submit'>{isSubmitting ? 'Loading...' : 'Save'}</button>
            </div>
            </form>
        </div>
    , document.body)
  )
}

export default EditBlog;