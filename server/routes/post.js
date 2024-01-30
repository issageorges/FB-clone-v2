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

// CREATE a post  /post/create

route.post("/create", upload.single("post-image"), async (req, res) => {
  const post = req.body;
  post.image = req.file.path;
  const newPost = new Post(post);
  await newPost.save();
  await newPost.populate("author");
  res.json(newPost);
});

// DELETE a post

route.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const findPost = await Post.findById(postId);

  //1. Delete the image from the uploads folder
  fs.unlinkSync(findPost.image);
  //2. Delete the post from the database
  await Post.findByIdAndDelete(postId).populate("author");
  res.json({ message: "Post deleted successfully!" });
});

// CREATE a comment on a post  /post/comment/:postId

route.post("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, author } = req.body;

    const post = await Post.findById(postId);
    post.comments.push({ text, author });

    await post.save();
    await post.populate("author");

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a post by id

route.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("author");
  res.json(post);
});

export default route;