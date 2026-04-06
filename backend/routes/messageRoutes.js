const express = require('express');
const router = express.Router();
const { saveMessage, getChatHistory } = require('../controllers/messageController');

router.post('/send', saveMessage);
router.get('/history/:connectionId', getChatHistory);

module.exports = router;