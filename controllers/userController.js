const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/generateToken");

const getUser = async (_, res) => {
  const user = await User.find({}).select("-password");
  try {
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "users found",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get by id
const getById = async (req, res) => {
  const { ID } = req.params;
  const user = await User.findById(ID);
  try {
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: `user not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `user found`,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Register a new user
const register = async (req, res) => {
  const { fullName, email, password, phoneNumber, address } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or Password Wrong",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or Password Wrong",
      });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};
// Switch user role to admin
const switchToAdmin = async (req, res) => {
  const { ID } = req.params;
  // const {role}=req.body;
  try {
    const switchUser = await User.findByIdAndUpdate(
      ID,
      { role: "admin" },
      { new: true }
    );
    if (!switchUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User switched to admin successfully",
        data: switchUser,
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Unable to switch to admin",
        error: error.message,
      });
  }
};

// Delete a user
const deleteAdmin = async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await User.deleteOne({ _id: ID });
    res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
        data: user,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error occurred while deleting the user",
        error,
      });
  }
};

// Update user information
const updateAdmin = async (req, res) => {
  const { ID } = req.params;
  const { fullName, email, phoneNumber, password, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      ID,
      { fullName, email, phoneNumber, address, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUser,
  getById,
  register,
  login,
  updateAdmin,
  switchToAdmin,
  deleteAdmin,
};
