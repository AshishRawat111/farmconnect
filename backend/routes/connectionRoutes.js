const express = require('express');
const router = express.Router();
const { sendRequest, getPendingRequests, acceptRequest } = require('../controllers/connectionController');

router.post('/send', sendRequest);
router.get('/pending/:userId', getPendingRequests);
router.post('/accept', acceptRequest);

module.exports = router;