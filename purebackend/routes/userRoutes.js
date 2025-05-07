const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProfile, getUsers, updateProfile } = require('../controllers/userController');

router.get('/me', auth, getProfile);
router.get('/', auth, getUsers);
router.put('/me', auth, updateProfile);

module.exports = router; 