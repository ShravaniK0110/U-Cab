const Car = require('../models/CarSchema');

const getAvailableCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json(cars);
  } catch (error) { next(error); }
};

const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) res.json(car);
    else { res.status(404); throw new Error('Car not found'); }
  } catch (error) { next(error); }
};

const getAllCarsAdmin = async (req, res, next) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) { next(error); }
};

const createCar = async (req, res, next) => {
  try {
    const { name, model, plateNumber, seats, type, pricePerKm, driverName, isAvailable } = req.body;
    const image = req.file ? req.file.path : '';

    const car = await Car.create({
      name, model, plateNumber, seats, type, pricePerKm, driverName, image, isAvailable: isAvailable !== undefined ? isAvailable : true
    });
    res.status(201).json(car);
  } catch (error) { next(error); }
};

const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) { res.status(404); throw new Error('Car not found'); }

    car.name = req.body.name || car.name;
    car.model = req.body.model || car.model;
    car.plateNumber = req.body.plateNumber || car.plateNumber;
    car.seats = req.body.seats || car.seats;
    car.type = req.body.type || car.type;
    car.pricePerKm = req.body.pricePerKm || car.pricePerKm;
    car.driverName = req.body.driverName || car.driverName;
    if (req.body.isAvailable !== undefined) car.isAvailable = req.body.isAvailable;
    if (req.file) car.image = req.file.path;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) { next(error); }
};

const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (car) res.json({ message: 'Car removed' });
    else { res.status(404); throw new Error('Car not found'); }
  } catch (error) { next(error); }
};

module.exports = { getAvailableCars, getCarById, createCar, updateCar, deleteCar, getAllCarsAdmin };