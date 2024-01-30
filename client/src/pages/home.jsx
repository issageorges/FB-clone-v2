import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user-context";
import { usePostContext } from "../context/post-context";
import { CircleUserRoundIcon } from "lucide-react";

import Post from "../components/post";
import UserWelcome from "../components/userWelcome";

export default function Home() {
  const { user, fetchUser } = useUserContext();
  const { posts, deletePostHandler, addCommentHandler } = usePostContext();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed</h1>

        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-full mb-6">
          <div className="flex-shrink-0">
            <CircleUserRoundIcon />
          </div>
          <Link
            to="/create-post"
            className="flex-1 pl-4 text-sm font-medium text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            What's on your mind?
          </Link>
        </div>

        {user && <UserWelcome user={user} />}

        <ul>
          {posts.map((post) => (
            <Post
              key={post?._id}
              post={post}
              user={user}
              deletePostHandler={deletePostHandler}
              addCommentHandler={addCommentHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}



