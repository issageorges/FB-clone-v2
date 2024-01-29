import express from "express";
import User from "../models/User.js";

const route = express.Router();

// 1-  Register a user  /user/register

route.post("/register", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new User(user);
  await newUser.save();
  res.json(newUser);
});

// 2-  Login a user

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) return res.status(404).send("User not found");
  if (findUser.password !== password)
    return res.status(400).send("Wrong password or email");

  res.json(findUser);
});

export default route;