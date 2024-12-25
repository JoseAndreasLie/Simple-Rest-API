// src/app.js
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');
const groupRoutes = require('./routes/group.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', groupRoutes);
app.use('/api', taskRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();