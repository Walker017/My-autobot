const axios = require('axios');

module.exports.config = {
  name: "bibleverse",
  version: "1.0",
  role: 0,
  hasPrefix: true,
  aliases: ["verse", "bible"],
  description: "Sends a random Bible verse.",
  usage: "bibleverse",
  credits: "Metoushela",
  category: "utility",
  cooldown: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get("https://labs.bible.org/api/?passage=random&type=json");

    if (response.status === 200 && response.data.length > 0) {
      const verse = response.data[0];
      const message = `${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}`;
      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage("Sorry, an error occurred while getting the Bible verse.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("Sorry, an error occurred while getting the Bible verse.", event.threadID, event.messageID);
  }
};
