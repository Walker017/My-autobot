const axios = require('axios');
module.exports.config = {
  name: 'ask',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['ASK', 'Ask'],
  description: "An AI command powered by GPT-4o",
  usage: "Ask [promot]",
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
    api.sendMessage(`-🍁ASKING ˕ •マ:\n\n ask me your question.`, event.threadID, event.messageID);
    return;
  }
  try {
    const {
      data
    } = await axios.get(`https://metoushela-rest-api-tp5g.onrender.com/api/gpt4o?context=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('🌳𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲:\n\n' + response + '🍀', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('🙂', event.threadID, event.messageID);
  }
};