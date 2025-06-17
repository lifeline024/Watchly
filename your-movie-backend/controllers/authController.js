import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, "yourSecret");
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, "yourSecret");
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};
