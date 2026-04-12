const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserTickets,
  createTicket,
  getTicketById,
  updateTicket,
  getAllTickets,
  addRemark,
} = require("../controller/ticketController");

// Route to get tickets for the logged-in user
router.get("/mytickets", auth, getUserTickets);

// Route to get all tickets (for technicians)
router.get("/all", auth, getAllTickets);

// Route to create a new ticket
router.post("/", auth, createTicket);

// Route to get a single ticket by its MongoDB _id
router.get("/id/:id", auth, getTicketById);

// Route to update a ticket
router.put("/:id", auth, updateTicket);

// Route to add a remark to a ticket
router.post("/:id/remarks", auth, addRemark);

module.exports = router;