import db from '../config/db.js';

export const createUser = (username, email, hashedPassword, callback) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], callback);
};



export const getUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user by email:', err); // Log error for debugging
            return callback(err, null);
        }
        callback(null, results);
    });
};