const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('../config/db');
const userSignupController = require('../controllers/userSignupController');
const authenticate = require("../middleware/jwt-token-verify");

const router = express.Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.get('/users', (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// POST route for signup
router.post('/signup', userSignupController.signup);

// POST route for signup
router.post('/login', userSignupController.login);

// POST route for logout
router.post('/logout', userSignupController.logout);

// POST route for refresh-token
router.post('/refresh-token', userSignupController.refreshToken);

// Get route to get user information
router.post('/get-user', authenticate, userSignupController.getUser);



module.exports = router;
