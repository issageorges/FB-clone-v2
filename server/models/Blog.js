import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;