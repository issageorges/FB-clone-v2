import { useState } from "react";
import { ThumbsUp, Trash2 } from "lucide-react";
import { baseUrl } from "../config/api";
import UserImg from "./userImg";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Post = ({ post, user, deletePostHandler, addCommentHandler }) => {
  const [commentText, setCommentText] = useState("");

  console.log('Comments:', post.comments);


  return (
    <li className="bg-white p-4 rounded-lg shadow mb-4" key={post?._id}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{post?.title}</h2>
          <p className="text-gray-700 font-bold flex gap-2 items-center">
            <UserImg /> {capitalizeFirstLetter(post.author.name)}
          </p>
          <p className="text-gray-700 mb-4">{post?.content}</p>
        </div>
        {user && user?._id === post?.author?._id && (
          <button
            onClick={() => deletePostHandler(post?._id)}
            className="text-gray-700 hover:text-gray-900"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      {post.image && (
        <img
          className="max-w-full h-auto rounded-lg mx-auto"
          src={baseUrl + "/" + post.image}
          alt="Post"
        />
      )}
      <div className="flex items-center mt-20 justify-start mt-2 space-x-4">
        <button className="flex items-center justify-center gap-1 text-gray-700 hover:text-blue-600">
          <ThumbsUp size={20} />
          <span>Like</span>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-1">
            <textarea
              className="w-full p-2 text-sm border rounded-md resize-none"
              placeholder="Write a comment..."
              rows="1"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              onClick={() => addCommentHandler(post._id, commentText)}
              className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Post;
