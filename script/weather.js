const axios = require('axios');

const apiKey = 'YOUR_WEATHERAPI_KEY'; // Remplacez par votre clé API WeatherAPI

module.exports.config = {
  name: "weather",
  aliases: ["météo", "forecast"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "utility",
  shortDescription: "Displays weather information for a specified city.",
  longDescription: "This command fetches and displays current weather information for a given city using the WeatherAPI.",
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
    const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: city,
        lang: 'en' // You can change to 'fr' for French
      }
    });

    const weather = data.current.condition.text;
    const temp = data.current.temp_c; // For Celsius
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph; // Wind speed in kph
    const cityName = data.location.name;
    const country = data.location.country;

    const message = `Weather in ${cityName}, ${country}:
    🌡️ Temperature: ${temp}°C
    💧 Humidity: ${humidity}%
    🌬️ Wind Speed: ${windSpeed} kph
    🌦️ Condition: ${weather}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Sorry, I could not fetch the weather information. Please make sure the city name is correct.', event.threadID, event.messageID);
  }
};

