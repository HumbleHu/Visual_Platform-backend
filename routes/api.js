const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const queryController = require('../controllers/queryController');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/github', queryController.queryGitHub);

module.exports = router;