const axios = require('axios');

const truths = [
  "What is your biggest secret?",
  "Have you ever lied to your best friend?",
  "What is the most embarrassing thing you've done?",
  "Who is your crush?",
  "What is one thing you would change about yourself?"
];

const dares = [
  "Dance with no music for 30 seconds.",
  "Sing the chorus of your favorite song.",
  "Post an embarrassing photo on social media.",
  "Let someone draw on your face with a pen.",
  "Do your best impression of someone until someone can guess who you are."
];

module.exports.config = {
  name: "truth-or-dare",
  aliases: ["tod", "actionortruth"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "games",
  shortDescription: "Play a game of Truth or Dare.",
  longDescription: "This command allows you to play Truth or Dare by randomly selecting a truth question or a dare.",
  usage: "truth-or-dare [truth/dare]",
  credits: "Metoushela Walker",
  cooldown: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args, prefix }) {
  const { threadID, messageID } = event;
  const choice = args[0]?.toLowerCase();

  if (choice !== 'truth' && choice !== 'dare') {
    return api.sendMessage(`Please specify whether you want a 'truth' or 'dare'.\nUsage: ${prefix}truth-or-dare [truth/dare]`, threadID, messageID);
  }

  let response;

  if (choice === 'truth') {
    const randomIndex = Math.floor(Math.random() * truths.length);
    response = `🔍 Truth: ${truths[randomIndex]}`;
  } else if (choice === 'dare') {
    const randomIndex = Math.floor(Math.random() * dares.length);
    response = `🎯 Dare: ${dares[randomIndex]}`;
  }

  api.sendMessage(response, threadID, messageID);
};
