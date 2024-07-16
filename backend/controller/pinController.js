import Pin from "../model/pinSchema.js";

export const createPin = async (req, res) => {
  const { username, userId, title, description, rating, lat, long } = req.body;
  try {
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const newPin = new Pin({
      username,
      userId,
      title,
      description,
      rating,
      lat,
      long,
    });
    await newPin.save();
    res.status(201).json({ message: "Pin created successfully", newPin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPins = async (req, res) => {
  const { userId } = req.params;
  try {
    const pins = await Pin.find({ userId });
    if (!pins) {
      return res.status(404).json({ message: "No pins found" });
    }

    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePins = async (req, res) => {
  const { userId } = req.params;

  try {
    const pin = await Pin.findByIdAndDelete(userId);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json({ message: "Pin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
