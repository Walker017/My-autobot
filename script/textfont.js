const figlet = require('figlet');

module.exports.config = {
  name: 'textfont',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['fonttext', 'textstyle'],
  description: 'Transforms text into different ASCII art fonts.',
  usage: 'Textfont [font] [text]',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const font = args.shift(); // First argument is the font
  const text = args.join(' '); // Remaining arguments are the text

  if (!text) {
    return api.sendMessage('✏️ Please provide the text you want to transform.', event.threadID, event.messageID);
  }

  figlet.text(text, { font: font || 'Standard' }, (err, result) => {
    if (err) {
      return api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
    }

    api.sendMessage('🅵🅾🅽🆃\n\n' + result, event.threadID, event.messageID);
  });
};
