import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./user-context";

const PostContext = createContext(null);

export const usePostContext = () => useContext(PostContext);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/post`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const createPostHandler = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", e.target.title.value);
    body.append("author", user._id);
    body.append("content", e.target.content.value);
    body.append("post-image", e.target["post-image"].files[0]);
  
    try {
      const { data: newPost } = await axios.post(`${baseUrl}/post/create`, body);
  
      // Ensure that the 'comments' property is initialized as an empty array
      newPost.comments = [];
  
      setPosts((prevPosts) => [...prevPosts, newPost]);
      e.target.reset();
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  const deletePostHandler = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/post/${id}`);
      alert(response.data.message);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const likePostHandler = async (postId) => {
    try {
      const response = await axios.put(`${baseUrl}/post/like/${postId}/${user._id}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const addCommentHandler = async (postId, commentText) => {
    try {
      const response = await axios.post(
        `${baseUrl}/comment/${postId}/${user._id}`,
        { comment: commentText }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
      setCommentTexts({
        ...commentTexts,
        [postId]: "", // Reset the comment text for the specific post
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const postContextValue = {
    createPostHandler,
    deletePostHandler,
    likePostHandler,
    addCommentHandler,
    posts,
  };

  return (
    <PostContext.Provider value={postContextValue}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;


