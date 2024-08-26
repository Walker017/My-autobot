const axios = require('axios');
module.exports.config = {
  name: 'asking',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['o', 'ok'],
  description: "An AI command powered by GPT-4o",
  usage: "Ask [prompt]",
  credits: 'Metoushela',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage('Yoo ˕ •マ:\n\nPlease ask me your question.', event.threadID, event.messageID);
    return;
  }

  try {
    const { data } = await axios.get(`https://metoushela-rest-api-tp5g.onrender.com/api/gpt4o?context=${encodeURIComponent(input)}`);
    const response = data.response;

    // Randomized response templates for variety
    const responseTemplates = [
      `🌳𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲:\n\n${response} 🍀`,
      `🌿𝗛𝗲𝗿𝗲'𝘀 𝘄𝗵𝗮𝘁 𝗜 𝗳𝗼𝘂𝗻𝗱:\n\n${response} 🌼`,
      `🍃𝗔𝗡𝗦𝗪𝗘𝗥:\n\n${response} 🌸`
    ];

    const randomResponse = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
    api.sendMessage(randomResponse, event.threadID, event.messageID);
    
  } catch (error) {
    api.sendMessage('😕 Oops, something went wrong. Please try again later.', event.threadID, event.messageID);
  }
};
