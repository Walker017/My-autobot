const math = require('mathjs');

module.exports.config = {
  name: 'math',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['calc', 'calculate'],
  description: 'Performs various types of mathematical calculations',
  usage: 'Math [operation] [expression]',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const input = args.join(' ').trim();
    if (!input) {
      return api.sendMessage('💡 Please provide a mathematical expression to calculate. Example usage: `Math 2 + 2`.', event.threadID, event.messageID);
    }

    // Perform the calculation
    const result = math.evaluate(input);
    
    // Send the result to the user
    const message = `🔢 **Result:**\n\n${input} = ${result}`;
    api.sendMessage(message, event.threadID, event.messageID);
    
  } catch (error) {
    // Handle errors and invalid expressions
    api.sendMessage('❌ Error: Invalid mathematical expression or operation. Please try again.', event.threadID, event.messageID);
    console.error(error);
  }
};
