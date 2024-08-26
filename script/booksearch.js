const axios = require('axios');

module.exports.config = {
  name: "booksearch",
  version: "1.0",
  role: 0,
  hasPrefix: true,
  aliases: ["book", "findbook"],
  description: "Search for books and get details like author, publication date, and description.",
  usage: "booksearch [book title]",
  credits: "Metoushela Walker",
  category: "utility",
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const query = args.join(" ");

  if (!query) {
    return api.sendMessage("🔍 Please provide the title of the book you want to search for.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`);

    if (response.status === 200 && response.data.items.length > 0) {
      const book = response.data.items[0].volumeInfo;
      const title = book.title || "N/A";
      const authors = book.authors ? book.authors.join(', ') : "N/A";
      const publishedDate = book.publishedDate || "N/A";
      const description = book.description || "No description available.";
      const pageCount = book.pageCount || "N/A";
      const categories = book.categories ? book.categories.join(', ') : "N/A";
      const language = book.language.toUpperCase() || "N/A";
      const thumbnail = book.imageLinks?.thumbnail || null;

      let messageBody = `📚 **Title**: ${title}\n\n` +
                        `👨‍💼 **Author(s)**: ${authors}\n` +
                        `📅 **Published Date**: ${publishedDate}\n` +
                        `📖 **Page Count**: ${pageCount}\n` +
                        `🏷️ **Categories**: ${categories}\n` +
                        `🌍 **Language**: ${language}\n\n` +
                        `📝 **Description**: ${description}`;

      if (thumbnail) {
        api.sendMessage({
          body: messageBody,
          attachment: await global.utils.getStreamFromURL(thumbnail)
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage(messageBody, event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("😕 Sorry, no results found for your query.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("❌ An error occurred while fetching the book details. Please try again later.", event.threadID, event.messageID);
  }
};
