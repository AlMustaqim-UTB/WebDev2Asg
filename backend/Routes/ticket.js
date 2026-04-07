import express from 'express';
import Ticket from '../models/Ticket.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;