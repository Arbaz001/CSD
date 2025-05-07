const Post = require('../models/postModel');
const User = require('../models/userModel');

// Create post
exports.createPost = async (req, res) => {
  const { text, image } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });
  const post = await Post.create({
    user: req.user._id,
    college: req.user.college,
    text,
    image: image || '',
  });
  res.status(201).json(post);
};

// Get all posts in college
exports.getPosts = async (req, res) => {
  const posts = await Post.find({ college: req.user.college })
    .populate('user', 'name profilePic')
    .sort('-createdAt');
  res.json(posts);
};

// Like/unlike post
exports.toggleLike = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  if (!post || post.college.toString() !== req.user.college.toString()) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const liked = post.likes.includes(req.user._id);
  if (liked) {
    post.likes.pull(req.user._id);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json({ likes: post.likes.length });
};

// Comment on post
exports.comment = async (req, res) => {
  const { postId, text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment text required' });
  const post = await Post.findById(postId);
  if (!post || post.college.toString() !== req.user.college.toString()) {
    return res.status(404).json({ message: 'Post not found' });
  }
  post.comments.push({ user: req.user._id, text });
  await post.save();
  res.json(post.comments);
};

// Delete post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post || post.college.toString() !== req.user.college.toString()) {
    return res.status(404).json({ message: 'Post not found' });
  }
  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
}; 