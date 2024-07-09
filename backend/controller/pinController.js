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
  try {
    const pins = await Pin.find();
    if (!pins) {
      return res.status(404).json({ message: "No pins found" });
    }
    res.status(200).json(pins);
  } catch (error) {}
};
