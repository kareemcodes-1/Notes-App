import { createContext, ReactNode, useContext, useState } from "react";

export type Blog = {
    id?: string,
    title: string;
    description: string;
    image: string;
}

type BlogContextType = {
    blogs: Blog[];
    createBlog: (blog: Blog) => void;
    editBlog: (blog: Blog, updatedData: Blog) => void;
    deleteBlog: (blog: Blog) => void;
    loading?: boolean;
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    createBlog() {
        
    },
    editBlog() {
        
    },
    deleteBlog() {
        
    },
});

export const BlogProvider = ({children}: {children: ReactNode}) => {

    const [blogs, setBlogs] = useState<Blog[]>(() => {
        const storedBlogs = localStorage.getItem("blogs");
        return storedBlogs ? JSON.parse(storedBlogs) : [];
      });

    const [loading, setLoading] = useState<boolean>(false);

    const createBlog = (blog: Blog) => {
        setLoading((loading) => loading = true);
        const updatedData = [...blogs, blog];
        setBlogs(updatedData);
        localStorage.setItem('blogs', JSON.stringify(updatedData));
        setTimeout(() => {
            setLoading((loading) => loading = false);
        }, 1000)
    }

    const editBlog = (blog: Blog, updatedData: Blog) => {
        const updatedBlog = blogs.map((b) => {
            if(b.id === blog.id){
                return {
                    ...b,
                    title: updatedData.title,
                    description: updatedData.description,
                    image: updatedData.image,
                }
            }else{
                return b;
            }
        });


        setBlogs(updatedBlog);
        localStorage.setItem('blogs', JSON.stringify(updatedBlog));
    }

    
    const deleteBlog = (blog: Blog) => {
        const updatedData = blogs.filter((b) => b.id !== blog.id);
        setBlogs(updatedData);
        localStorage.setItem('blogs', JSON.stringify(updatedData));
    }

    return (
        <BlogContext.Provider value={{blogs, createBlog, deleteBlog, editBlog, loading}}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlog = () => useContext(BlogContext);