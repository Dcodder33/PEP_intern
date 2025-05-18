const express = require('express');
const mongoose = require('mongoose');
const Notification = require('./models/Notification');
const notificationQueue = require('./queues/notificationQueue');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/notifications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/notifications', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    if (!userId || !type || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newNotification = new Notification({ userId, type, message });
    await newNotification.save();
    await notificationQueue.add(
      'send',
      { type, message, userId },
      { attempts: 3, backoff: { type: 'fixed', delay: 5000 } }
    );
    res.status(201).json({ message: 'Notification queued', notification: newNotification });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/users/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
