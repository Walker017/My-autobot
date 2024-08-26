const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['gpt', 'openai'],
  description: "✨ An AI command powered by GPT-4 ✨",
  usages: "ai [prompt]",
  credits: 'Developer',
  cooldowns: 3,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(
      `🤖 Oops! You forgot to ask something! Try again like this: \n\n📝 'ai What is the capital of France?'`,
      event.threadID,
      event.messageID
    );
    return;
  }
  
  if (input === "clear") {
    try {
      await axios.post('https://satomoigpt.onrender.com/clear', { id: event.senderID });
      return api.sendMessage(
        "🚮 Chat history has been cleared. You're starting fresh! 🧹",
        event.threadID,
        event.messageID
      );
    } catch {
      return api.sendMessage(
        '⚠️ An error occurred while clearing the chat history. Please try again later.',
        event.threadID, 
        event.messageID
      );
    }
  }

  api.sendMessage(
    `🔍 Searching for: "${input}" \n\n💬 Please wait while I fetch the response...`,
    event.threadID,
    event.messageID
  );
  
  try {
    const url = event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo"
      ? { link: event.messageReply.attachments[0].url }
      : {};

    const { data } = await axios.post('https://satomoigpt.onrender.com/chat', {
      prompt: input,
      customId: event.senderID,
      ...url
    });

    api.sendMessage(
      `${data.message}\n\n🧠 Type "ai clear" to reset the conversation and start fresh!`,
      event.threadID,
      event.messageID
    );
  } catch {
    api.sendMessage(
      '❌ Oops! Something went wrong while processing your request. Please try again later.',
      event.threadID,
      event.messageID
    );
  }
};
