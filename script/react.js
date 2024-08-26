module.exports.config = {
  name: 'react',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['reaction'],
  description: 'Reacts to a message with 👍 when the user sends 👍',
  usage: 'React',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    // Check if the reaction is 👍
    if (event.messageReaction && event.messageReaction.emoji.name === '👍') {
      // Get the message ID to react to
      const messageID = event.messageID;

      // React to the message with 👍
      await api.reactToMessage(messageID, '👍');
    }
  } catch (error) {
    console.error('Error in the react command:', error);
  }
};
