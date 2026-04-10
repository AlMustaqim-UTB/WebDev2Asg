//the API routes for handling ticket-related operations in express.js backend

import express from 'express';
import Ticket from '../models/Ticket.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  }catch (error){
    res.status(500).json({error: error.message});
  }
});

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