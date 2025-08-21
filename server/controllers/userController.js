// controllers/usersController.js
import User from "../models/User.js";

export const getBarbers = async (req, res) => {
  try {
    const barbers = await User.find({ role: "admin" }).select("name");
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
