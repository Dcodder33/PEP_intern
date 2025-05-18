// services/notifier.js

module.exports.send = (type, message, userId) => {
  switch (type) {
    case 'email':
      console.log(`[EMAIL to ${userId}]: ${message}`);
      break;
    case 'sms':
      console.log(`[SMS to ${userId}]: ${message}`);
      break;
    case 'in-app':
      console.log(`[IN-APP to ${userId}]: ${message}`);
      break;
    default:
      console.log(`[UNKNOWN TYPE]: ${message}`);
  }
};
