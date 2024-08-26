const axios = require('axios');

const apiKey = 'c4ef85b93982d6627681b056e24bd438'; // Remplacez par votre clé API OpenWeatherMap

module.exports.config = {
  name: "weather2",
  aliases: ["météo2", "forecast2"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "utility",
  shortDescription: "Displays weather information for a specified city.",
  longDescription: "This command fetches and displays current weather information for a given city using the OpenWeatherMap API.",
  usage: "weather [city]",
  credits: "Metoushela Walker",
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const city = args.join(' ');

  if (!city) {
    return api.sendMessage('Please provide a city name. Usage: weather [city]', event.threadID, event.messageID);
  }

  try {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric', // Use 'imperial' for Fahrenheit
        lang: 'en' // You can change to 'fr' for French
      }
    });

    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const cityName = data.name;
    const country = data.sys.country;

    const message = `Weather in ${cityName}, ${country}:
    🌡️ Temperature: ${temp}°C
    💧 Humidity: ${humidity}%
    🌬️ Wind Speed: ${windSpeed} m/s
    🌦️ Condition: ${weather}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Sorry, I could not fetch the weather information. Please make sure the city name is correct.', event.threadID, event.messageID);
  }
};
