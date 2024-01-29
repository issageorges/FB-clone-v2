import { useUserContext } from "../context/user-context";
import { useBlogContext } from "../context/blog-context";

import { ThumbsUp, Trash2 } from "lucide-react";
import { baseUrl } from "../config/api";

export default function Home() {
  const { user } = useUserContext();
  const { blogs, deleteBlogHandler } = useBlogContext();

  console.log("blogs ==> ", blogs);

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Blogs</h1>
      {user && <div className="text-xl font-semibold">Welcome {user.name}</div>}

      <ul className="">
        {blogs.map((blog) => (
          <li className=" border p-4 mb-4" key={blog?._id}>
            <h2 className="mb-4 text-xl font-bold">{blog?.title}</h2>
            <p className="py-2">Author: {blog?.author?.name}</p>
            <p className="py-2">caption: {blog?.content}</p>
            <img
        className="w-full h-64 object-contain border p-2 my-4"
        src={baseUrl + "/" + blog.image}
      />
            
            <div className="flex gap-4">
              {user ? (
                <>
                  <div className="flex justify-center items-center gap-2">
                    <ThumbsUp
                     
                      className={`cursor-pointer`}
                    />
                    <span>0</span>
                  </div>

                  {user?._id === blog?.author?._id && (
                    <button
                      className="border p-1"
                      onClick={() => deleteBlogHandler(blog?._id)}
                    >
                      <Trash2 />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <ThumbsUp />
                  <span>0</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
