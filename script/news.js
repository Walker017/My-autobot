const axios = require('axios');

const apiKey = '7a9b0f60f5014629a74f0f20c31495ad'; // Remplacez par votre clé API NewsAPI

module.exports.config = {
  name: "news",
  aliases: ["latestnews", "headlines"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "information",
  shortDescription: "Displays the latest news headlines.",
  longDescription: "This command fetches and displays the latest news headlines using the NewsAPI.",
  usage: "news",
  credits: "Metoushela Walker",
  cooldown: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    // Fetch the latest news from NewsAPI
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us', // You can change the country code to get news from different countries
        apiKey: apiKey,
        pageSize: 5, // Number of headlines to display
      },
    });

    const articles = data.articles;
    if (articles.length === 0) {
      return api.sendMessage('No news articles found at the moment.', event.threadID, event.messageID);
    }

    // Format the news headlines
    let newsMessage = '🗞️ **Latest News Headlines**\n\n';
    articles.forEach((article, index) => {
      newsMessage += `${index + 1}. 📰 ${article.title}\n   🌐 ${article.source.name}\n   📅 ${new Date(article.publishedAt).toLocaleDateString()}\n   🔗 [Read more](${article.url})\n\n`;
    });

    api.sendMessage(newsMessage, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Sorry, an error occurred while fetching the news. Please try again later.', event.threadID, event.messageID);
  }
};
