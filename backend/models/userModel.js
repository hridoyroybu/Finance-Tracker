const connection = require('../config/db');
const bcrypt = require('bcrypt');

const checkUserExists = (userName) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS count FROM users WHERE user_name = ?';
        connection.query(query, [userName], (err, result) => {
            if (err) return reject(err);
            resolve(result[0].count > 0);
        });
    });
};

const insertUser = (userName, displayName, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (user_name, display_name, password) VALUES (?, ?, ?)';
        connection.query(query, [userName, displayName, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const insertRefreshToken = (user_id, refreshToken, expiresAt) => {
    return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)';
        connection.query(insertQuery, [user_id, refreshToken, expiresAt], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const checkRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()';
        connection.query(query, [refreshToken], (err, results) => {
            if (err || results.length === 0) return reject(err);
            resolve(results);
        });
    });
};

const checkAuthenticatedUser = (userName, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE user_name = ?';
        connection.query(query, [userName], async (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(false);

            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                resolve(user);
            } else {
                reject(null);
            }
        });
    });
};

const getUserByUserName = (userName) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE user_name = ?';
        connection.query(query, [userName], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    insertRefreshToken,
    checkUserExists,
    insertUser,
    checkAuthenticatedUser, 
    getUserByUserName,
    checkRefreshToken
};

