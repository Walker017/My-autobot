const axios = require('axios');

module.exports.config = {
  name: "fact",
  aliases: ["funfact", "interestingfact"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "utility",
  shortDescription: "Provides a random interesting fact.",
  longDescription: "This command fetches and displays a random interesting fact using the Useless Facts API.",
  usage: "fact",
  credits: "Metoushela Walker",
  cooldown: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    const { data } = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');

    if (data && data.text) {
      const fact = data.text;
      api.sendMessage(`💡 Did you know?\n\n${fact}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('Sorry, I could not fetch a fact at the moment. Please try again later.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('Sorry, an error occurred while fetching a fact. Please try again later.', event.threadID, event.messageID);
  }
};
