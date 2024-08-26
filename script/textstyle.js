module.exports.config = {
  name: 'textstyle',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['styletext', 'formattext'],
  description: 'Formats text into various styles like bold, italic, underline, and strikethrough.',
  usage: 'Textstyle [style] [text]',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const style = args.shift(); // First argument is the style
  const text = args.join(' '); // Remaining arguments are the text

  if (!text) {
    return api.sendMessage('✏️ Please provide the text you want to format.', event.threadID, event.messageID);
  }

  let formattedText;
  switch (style.toLowerCase()) {
    case 'bold':
      formattedText = `**${text}**`; // Markdown bold
      break;
    case 'italic':
      formattedText = `*${text}*`; // Markdown italic
      break;
    case 'underline':
      formattedText = `__${text}__`; // Markdown underline
      break;
    case 'strikethrough':
      formattedText = `~~${text}~~`; // Markdown strikethrough
      break;
    default:
      formattedText = text; // No formatting
      break;
  }

  api.sendMessage(`📜 **Formatted Text**:\n\n${formattedText}`, event.threadID, event.messageID);
};
