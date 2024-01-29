import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./user-context";

const BlogContext = createContext(null);

export const useBlogContext = () => useContext(BlogContext);

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await axios.get(baseUrl + "/blog");
        setBlogs(blog.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlog();
  }, []);

 

  
  const createBlogHandler = async (e) => {
    e.preventDefault();

    // const body = {
    //   title: e.target.title.value,
    //   author: user._id,
    // };

    const body = new FormData();
    body.append("title", e.target.title.value);
    body.append("author", user._id);
    body.append("content", e.target.content.value);
    body.append("blog-image", e.target["blog-image"].files[0]);

    try {
      const { data: newBlog } = await axios.post(
        `${baseUrl}/blog/create`,
        body
      );
      console.log(newBlog);
      setBlogs([...blogs, newBlog]);
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlogHandler = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/blog/${id}`);

      alert(res.data.message);

      const newBlogs = blogs.filter((blog) => blog._id !== id);

      setBlogs(newBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const likeBlogHandler = async (blogId) => {
    try {
      const res = await axios.put(`${baseUrl}/blog/like/${blogId}/${user._id}`);
      console.log("likeBlogHandler ==> ", res.data);

      const newBlogs = blogs.map((blog) => {
        if (blog._id === blogId) {
          return res.data;
        } else {
          return blog;
        }
      });

      setBlogs(newBlogs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BlogContext.Provider
      value={{
        createBlogHandler,
        deleteBlogHandler,
        blogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
