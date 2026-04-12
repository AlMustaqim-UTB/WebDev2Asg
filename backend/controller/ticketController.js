const Ticket = require('../models/Ticket');
const Remark = require('../models/Remark'); // Import the Remark model

//Create a new ticket
const createTicket = async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Generate the ticket key 'IT-xxxx'
    const lastTicket = await Ticket.findOne().sort({ date_created: -1 });
    let newKey = "IT-1001"; // Starting key

    if (lastTicket && lastTicket.key) {
      const lastKeyNumber = parseInt(lastTicket.key.split("-")[1]);
      newKey = `IT-${lastKeyNumber + 1}`;
    }

    const newTicket = new Ticket({
      key: newKey,
      title,
      description,
      category,
      created_by: req.user.id, // Get user ID from the middleware
    });

    const ticket = await newTicket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Get user tickets
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ created_by: req.user.id });
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Add a remark to a ticket
const addRemark = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Remark message is required." });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Authorization: Ensure the user owns the ticket or is a technician
    if (req.user.role === "user" && ticket.created_by.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }

    const newRemark = new Remark({
      message,
      author: req.user.id,
    });

    await newRemark.save();

    ticket.remarks.push(newRemark._id);
    await ticket.save();

    // Populate author details for the frontend
    const populatedRemark = await Remark.findById(newRemark._id).populate("author", "name role");

    res.status(201).json(populatedRemark);
  } catch (error) {
    console.error("Error adding remark:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a single ticket by its MongoDB _id
// @route   GET /api/tickets/id/:id
// @access  Private
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("created_by", "name email department")
      .populate("assigned_to", "name email")
      .populate({
        path: "remarks",
        populate: { path: "author", select: "name role" },
      });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Authorization check
    if (req.user.role === "user" && ticket.created_by._id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private (Technician only)
const updateTicket = async (req, res) => {
  if (req.user.role !== 'technician') {
    return res.status(403).json({ message: "Access denied. Not a technician." });
  }

  try {
    const { status, priority, assigned_to, date_resolved } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update fields if they are provided in the request body
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    
    // Handle assigned_to: set to null if empty string, otherwise update
    if (assigned_to !== undefined) {
        ticket.assigned_to = assigned_to === '' ? null : assigned_to;
    }

    if (date_resolved) {
      ticket.date_resolved = date_resolved;
    }

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets/all
// @access  Private (Technician only)
const getAllTickets = async (req, res) => {
  try {
    if (req.user.role !== "technician") {
      return res.status(403).json({ message: "Access denied. Not a technician." });
    }

    const tickets = await Ticket.find({})
      .populate("assigned_to", "name email")
      .populate("created_by", "name email department")
      .sort({ date_created: -1 });

    res.json(tickets);

  } catch (error) {
    console.error("Error fetching all tickets:", error);
    res.status(500).json({ message: "Server error while fetching tickets." });
  }
};


module.exports = {
  createTicket,
  getUserTickets,
  addRemark,
  getTicketById,
  updateTicket,
  getAllTickets,
};