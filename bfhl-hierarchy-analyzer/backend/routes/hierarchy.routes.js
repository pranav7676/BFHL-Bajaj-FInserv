const express = require('express');
const router = express.Router();
const hierarchyController = require('../controllers/hierarchy.controller');

router.post('/analyze', hierarchyController.analyzeHierarchy);

module.exports = router;
