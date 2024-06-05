const schedule = require('node-schedule');
const User = require('./models/User');
const Timezone = require('./models/Timezone');

// Hàm để cập nhật số lượng video được mở khóa
async function updateUnlockedVideosForTimezone(timezoneId) {
  try {
    const users = await User.findAll({ where: { timezoneId } });
    for (const user of users) {
      // console.log(user)
      const newUnlockedVideoCount = user.unlockedVideo + 1;
      await user.update({ unlockedVideo: newUnlockedVideoCount });
      // console.log(user)
      console.log(`User ${user.name} in timezone ${timezoneId} now has ${newUnlockedVideoCount} unlocked videos.`);
    }
    console.log(`Updated unlocked videos for users in timezone ${timezoneId}`);
  } catch (error) {
    console.error(`Error updating unlocked videos for timezone ${timezoneId}:`, error);
  }
}

// Hàm để lập lịch công việc cho từng timezone mỗi ngày
async function scheduleDailyJobs() {
  try {
    const timezones = await Timezone.findAll();
    for (const timezone of timezones) {
      const cronExpression = '0 0 * * *'; // Chạy vào 0 giờ hàng ngày
      schedule.scheduleJob({ tz: timezone.name, rule: cronExpression }, () => {
        console.log(`Running daily job for timezone ${timezone.name} at ${new Date().toLocaleString()}`);
        updateUnlockedVideosForTimezone(timezone.id);
      });
      console.log(`Scheduled daily job for timezone ${timezone.name}`);
    }
  } catch (error) {
    console.error('Error scheduling daily jobs:', error);
  }
}

// Hàm để lập lịch công việc cho từng timezone mỗi phút (dùng để test)
async function scheduleMinuteJobs() {
  try {
    const timezones = await Timezone.findAll();
    for (const timezone of timezones) {
      const cronExpression = '* * * * *'; // Chạy mỗi phút
      schedule.scheduleJob({ tz: timezone.name, rule: cronExpression }, () => {
        console.log(`Running minute job for timezone ${timezone.name} at ${new Date().toLocaleString()}`);
        updateUnlockedVideosForTimezone(timezone.id);
      });
      console.log(`Scheduled minute job for timezone ${timezone.name}`);
    }
  } catch (error) {
    console.error('Error scheduling minute jobs:', error);
  }
}

module.exports = { scheduleDailyJobs, scheduleMinuteJobs, updateUnlockedVideosForTimezone };
