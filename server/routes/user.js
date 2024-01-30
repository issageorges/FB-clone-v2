import express from "express";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

const route = express.Router();

// Register a user  /user/register

route.post("/register", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new User(user);
  await newUser.save();
  res.json(newUser);
});

//  Login a user

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) return res.status(404).send("User not found");
  if (findUser.password !== password)
    return res.status(400).send("Wrong password or email");

  res.json(findUser);
});

// Upload a profile picture /update-profile
route.post("/update-profile", upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.user.id; 

    if (req.file) {
      const imagePath = req.file.path;
      await User.findByIdAndUpdate(userId, { profileImage: imagePath });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;