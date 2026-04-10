import express from 'express';
import connectDB from './config/db.js';
import ticketRoutes from './Routes/ticket.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); 
app.use('/api/ticket', ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));