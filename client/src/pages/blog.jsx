import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config/api";
import { ThumbsUp, MessageSquare, CircleUserRound } from "lucide-react";

export default function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await axios.get(baseUrl + "/blog/" + blogId);
        setBlog(blog.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlog();
  }, [blogId]);

  console.log(blog);

  return blog ? (
    <div>
      <img
        className="w-full h-64 object-contain border p-2 my-4"
        src={baseUrl + "/" + blog.image}
      />
      <h1 className="text-3xl font-bold text-center my-2">{blog.title}</h1>
      Author: <span className="font-bold">{blog.author.name}</span>
      <p className="py-4">{blog.content}</p>
      <hr className="mt-10" />
      <div className="flex gap-4 p-2">
        <ThumbsUp />
        <span>{blog.likes.length || 0}</span>
        <MessageSquare />
        <span>{0}</span>
      </div>
      <form className="flex flex-col gap-2 p-2">
        <textarea className="w-full h-32 border my-2" />
        <button className="border p-2 w-32">Comment</button>
      </form>
      <div>
        <h3 className="text-lg text-center ">Comments</h3>
        <hr className="my-4" />
        <ul className="flex flex-col gap-4 py-4">
          <li className="flex flex-col gap-2">
            <div className="flex gap-2">
              <CircleUserRound />
              <p className="font-bold">Ghassan</p>

              <p className=" opacity-50">12:30</p>
              <p className=" opacity-50 font-thin text-sm flex items-center">
                1.2.2024
              </p>
            </div>
            <p className="pl-8">Good job!</p>
          </li>

          <li className="flex flex-col gap-2">
            <div className="flex gap-2">
              <CircleUserRound />
              <p className="font-bold">Issa</p>
              <p className=" opacity-50 ">14:30</p>
              <p className=" opacity-50 font-thin text-sm flex items-center">
                1.5.2024
              </p>
            </div>
            <p className="pl-8">Please update the blog!</p>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
