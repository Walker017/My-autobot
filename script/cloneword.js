module.exports.config = {
  name: "cloneword",
  version: "1.0",
  role: 0,
  hasPrefix: true,
  aliases: ["clone", "repeat"],
  description: "Clone a word or phrase a specified number of times.",
  usage: "cloneword [word or phrase] [number]",
  credits: "Metoushela Walker",
  category: "utility",
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  // Vérifie si l'utilisateur a fourni les arguments nécessaires
  if (args.length < 2) {
    return api.sendMessage("❌ Please provide both a word or phrase to clone and the number of times to clone it.", event.threadID, event.messageID);
  }

  // Sépare les arguments
  const textToClone = args.slice(0, -1).join(" "); // Tout sauf le dernier argument
  const repeatCount = parseInt(args[args.length - 1], 10); // Le dernier argument

  // Valide le nombre de répétitions
  if (isNaN(repeatCount) || repeatCount < 1 || repeatCount > 100) {
    return api.sendMessage("❌ Please provide a valid number between 1 and 100 for the number of times to clone.", event.threadID, event.messageID);
  }

  // Clone le mot ou la phrase
  const clonedText = (textToClone + " ").repeat(repeatCount).trim();

  // Envoie le message cloné
  api.sendMessage(`🔁 Here is your cloned text:\n\n${clonedText}`, event.threadID, event.messageID);
};
