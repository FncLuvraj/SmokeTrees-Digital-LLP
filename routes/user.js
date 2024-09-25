// routes/user.js
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Address = require('../models/Address');

// Serve the HTML form
router.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label>Name:</label>
      <input type="text" name="name" required />
      <label>Address:</label>
      <input type="text" name="address" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { name, address } = req.body;

    // Create a new User
    const user = new User({ name });
    await user.save();

    // Create a new Address linked to the user
    const newAddress = new Address({ user: user._id, address });
    await newAddress.save();

    // Update user's addresses array
    user.addresses.push(newAddress._id);
    await user.save();

    res.status(200).send('User and address saved successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred.');
  }
});

// Optional: Get all users with their addresses
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('addresses');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred.');
  }
});

module.exports = router;
