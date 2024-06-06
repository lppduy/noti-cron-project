const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database').sequelize;
const User = require('./models/User');
const Timezone = require('./models/Timezone');
const dotenv = require('dotenv');
const { scheduleDailyJobs } = require('./scheduler'); // Import scheduler

dotenv.config();

const app = express();
app.use(bodyParser.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Sync all defined models to the DB.
    scheduleDailyJobs(); // Schedule daily jobs
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Endpoint to add a user
app.post('/users', async (req, res) => {
  try {
    const { name, email, phoneNumber, timezone } = req.body;
    const user = await User.create({ name, email, phoneNumber, timezoneId: timezone });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ include: [Timezone] });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
