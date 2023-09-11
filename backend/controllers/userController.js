import asyncHandeler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/genereteToken.js";

//@decs Auth user/set token
//route  POST/api/users/auth
//@access public
const authUser = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    let passwordMatch = false;

    passwordMatch = await user.matchPassword(password);

    if (passwordMatch) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }else {
      res.status(401);
      throw new Error("invalid email or password");
    }
  } 
  res.status(200).json({ message: "Auth user" });
});

//@decs Register a new user
//route  POST/api/users
//@access public
const registerUser = asyncHandeler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  console.log("userExists", userExists);

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  }
});

//@decs Logout
//route  POST/api/users/logout
//@access public
const logoutUser = asyncHandeler(async (req, res) => {
  res.status(200).json({ message: "Logout user" });
});

//@decs get user profile
//route  GET/api/users/proile
//@access private
const getUserprofile = asyncHandeler(async (req, res) => {
  res.status(200).json({ message: "User profile" });
});

//@decs update user profile
//route  POST/api/users/proile
//@access private
const updateUserProfile = asyncHandeler(async (req, res) => {
  res.status(200).json({ message: "update profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserprofile,
  updateUserProfile,
};
