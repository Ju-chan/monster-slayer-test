// Authentication
const express = require('express');
const router = express.Router();
// These modules arerequired for comparing tokens and letting user to sign in
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../midleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   GET api/auth
// @desc    get logged in use / fetching user's input log in data
// @access  Private, needs protection

// Accessed only when logged in, the token is verified,  the second parameter "auth" runs the middleware function in the middleware folder
router.get('/', auth, async (req, res) => {
  try {
    // Getting user from the database; if the password is hashed, we don't wanna sent it back along with the token
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth Logging in /sending data
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Name is not required for loggging in again
    const { email, password } = req.body;
    try {
      // Checking if the user exists already
      let user = await User.findOne({ email });
      // If there is no user with the input credentials
      if (!user) {
        return res.status(400).json({ msg: 'Wrong email' });
      }
      // Checking the password, comparing if the plain-text pasword matches the password typed by the user, the hashed password --> user.password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong password' });
      }
      // If the passwords match, returning the token
      const payload = {
        user: {
          id: user.id,
        },
      };
      // For security purposes, we should not specify jwt secret parameter here but instead keep it in a separate folder
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          // The token expires after 100 hours
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// Exporting modules
module.exports = router;
