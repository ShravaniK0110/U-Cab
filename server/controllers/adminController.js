const Admin = require('../models/AdminSchema');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400); throw new Error('Please add all fields');
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400); throw new Error('Admin already exists');
    }

    const admin = await Admin.create({ name, email, password });
    if (admin) {
      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email } });
    }
  } catch (error) { next(error); }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) { res.status(400); throw new Error('Admin not found'); }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) { res.status(400); throw new Error('Invalid credentials'); }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) { next(error); }
};

module.exports = { registerAdmin, loginAdmin };