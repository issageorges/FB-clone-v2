import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs";

import Blog from "../models/Blog.js";

const route = express.Router();

// 1-  GET a blogs

route.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("author")
  res.json(blogs);
});

// 2- CREATE a blog  /blog/create


route.post("/create", upload.single("blog-image"), async (req, res) => {
  const blog = req.body;
  blog.image = req.file.path;
  const newBlog = new Blog(blog);
  await newBlog.save();
  await newBlog.populate("author");
  res.json(newBlog);
});
  
  
// });

// 3- DELETE a blog

route.delete("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const findBlog = await Blog.findById(blogId);

  //1. Delete the image from the uploads folder
  fs.unlinkSync(findBlog.image);
  //2. Delete the blog from the database
  await Blog.findByIdAndDelete(blogId).populate("author");
  res.json({ message: "Blog deleted successfully!" });
});

// 4- UPDATE a blog  /blog/like/:blogId/:authorId

// route.put("/like/:blogId/:authorId", async (req, res) => {
//   const { blogId, authorId } = req.params;
//   const blog = await Blog.findById(blogId).populate("author");

//   const isLiked = blog.likes.includes(authorId);

//   if (isLiked) {
//     blog.likes = blog.likes.filter((id) => id.toString() !== authorId);
//   } else {
//     blog.likes.push(authorId);
//   }

//   await blog.save();
  

//   res.json(blog);
// });

// http://localhost:5173/blog/1
// 5- GET a blog by id

route.get("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await Blog.findById(blogId).populate("author");
  res.json(blog);
});

export default route;