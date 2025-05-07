const User = require('../models/userModel');
const College = require('../models/collegeModel');

// View own profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// View other users in same college
exports.getUsers = async (req, res) => {
  const users = await User.find({
    college: req.user.college,
    _id: { $ne: req.user._id },
  }).select('-password');
  res.json(users);
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { name, bio, profilePic } = req.body;
  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (profilePic) user.profilePic = profilePic;
  await user.save();
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    college: user.college,
    profilePic: user.profilePic,
    bio: user.bio,
  });
}; 