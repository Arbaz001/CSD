const Message = require('../models/messageModel');
const User = require('../models/userModel');

// Send message
exports.sendMessage = async (req, res) => {
  const { toUserId, text } = req.body;
  if (!text) return res.status(400).json({ message: 'Message text required' });
  const toUser = await User.findById(toUserId);
  if (!toUser || toUser.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'User not found in your college' });
  }
  // Must be friends
  if (!req.user.friends.includes(toUserId)) {
    return res.status(403).json({ message: 'You are not friends' });
  }
  const message = await Message.create({
    sender: req.user._id,
    receiver: toUserId,
    college: req.user.college,
    text,
  });
  res.status(201).json(message);
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  const toUser = await User.findById(userId);
  if (!toUser || toUser.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'User not found in your college' });
  }
  if (!req.user.friends.includes(userId)) {
    return res.status(403).json({ message: 'You are not friends' });
  }
  const messages = await Message.find({
    college: req.user.college,
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  }).sort('createdAt');
  res.json(messages);
}; 