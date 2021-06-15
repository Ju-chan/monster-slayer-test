// Entry point to the backend
// Common Js importing style
const express = require('express');
const connectDB = require('./config/db');

connectDB();
const app = express();

// Init Middleware in order to request req body
app.use(express.json({ extended: false }));
// Nenurodžius endpointo (route), rodys "Cannot get /"
app.get('/', (req, res) => res.json({ msg: 'Welcome to Monster Slayer' }));

// Defining routes to use
app.use('/api/users', require('./routes/users')); //looking to the file when someone accesses api/users
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
