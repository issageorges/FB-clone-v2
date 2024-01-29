import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs";

import Post from "../models/Post.js";

const route = express.Router();

// 1-  GET posts

route.get("/", async (req, res) => {
  const posts = await Post.find().populate("author")
  res.json(posts);
});

// 2- CREATE a post  /post/create

route.post("/create", upload.single("post-image"), async (req, res) => {
  const post = req.body;
  post.image = req.file.path;
  const newPost = new Post(post);
  await newPost.save();
  await newPost.populate("author");
  res.json(newPost);
});

// 3- DELETE a post

route.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const findPost = await Post.findById(postId);

  //1. Delete the image from the uploads folder
  fs.unlinkSync(findPost.image);
  //2. Delete the post from the database
  await Post.findByIdAndDelete(postId).populate("author");
  res.json({ message: "Post deleted successfully!" });
});

// 4- UPDATE a post  /post/like/:blogId/:authorId

// route.put("/like/:postId/:authorId", async (req, res) => {
//   const { postId, authorId } = req.params;
//   const post = await Post.findById(postId).populate("author");

//   const isLiked = post.likes.includes(authorId);

//   if (isLiked) {
//     post.likes = post.likes.filter((id) => id.toString() !== authorId);
//   } else {
//     post.likes.push(authorId);
//   }

//   await post.save();
  

//   res.json(post);
// });

// 5- GET a post by id

route.get("/:postId", async (req, res) => {
  const postId = req.params.blogId;
  const post = await Post.findById(postId).populate("author");
  res.json(post);
});

export default route;