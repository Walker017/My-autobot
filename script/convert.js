const axios = require('axios');

const apiKey = '6fb9ee6328f6fdfa111c3185'; // Remplacez par votre clé API ExchangeRate-API

module.exports.config = {
  name: "convert",
  aliases: ["currency", "exchange"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "utility",
  shortDescription: "Converts an amount from one currency to another.",
  longDescription: "This command converts an amount from one currency to another using the ExchangeRate-API.",
  usage: "convert [amount] [from_currency] [to_currency]",
  credits: "Metoushela Walker",
  cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
  if (args.length < 3) {
    return api.sendMessage('Usage: convert [amount] [from_currency] [to_currency]', event.threadID, event.messageID);
  }

  const amount = parseFloat(args[0]);
  const fromCurrency = args[1].toUpperCase();
  const toCurrency = args[2].toUpperCase();

  if (isNaN(amount)) {
    return api.sendMessage('Please provide a valid amount.', event.threadID, event.messageID);
  }

  try {
    const { data } = await axios.get('https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/' + fromCurrency);

    const rate = data.conversion_rates[toCurrency];
    if (!rate) {
      return api.sendMessage(`Conversion rate for ${toCurrency} not found.`, event.threadID, event.messageID);
    }

    const convertedAmount = (amount * rate).toFixed(2);
    const message = `${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}.`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Sorry, an error occurred while converting the currency. Please try again later.', event.threadID, event.messageID);
  }
};
