import React from 'react';
import { useUserContext } from "../context/user-context";
import { useBlogContext } from "../context/blog-context";
import { Link } from "react-router-dom";
import { ThumbsUp, Trash2 } from "lucide-react";
import { baseUrl } from "../config/api";
import {  CircleUserRoundIcon} from "lucide-react";
export default function Home() {
  const { user } = useUserContext();
  const { blogs, deleteBlogHandler } = useBlogContext();

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed</h1>
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-full">
          <div className="flex-shrink-0">
          <CircleUserRoundIcon/>          </div>
          <Link
            to="/create-blog"
            className="flex-1 pl-4 text-sm font-medium text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            What's on your mind?
          </Link>
        </div>
        {user && <div className="text-xl font-semibold text-gray-900 mb-4">Welcome {user.name}</div>}

        <ul>
          {blogs.map((blog) => (
            <li className="bg-white p-4 rounded-lg shadow mb-4" key={blog?._id}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{blog?.title}</h2>
                  <p className="text-gray-700">user: {blog?.author?.name}</p>
                  <p className="text-gray-700 mb-4">caption: {blog?.content}</p>
                </div>
                {user && user?._id === blog?.author?._id && (
                  <button
                    onClick={() => deleteBlogHandler(blog?._id)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              {blog.image && (
                <img
                  className="max-w-full h-auto rounded-lg mx-auto"
                  src={baseUrl + "/" + blog.image}
                  alt="Blog"
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
      className="w-full p-2 text-sm border rounded-md  resize-none"
      placeholder="Write a comment..."
        rows="1"
      ></textarea>
    <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600">
        Comment
      </button>
    </div>
  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

