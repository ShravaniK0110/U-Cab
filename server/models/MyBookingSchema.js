const mongoose = require('mongoose');

const MyBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  date: { type: Date, required: true },
  pickupTime: { type: String },
  dropDate: { type: Date },
  dropTime: { type: String },
  fare: { type: Number },
  distance: { type: Number },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', MyBookingSchema);