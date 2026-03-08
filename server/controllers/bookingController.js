const Booking = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');

const createBooking = async (req, res, next) => {
  try {
    const { carId, pickup, dropoff, date, pickupTime, dropDate, dropTime, distance, fare } = req.body;
    
    const car = await Car.findById(carId);
    if (!car) { res.status(404); throw new Error('Car not found'); }

    const calcDistance = distance || Math.floor(Math.random() * 26) + 5;
    const calcFare = fare || calcDistance * car.pricePerKm;

    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      pickup,
      dropoff,
      date,
      pickupTime,
      dropDate,
      dropTime,
      distance: calcDistance,
      fare: calcFare
    });

    res.status(201).json(booking);
  } catch (error) { next(error); }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('carId').sort('-createdAt');
    res.json(bookings);
  } catch (error) { next(error); }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email').populate('carId').sort('-createdAt');
    res.json(bookings);
  } catch (error) { next(error); }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) { res.status(404); throw new Error('Booking not found'); }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) { next(error); }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) { res.status(404); throw new Error('Booking not found'); }

    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user.id) {
      res.status(403); throw new Error('Not authorized to delete this booking');
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking removed' });
  } catch (error) { next(error); }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus, deleteBooking };