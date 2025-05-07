const User = require('../models/userModel');
const College = require('../models/collegeModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, college } = req.body;
    if (!name || !email || !password || !college) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    let collegeDoc = await College.findOne({ name: college });
    if (!collegeDoc) {
      collegeDoc = await College.create({ name: college });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college: collegeDoc._id,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      college: collegeDoc.name,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('college');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      college: user.college.name,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 