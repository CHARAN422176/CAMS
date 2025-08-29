const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { logExit, logEntry, getStatus } = require('../controllers/studentController');

router.post('/log-exit', auth, logExit);
router.post('/log-entry', auth, logEntry);
router.get('/status', auth, getStatus);

module.exports = router;