const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database').sequelize;
const User = require('./models/User');
const Timezone = require('./models/Timezone');
const dotenv = require('dotenv');
const app = express();
const scheduleJobs = require('./scheduler'); // Import scheduler

app.use(bodyParser.json());
dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Sync all defined models to the DB.
    scheduleJobs(); // Start the scheduler
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Endpoint để thêm người dùng
app.post('/users', async (req, res) => {
  try {
    const { name, email, timezone } = req.body;
    const user = await User.create({ name, email, timezoneId: timezone });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint để lấy tất cả người dùng
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
