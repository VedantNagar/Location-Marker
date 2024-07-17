import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "14d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,

        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        message: "User has been registered and logged in",
        username: newUser.username,
        userId: newUser._id,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("This email is not registered.");
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(401).json("Wrong password");
    }
    const { password: passw, ...userInfo } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "14d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({
        message: "User has been logged in",
        username: user.username,
        userId: user._id,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    res.status(500).json(error);
  }
};
