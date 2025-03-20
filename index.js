import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes.js';

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Server setup
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}/`);
});
