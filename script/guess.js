const axios = require('axios');

const gameState = {}; // Utilisé pour stocker l'état du jeu par utilisateur

module.exports.config = {
  name: "guess",
  aliases: ["numberguess", "guessnumber"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "games",
  shortDescription: "Play a guessing game where you guess a number between 1 and 100.",
  longDescription: "This command starts a guessing game where you have to guess a number between 1 and 100. The bot will tell you if your guess is too high or too low.",
  usage: "guess [number]",
  credits: "Metoushela Walker",
  cooldown: 10,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args, prefix }) {
  const { threadID, messageID, body } = event;

  // Initialiser l'état du jeu pour le fil de discussion
  if (!gameState[threadID]) {
    gameState[threadID] = {
      number: Math.floor(Math.random() * 100) + 1,
      guesses: []
    };
  }

  const guess = parseInt(args[0], 10);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    return api.sendMessage(`Please provide a valid number between 1 and 100.\nUsage: ${prefix}guess [number]`, threadID, messageID);
  }

  const game = gameState[threadID];
  
  if (game.guesses.includes(guess)) {
    return api.sendMessage('You already guessed that number. Try a different one.', threadID, messageID);
  }

  game.guesses.push(guess);

  if (guess === game.number) {
    api.sendMessage(`🎉 Congratulations! You guessed the right number: ${game.number}.`, threadID, messageID);
    // Réinitialiser l'état du jeu
    gameState[threadID] = {
      number: Math.floor(Math.random() * 100) + 1,
      guesses: []
    };
  } else if (guess < game.number) {
    api.sendMessage('🔼 Too low! Try again.', threadID, messageID);
  } else {
    api.sendMessage('🔽 Too high! Try again.', threadID, messageID);
  }
};
