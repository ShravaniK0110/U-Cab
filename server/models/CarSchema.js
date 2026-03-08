const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  seats: { type: Number },
  type: { type: String, enum: ['Mini', 'Sedan', 'SUV', 'Premium'] },
  pricePerKm: { type: Number },
  driverName: { type: String },
  image: { type: String },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Car', CarSchema);