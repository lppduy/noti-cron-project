const schedule = require('node-schedule');
const User = require('./models/User');
const Timezone = require('./models/Timezone');
const { sendSMS, sendEmailViaActiveCampaign, sendEmailViaPostmark } = require('./notificationService');

// Function to send SMS and email via ActiveCampaign in the morning
async function sendMorningNotificationsForTimezone(timezoneId) {
  try {
    const users = await User.findAll({ where: { timezoneId } });
    for (const user of users) {
      // If the user has already unlocked 6 videos, do not send notifications
      if (user.unlockedVideo === 6) return;

      await sendSMS(user.phoneNumber);
      await sendEmailViaActiveCampaign(user.email);
      console.log(`Sent morning notifications to user ${user.name} in timezone ${timezoneId}`);
    }
  } catch (error) {
    console.error(`Error sending morning notifications for timezone ${timezoneId}:`, error);
  }
}

// Function to unlock next video and send email via Postmark in the evening
async function unlockEveningNotificationsForTimezone(timezoneId) {
  try {
    const users = await User.findAll({ where: { timezoneId } });
    for (const user of users) {
      // Function to unlock the next video and send email via Postmark in the evening
      if (user.unlockedVideo === 6) return;

      const newUnlockedVideoCount = user.unlockedVideo + 1;

      await user.update({ unlockedVideo: newUnlockedVideoCount });
      await sendEmailViaPostmark(user.email);
      await sendSMS(user.phoneNumber);
      console.log(`Unlocked next video and sent evening notifications to user ${user.name} in timezone ${timezoneId}`);
    }
  } catch (error) {
    console.error(`Error unlocking videos and sending evening notifications for timezone ${timezoneId}:`, error);
  }
}

// Function to schedule daily jobs at 8 AM and 5 PM for each timezone
async function scheduleDailyJobs() {
  try {
    const timezones = await Timezone.findAll();
    for (const timezone of timezones) {
      // Schedule job at 8 AM
      schedule.scheduleJob({ tz: timezone.name, rule: '0 8 * * *' }, () => {
        console.log(`>>>>>>> Running morning job for timezone ${timezone.name} at ${new Date().toLocaleString()}`);
        sendMorningNotificationsForTimezone(timezone.id);
      });
      console.log(`Scheduled morning job for timezone ${timezone.name}`);

      // Schedule job at 5 PM
      schedule.scheduleJob({ tz: timezone.name, rule: '0 17 * * *' }, () => {
        console.log(`>>>>>>> Running evening job for timezone ${timezone.name} at ${new Date().toLocaleString()}`);
        unlockEveningNotificationsForTimezone(timezone.id);
      });
      console.log(`Scheduled evening job for timezone ${timezone.name}`);
    }
  } catch (error) {
    console.error('Error scheduling daily jobs:', error);
  }
}

module.exports = { scheduleDailyJobs };
