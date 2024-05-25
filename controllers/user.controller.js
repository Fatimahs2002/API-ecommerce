const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.users; // Use consistent variable naming

// Register a new user
exports.register = async (req, res) => {
  const { fullName, email, password, phoneNumber, address } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An unexpected error occurred" });
  }
};

// Switch user role to admin
exports.switchToAdmin = async (req, res) => {
  const { ID } = req.params;
  try {
    const switchUser = await User.findByIdAndUpdate(ID, { role: "admin" }, { new: true });
    if (!switchUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User switched to admin successfully", data: switchUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Unable to switch to admin", error: error.message });
  }
};

// Delete a user
exports.deleteAdmin = async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await User.deleteOne({ _id: ID });
    res.status(200).json({ success: true, message: "User deleted successfully", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error occurred while deleting the user", error });
  }
};

// Update user information
exports.updateAdmin = async (req, res) => {
  const { ID } = req.params;
  const { fullName, email, phoneNumber, password, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(ID, { fullName, email, phoneNumber, address, password: hashedPassword }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
