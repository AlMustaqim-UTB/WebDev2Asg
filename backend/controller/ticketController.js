const Ticket = require("../models/Ticket");
const Remark = require("../models/Remark");
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new ticket
const createTicket = async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const lastTicket = await Ticket.findOne().sort({ date_created: -1 });
    let newKey = "IT-1001";

    if (lastTicket && lastTicket.key) {
      const lastKeyNumber = parseInt(lastTicket.key.split("-")[1], 10);
      newKey = `IT-${lastKeyNumber + 1}`;
    }

    const newTicket = new Ticket({
      key: newKey,
      title,
      description,
      category,
      created_by: req.user.id,
    });

    const ticket = await newTicket.save();
    return res.status(201).json(ticket);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Get user tickets
// only return ticket that are created by the logged in user
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ created_by: req.user.id })
      .populate("assigned_to", "name role")
      .sort({ date_created: -1 });

    return res.json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Add a remark to a ticket
const addRemark = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ msg: "Remark message is required." });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ msg: "Invalid ticket id" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    if (req.user.role === "user" && ticket.created_by.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied." });
    }

    const newRemark = new Remark({
      message,
      author: req.user.id,
    });

    await newRemark.save();
    ticket.remarks.push(newRemark._id);
    await ticket.save();

    const populatedRemark = await Remark.findById(newRemark._id).populate("author", "name role");
    return res.status(201).json(populatedRemark);
  } catch (error) {
    console.error("Error adding remark:", error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Get a single ticket by id
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ msg: "Invalid ticket id" });
    }

    const ticket = await Ticket.findById(id)
      .populate("created_by", "name department role")
      .populate("assigned_to", "name role")
      .populate({
        path: "remarks",
        populate: { path: "author", select: "name role" },
      });

    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    return res.json(ticket);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Update ticket (onyl by technician)
const updateTicket = async (req, res) => {
  if (req.user.role !== "technician") {
    return res.status(403).json({ msg: "Access denied. Not a technician." });
  }

  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ msg: "Invalid ticket id" });
    }

    const { status, priority, assigned_to, date_resolved } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (assigned_to !== undefined) ticket.assigned_to = assigned_to === "" ? null : assigned_to;
    if (date_resolved) ticket.date_resolved = date_resolved;

    const updatedTicket = await ticket.save();
    return res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Get all tickets (technician)
const getAllTickets = async (req, res) => {
  try {
    if (req.user.role !== "technician") {
      return res.status(403).json({ msg: "Access denied. Not a technician." });
    }

    const tickets = await Ticket.find({})
      .populate("assigned_to", "name email")
      .populate("created_by", "name email department")
      .sort({ date_created: -1 });

    return res.json(tickets);
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    return res.status(500).json({ msg: "Server error while fetching tickets." });
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