import { useUserContext } from "../context/user-context";
import { usePostContext } from "../context/post-context";
import { Link } from "react-router-dom";
import { ThumbsUp, Trash2 } from "lucide-react";
import { baseUrl } from "../config/api";
import {  CircleUserRoundIcon} from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { user, fetchUser } = useUserContext();
  const { posts, deletePostHandler } = usePostContext();

  useEffect(() => {
    // Fetch user information when the component mounts
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed</h1>

        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-full">
          <div className="flex-shrink-0">
          <CircleUserRoundIcon/>          
          </div>
          <Link
            to="/create-post"
            className="flex-1 pl-4 text-sm font-medium text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            What's on your mind?
          </Link>
        </div>

        <div className="fixed left-0 top-20 p-4 bg-white shadow">
          {user && (
            <>
              <CircleUserRoundIcon size={40} />
              <p className="text-sm font-medium text-gray-500 mt-2"> Welcome {user.name}!</p>
            </>
          )}
        </div>

        <ul>
          {posts.map((post) => (
            <li className="bg-white p-4 rounded-lg shadow mb-4" key={post?._id}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{post?.title}</h2>
                  <p className="text-gray-700">user: {post?.author?.name}</p>
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

