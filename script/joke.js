const axios = require('axios');

module.exports.config = {
  name: "joke",
  aliases: ["funny", "joke"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "fun",
  shortDescription: "Tells a random joke.",
  longDescription: "This command fetches and displays a random joke using the JokeAPI.",
  usage: "joke",
  credits: "Metoushela Walker",
  cooldown: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any');

    if (data) {
      let jokeMessage;
      if (data.type === 'single') {
        jokeMessage = `🤣 Here's a joke for you:\n\n${data.joke}`;
      } else if (data.type === 'twopart') {
        jokeMessage = `🤣 Here's a joke for you:\n\n${data.setup}\n\n${data.delivery}`;
      } else {
        jokeMessage = 'Sorry, I couldn\'t fetch a joke at the moment.';
      }

      api.sendMessage(jokeMessage, event.threadID, event.messageID);
    } else {
      api.sendMessage('Sorry, I couldn\'t fetch a joke at the moment.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('Sorry, an error occurred while fetching a joke. Please try again later.', event.threadID, event.messageID);
  }
};