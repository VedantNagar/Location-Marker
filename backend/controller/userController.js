import User from "../model/userSchema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");
    const { password, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
