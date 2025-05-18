const { Worker } = require('bullmq');
const Redis = require('ioredis');
const notifier = require('../services/notifier');

const connection = new Redis({
  maxRetriesPerRequest: null
});

const worker = new Worker(
  'notifications',
  async job => {
    const { type, message, userId } = job.data;
    notifier.send(type, message, userId);
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`✅ Notification sent for job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});
