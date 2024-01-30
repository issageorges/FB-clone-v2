import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import commentRouter from "./routes/comment.js"

const app = express();

const PORT = 5003;

app.use(express.json());
app.use(cors()); 
app.use("/uploads", express.static("./uploads"));

app.use("/post", blogRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter)

app.listen(PORT, () => {
  mongoose
    .connect(
      "mongodb+srv://admin_tiogk:ArHqOhO2bhrWCc0k@clustertodolistapp.r3tmxlh.mongodb.net/fb_clone_tiogk"
    )
    .then(() => console.log("Mongodb Connected!"))
    .catch((err) => console.log(err));
  console.log(`Server is running on port ${PORT}`);
});