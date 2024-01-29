import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./user-context";

const PostContext = createContext(null);

export const usePostContext = () => useContext(PostContext);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axios.get(baseUrl + "/post");
        setPosts(post.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  const createPostHandler = async (e) => {
    e.preventDefault();

    // const body = {
    //   title: e.target.title.value,
    //   author: user._id,
    // };

    const body = new FormData();
    body.append("title", e.target.title.value);
    body.append("author", user._id);
    body.append("content", e.target.content.value);
    body.append("post-image", e.target["post-image"].files[0]);

    try {
      const { data: newPost } = await axios.post(
        `${baseUrl}/post/create`,
        body
      );
      console.log(newPost);
      setPosts([...posts, newPost]);
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deletePostHandler = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/post/${id}`);

      alert(res.data.message);

      const newPosts = posts.filter((post) => post._id !== id);

      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const likePostHandler = async (postId) => {
    try {
      const res = await axios.put(`${baseUrl}/post/like/${postId}/${user._id}`);
      console.log("likePostHandler ==> ", res.data);

      const newPosts = posts.map((post) => {
        if (post._id === postId) {
          return res.data;
        } else {
          return post;
        }
      });

      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PostContext.Provider
      value={{
        createPostHandler,
        deletePostHandler,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
