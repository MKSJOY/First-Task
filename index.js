import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { register, login } from './controllers/auth-controller.js';  // Correct path

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Server setup
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}/`);
});
