const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { fahrenheitToCelsius } = require('../core/utils');
const jwt = require('jsonwebtoken');
const checkAuth = require("../middleware/jwt-token-verify");

// Middleware
router.use(bodyParser.json());

// Routes
router.post('/login', async(req, res) => {
    try {
        if ( req.body.password == 'hridoytest123') {
            const token = await jwt.sign({
                username: req.body.username,
                name:  req.body.name
            }, 'thisIsAPrivateKey123#',  { expiresIn: 1000 * 60 });
            
            return res.status(200).json({ ok: true, message: 'Authorization Successfull', access_token: token});
        } else {
            throw Error;
        }
    } catch {
        return res.status(400).json({ ok: false, error: 'Authorization failed'});
    }
});


router.post('/convertToCelsius', checkAuth, (req, res) => {
    const { fahrenheit } = req.body;
    console.log(req.body);
    if (!fahrenheit) {
        return res.status(400).json({ ok: false, error: '`fahrenheit` value is required' });
    }
    
    const celsius = fahrenheitToCelsius(parseFloat(fahrenheit));
    return res.json({ ok: true, celsius: celsius });
});





router.get('/testuser', (req, res) => {
    res.status(200).json({ ok: true, username: 'hridoy', address: 'Barishal'});
});
module.exports = router;