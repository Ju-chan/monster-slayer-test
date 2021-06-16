// Registration
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// For creating user-unique token upon registration and signing in
const jwt = require('jsonwebtoken');
const config = require('config');

// Checking input data parameters, e.g. whether name or email was provided
const { check, validationResult } = require('express-validator');

// Requiring User model
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // Specifying check conditions
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please specify a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { image, name, email, password } = req.body;

    // Checking if there is the user with these credentials already
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // Setting up a new user if it is a new one
      user = new User({
        image,
        name,
        email,
        password,
      });

      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      // Hashing the pasword
      user.password = await bcrypt.hash(password, salt);
      // Returning a promise, saving a user
      await user.save();

      // The object we want to send in the token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          // The token expires after 100 hours
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post('/users', async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });
  res.send(foundUser);
});

// Exporting modules
module.exports = router;
