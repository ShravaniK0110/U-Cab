const express = require('express');
const router = express.Router();
const { getAvailableCars, getCarById, createCar, updateCar, deleteCar, getAllCarsAdmin } = require('../controllers/carController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/', getAvailableCars);
router.get('/admin', protect, adminOnly, getAllCarsAdmin);
router.get('/:id', getCarById);

router.post('/', protect, adminOnly, upload.single('image'), createCar);
router.put('/:id', protect, adminOnly, upload.single('image'), updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

module.exports = router;