const axios = require('axios');

module.exports.config = {
  name: "@meta ai matchresult",
  aliases: ["@football", "@score", "@match"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "sports",
  shortDescription: "Search and display the result of a football match.",
  longDescription: "This command allows you to search and display the result of a specific football match using a football API.",
  usage: "matchresult [team name]",
  credits: "Metoushela Walker",
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const teamName = args.join(" ").trim();

  if (!teamName) {
    return api.sendMessage("⚽ Please provide a team name to search for match results.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://api.football-data.org/v4/matches?team=${teamName}`, {
      headers: { 'X-Auth-Token': '94c22982c6d5468996a927ed5098a3b8' }
    });

    if (response.status === 200 && response.data.matches.length > 0) {
      const match = response.data.matches[0];
      const homeTeam = match.homeTeam.name;
      const awayTeam = match.awayTeam.name;
      const homeScore = match.score.fullTime.home;
      const awayScore = match.score.fullTime.away;
      const matchDate = new Date(match.utcDate).toLocaleString();

      const message = `⚽ Match Result:\n\n${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}\n\n🗓 Date: ${matchDate}`;

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage(`⚽ No match results found for team: ${teamName}.`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❌ Sorry, an error occurred while fetching the match result.", event.threadID, event.messageID);
  }
};