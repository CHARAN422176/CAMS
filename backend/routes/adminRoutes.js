const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getStatusLists, getAdminStats } = require('../controllers/adminController');

// Protect all routes with auth and admin middleware
router.get('/stats', [auth, admin], getAdminStats);
router.get('/status-lists', [auth, admin], getStatusLists);

module.exports = router;