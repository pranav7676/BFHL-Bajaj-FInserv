const express = require('express');
const router = express.Router();
const { processBFHL } = require('../controllers/bfhlController');

// POST /bfhl
router.post('/', processBFHL);

module.exports = router;
