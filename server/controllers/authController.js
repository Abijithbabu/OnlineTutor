const User = require("../models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();
let otp;
const sendOtp = async (req, res) => {
  //   otp = OTP.sendMessage(parseInt(req.body.phone), res);
  return res.status(200).json({ code: otp });
};

const signup = async (req, res, next) => {
  const { name, email, phone, password, type } = req.body;
  console.log(req.body);
  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const user = new User({
      name,
      email,
      phone,
      password,
      type,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 8600,
    });
    console.log("token send", token);
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiration
      httpOnly: true,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "Successfully Logged in", user, token });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, process.env.JWT_SECRET);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (error) {
    return new Error(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPassword = await existingUser.matchPasswords(password);
  if (!isPassword) {
    return res
      .status(400)
      .json({ message: "Incorrect password ! please recheck your password" });
  }
  if (existingUser.status) {
    return res.status(403).json({ blocked: true, message: "Account Suspended by Administrator !" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: 860000,
  });
  console.log("token send", token);

  res
    .status(200)
    .cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      SameSite: "None",
      secure: true,
    })
    .json({
      message: "Successfully Logged in",
      user: existingUser,
      token,
    });
};


const logout = async (req, res) => {
  res.clearCookie(`token`);
  return res.status(200).json({ message: "Succefully Logged out" });
}

module.exports = {
  sendOtp,
  signup,
  login,
  logout
};