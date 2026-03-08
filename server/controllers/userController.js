const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      res.status(400); throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400); throw new Error('User already exists');
    }

    const user = await User.create({ name, email, phone, password });
    if (user) {
      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, phone: user.phone } });
    }
  } catch (error) { next(error); }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { res.status(400); throw new Error('User not found'); }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) { res.status(400); throw new Error('Invalid credentials'); }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) { next(error); }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) res.json(user);
    else { res.status(404); throw new Error('User not found'); }
  } catch (error) { next(error); }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) { next(error); }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) { res.status(404); throw new Error('User not found'); }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) { next(error); }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) res.json({ message: 'User removed' });
    else { res.status(404); throw new Error('User not found'); }
  } catch (error) { next(error); }
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers, updateUser, deleteUser };