import Pin from "../model/pinSchema.js";

export const createPin = async (req, res) => {
  const { username, title, description, rating, lat, long } = req.body;
  try {
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const newPin = new Pin({
      username,
      title,
      description,
      rating,
      lat,
      long,
    });
    await newPin.save();
    res.status(201).json({ message: "Pin created successfully", newPin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPins = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const pins = await Pin.find({ username: user.username });

    if (!pins.length) {
      return res.status(404).json({ message: "No pins found for this user" });
    }

    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePins = async (req, res) => {
  const { id } = req.params;
  try {
    const pin = await Pin.findByIdAndDelete(id);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json({ message: "Pin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
