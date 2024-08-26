const axios = require('axios');
module.exports.config = {
  name: 'gpt4o',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['4o', '4O'],
  description: "An AI command powered by GPT-4o",
  usage: "4o [promot]",
  credits: 'metoushela',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`🌤 𝗚𝗽𝘁4𝗼:\n\n veillez poser une question.`, event.threadID, event.messageID);
    return;
  }
  try {
    const {
      data
    } = await axios.get(`=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('💬 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲:\n\n' + response + '🌤', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('🤨 Oops !', event.threadID, event.messageID);
  }
};
