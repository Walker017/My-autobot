const axios = require('axios');

module.exports.config = {
  name: 'booksearch2',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['searchbook2', 'findbook2'],
  description: 'Searches for books using the Open Library API.',
  usage: 'Booksearch [query]',
  credits: 'Metoushela',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const query = args.join(' ');
    if (!query) {
      return api.sendMessage('📚 Please provide a search query for the book.', event.threadID, event.messageID);
    }

    // Open Library API endpoint
    const endpoint = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    // Fetch data from Open Library API
    const { data } = await axios.get(endpoint);
    const docs = data.docs;

    if (docs && docs.length > 0) {
      let message = '📖 **Book Search Results**:\n\n';

      docs.slice(0, 5).forEach((doc, index) => {
        const title = doc.title || 'No title';
        const authors = doc.author_name ? doc.author_name.join(', ') : 'Unknown author';
        const firstPublishYear = doc.first_publish_year || 'Unknown year';
        const key = doc.key ? `https://openlibrary.org${doc.key}` : '#';

        message += `\n${index + 1}. **${title}**\n` +
                   `   ✍️ **Authors**: ${authors}\n` +
                   `   📅 **First Published**: ${firstPublishYear}\n` +
                   `   🔗 **More Info**: [Link](${key})\n`;
      });

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage('❌ No books found for the provided query.', event.threadID, event.messageID);
    }

  } catch (error) {
    api.sendMessage('❌ Error: Unable to search for books. Please try again later.', event.threadID, event.messageID);
    console.error('Error in the booksearch command:', error);
  }
};
