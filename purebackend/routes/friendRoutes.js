const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  sendRequest,
  acceptRequest,
  declineRequest,
  unfriend,
  getFriends,
  getRequests,
} = require('../controllers/friendController');

router.post('/request', auth, sendRequest);
router.post('/accept', auth, acceptRequest);
router.post('/decline', auth, declineRequest);
router.post('/unfriend', auth, unfriend);
router.get('/list', auth, getFriends);
router.get('/requests', auth, getRequests);

module.exports = router; 