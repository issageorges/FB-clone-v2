import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../config/api";
import { ThumbsUp, MessageSquare, CircleUserRound } from "lucide-react";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axios.get(baseUrl + "/post/" + postId);
        setPost(post.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId]);

  console.log(post);

  return post ? (
    <div>
      <img
        className="w-full h-64 object-contain border p-2 my-4"
        src={baseUrl + "/" + post.image}
      />
      <h1 className="text-3xl font-bold text-center my-2">{post.title}</h1>
      Author: <span className="font-bold">{post.author.name}</span>
      <p className="py-4">{post.content}</p>
      <hr className="mt-10" />
      <div className="flex gap-4 p-2">
        <ThumbsUp />
        <span>{post.likes.length || 0}</span>
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
