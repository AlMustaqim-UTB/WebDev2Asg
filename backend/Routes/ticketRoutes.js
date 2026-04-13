const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTicket,
  getUserTickets,
  addRemark,
  getTicketById,
  updateTicket,
  getAllTickets,
} = require("../controller/ticketController");

// runs after auth, checks if logged-in user is technician.
const technicianOnly = (req, res, next) => {
  if (req.user?.role !== "technician") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

// Create a new ticket for the authenticated user.
router.post("/", auth, createTicket);

// Get tickets created by the authenticated user.
router.get("/", auth, getUserTickets);
router.get("/my", auth, getUserTickets); 

// Get one ticket by Mongo ObjectId.
// Controller also validates the id format.
router.get("/id/:id", auth, getTicketById);

// Add a remark/comment to a specific ticket.
router.post("/:id/remarks", auth, addRemark);

// Update ticket status/priority/assignment (technician only).
router.put("/:id", auth, technicianOnly, updateTicket);

// Get all tickets across users (technician only).
router.get("/all", auth, technicianOnly, getAllTickets);

module.exports = router;