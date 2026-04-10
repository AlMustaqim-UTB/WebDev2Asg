//the API routes for handling ticket-related operations in express.js backend

import express from 'express';
import Ticket from '../models/Ticket.js';

const router = express.Router();

//get multi tickets by ID
router.get('/', async (req, res) => {
  try{
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  }catch (error){
    res.status(500).json({error: error.message});
  }
});

// GET a single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a ticket by ID
router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//create a new ticket
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