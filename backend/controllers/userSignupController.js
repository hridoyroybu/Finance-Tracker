const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/secret');
const {
    insertRefreshToken,
    checkUserExists,
    insertUser,
    checkAuthenticatedUser,
    getUserByUserName,
    checkRefreshToken
} = require('../models/userModel');

const saltRounds = 10;

// Signup function
exports.signup = async (req, res) => {
    const { userName, displayName, password } = req.body;
    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    
    try {
        const exists = await checkUserExists(userName);
        if (exists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        await insertUser(userName, displayName, hashedPassword);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login function
exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const existsUser = await checkAuthenticatedUser(userName, password);
        if (existsUser) {
            const accessToken = jwt.sign({ username: userName }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            const refreshToken = jwt.sign({ username: userName }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

            const validateToken = await insertRefreshToken(existsUser.user_id, refreshToken, expiresAt);

            if (validateToken) {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'Strict',
                    secure: false, // Set to true in production (with HTTPS)
                    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
                });
            } else {
                return res.status(500).json({ ok: false, error: 'Internal Server Error' });
            }

            return res.status(200).json({ ok: true, message: 'Authorization Successful', access_token: accessToken });
        } else {
            return res.status(401).json({ ok: false, message: 'Authorization failed' });
        }
    } catch (error) {
        return res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token not found' });

    try {
        const validRefreshToken = await checkRefreshToken(refreshToken);
        if (validRefreshToken) {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(403).json({ message: 'Invalid token' });
    
                const newAccessToken = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    
                return res.status(200).json({ access_token: newAccessToken });
            });
        } else {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
};

exports.logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); // already logged out

    const deleteQuery = 'DELETE FROM refresh_tokens WHERE token = ?';
    connection.query(deleteQuery, [refreshToken], () => {
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};


exports.getUser = async (req, res) => {
    const { userName } = req.params;

    try {
        console.log(userName);
        const user = await getUserByUserName(userName);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `Welcome to the Finance Tracker ${user.display_name}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1X2hyaWRveSIsImlhdCI6MTc0Njk0NjEwNSwiZXhwIjoxNzQ2OTQ2NDA1fQ.KWDxTTINck4eejGPEQTrFGbLyJ6hJ8DCiQgzDEFgDxY
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1X2hyaWRveSIsImlhdCI6MTc0Njk0NjEwNSwiZXhwIjoxNzQ3MDMyNTA1fQ.dT5bnduKjN6shGpMfJ-EPa7kA0_GpQHR2NDmdBFx9jY