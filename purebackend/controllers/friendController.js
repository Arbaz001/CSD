const User = require('../models/userModel');
const FriendRequest = require('../models/friendRequestModel');

// Send friend request
exports.sendRequest = async (req, res) => {
  const { toUserId } = req.body;
  if (toUserId === req.user._id.toString()) {
    return res.status(400).json({ message: 'Cannot send request to yourself' });
  }
  const toUser = await User.findById(toUserId);
  if (!toUser || toUser.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'User not found in your college' });
  }
  const existing = await FriendRequest.findOne({ from: req.user._id, to: toUserId, status: 'pending' });
  if (existing) {
    return res.status(400).json({ message: 'Request already sent' });
  }
  await FriendRequest.create({ from: req.user._id, to: toUserId, college: req.user.college });
  res.json({ message: 'Friend request sent' });
};

// Accept friend request
exports.acceptRequest = async (req, res) => {
  const { requestId } = req.body;
  const request = await FriendRequest.findById(requestId);
  if (!request || request.to.toString() !== req.user._id.toString() || request.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'Request not found' });
  }
  request.status = 'accepted';
  await request.save();
  await User.findByIdAndUpdate(request.from, { $addToSet: { friends: request.to } });
  await User.findByIdAndUpdate(request.to, { $addToSet: { friends: request.from } });
  res.json({ message: 'Friend request accepted' });
};

// Decline friend request
exports.declineRequest = async (req, res) => {
  const { requestId } = req.body;
  const request = await FriendRequest.findById(requestId);
  if (!request || request.to.toString() !== req.user._id.toString() || request.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'Request not found' });
  }
  request.status = 'declined';
  await request.save();
  res.json({ message: 'Friend request declined' });
};

// Unfriend
exports.unfriend = async (req, res) => {
  const { friendId } = req.body;
  const friend = await User.findById(friendId);
  if (!friend || friend.college.toString() !== req.user.college.toString()) {
    return res.status(400).json({ message: 'User not found in your college' });
  }
  await User.findByIdAndUpdate(req.user._id, { $pull: { friends: friendId } });
  await User.findByIdAndUpdate(friendId, { $pull: { friends: req.user._id } });
  res.json({ message: 'Unfriended successfully' });
};

// List friends
exports.getFriends = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'friends',
    match: { college: req.user.college },
    select: '-password',
  });
  res.json(user.friends);
};

// List friend requests (received)
exports.getRequests = async (req, res) => {
  const requests = await FriendRequest.find({
    to: req.user._id,
    status: 'pending',
    college: req.user.college,
  }).populate('from', 'name email profilePic');
  res.json(requests);
}; 