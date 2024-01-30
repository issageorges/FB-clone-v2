import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// create a comment (POST)
router.post("/:postId/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const content = req.body.comment;

  try {
    const newComment = await Comment.create({
      content,
      user: userId,
      post: postId,
    });

    console.log("newComment:", newComment);

    // const post = await Post.findByIdAndUpdate(
    //   postId,
    //   // { $inc: { comments: 1 } },
    //   { new: true }
    // );

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// get all comments by postId (GET)
router.get("/find/many/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ post: postId }).populate("user");
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
