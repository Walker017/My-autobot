const moment = require('moment-timezone');

module.exports.config = {
  name: 'time',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gmt'],
  description: 'Shows the current GMT time and calculates local time based on user\'s GMT offset.',
  usage: 'Time [GMT offset]',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  try {
    // Get current GMT time
    const gmtTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    // Default message for the current time
    let message = `🌍 **Current GMT Time**:\n\n${gmtTime}`;

    if (args.length > 0) {
      const offset = parseFloat(args[0]);

      if (!isNaN(offset)) {
        // Calculate local time based on GMT offset
        const localTime = moment.utc().add(offset, 'hours').format('YYYY-MM-DD HH:mm:ss');
        message += `\n\n🕒 **Local Time (GMT${offset >= 0 ? '+' : ''}${offset})**:\n\n${localTime}`;
      } else {
        message += '\n\n❌ **Error**: Invalid GMT offset. Please provide a valid number.';
      }
    }

    // Send the message with the current GMT time and, if provided, the local time
    api.sendMessage(message, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage('❌ Error: Something went wrong while processing the time request.', event.threadID, event.messageID);
    console.error('Error in the time command:', error);
  }
};
