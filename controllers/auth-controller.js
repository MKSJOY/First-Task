import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../model/user.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        createUser(username, email, hash, (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({ message: "User registered successfully" });
        });
    });
};





export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate presence of email and password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Get the user from the database by email
        getUserByEmail(email, async (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Error fetching user', err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "User not found" });
            }

            const user = results[0]; // Assuming the first result is the user

            // Compare password with hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ error: err });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }

                // If passwords match, generate JWT token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                // Send success message along with the token
                res.status(200).json({ message: "Logged in successfully", token });
            });
        });
    } catch (err) {
        console.error('Login error:', err.stack);  // Log error stack for more details
        res.status(500).json({ error: 'Login error', err });
    }
};
