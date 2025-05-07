const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  toggleLike,
  comment,
  deletePost,
} = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/', auth, getPosts);
router.post('/like', auth, toggleLike);
router.post('/comment', auth, comment);
router.delete('/:postId', auth, deletePost);

module.exports = router; 