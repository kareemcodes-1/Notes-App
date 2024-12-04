import React, { FC, useState } from "react";
import { Blog, useBlog } from "../../providers/BlogProvider";
import EditBlog from "../modals/EditBlog";
import { BiEdit, BiTrash } from "react-icons/bi";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const { deleteBlog, loading } = useBlog();

  const [openEditModal, setIsOpenEditModal] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <div className="flex w-96 h-[25rem] flex-col gap-4">
          <div className="skeleton h-[15rem] w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <>
          {openEditModal && (
            <EditBlog
              blog={blog}
              closeModal={() => setIsOpenEditModal(false)}
            />
          )}
          <div className="card bg-base-100 w-96 h-[25rem] shadow-xl">
            <figure>
              <img src={blog.image} alt={blog.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.description}</p>
              <div className="card-actions justify-end">
                <button
                  className="bg-[#fff] shadow-lg p-[.9rem] rounded-[.5rem]"
                  onClick={() => setIsOpenEditModal(true)}
                >
                  <BiEdit size={20}/>
                </button>
                <button
                  className="bg-rose-500  shadow-lg p-[.9rem] rounded-[.5rem]"
                  onClick={() => deleteBlog(blog)}
                >
                    <BiTrash size={20} className="text-white"/>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogCard;
