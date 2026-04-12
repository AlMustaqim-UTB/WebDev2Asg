const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Unassigned'],
    default: 'Unassigned',
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // FIX: Define the 'remarks' field as an array of references to the 'Remark' model
  remarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Remark'
  }],
  date_resolved: {
    type: Date,
    default: null,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('Ticket', ticketSchema);