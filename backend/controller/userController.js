import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json("User has been registered");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json("Wrong password");
    }
    const { password: pass, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: true }); //cannot be accessed via JavaScript in the browser
    res.status(200).json({ others, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
