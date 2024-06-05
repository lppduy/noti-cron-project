const schedule = require('node-schedule');
const User = require('./models/User');
const Timezone = require('./models/Timezone');

// Hàm để cập nhật số lượng video được mở khóa
async function updateUnlockedVideosForTimezone(timezoneId) {
  try {
    const users = await User.findAll({ where: { timezoneId } });
    for (const user of users) {
      await user.update({ unlockedVideos: user.unlockedVideos + 1 });
      console.log(`User ${user.name} in timezone ${timezoneId} now has ${user.unlockedVideos} unlocked videos.`);
    }
    console.log(`Updated unlocked videos for users in timezone ${timezoneId}`);
  } catch (error) {
    console.error(`Error updating unlocked videos for timezone ${timezoneId}:`, error);
  }
}

// Hàm để lập lịch công việc cho từng timezone
async function scheduleJobs() {
  try {
    const timezones = await Timezone.findAll();
    for (const timezone of timezones) {
      const cronExpression = '0 0 * * *'; // Chạy vào 0 giờ hàng ngày
      schedule.scheduleJob({ tz: timezone.name, rule: cronExpression }, () => {
        console.log(`Running job for timezone ${timezone.name} at ${new Date().toLocaleString()}`);
        updateUnlockedVideosForTimezone(timezone.id);
      });
      console.log(`Scheduled job for timezone ${timezone.name}`);
    }
  } catch (error) {
    console.error('Error scheduling jobs:', error);
  }
}

module.exports = scheduleJobs;
