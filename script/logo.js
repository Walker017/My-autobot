const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "logo",
  aliases: ["logo", "texpro"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "logo",
  shortDescription: "Create various logos with text.",
  longDescription: "Generate logos with different styles using provided text.",
  usage: "logo list [page] | logo [logo name] [text]",
  credits: "Metoushela Walker",
  cooldown: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args, prefix }) {
  const { threadID, messageID } = event;

  // Handle the "list" command to show available logo styles
  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    const page = parseInt(args[1], 10);
    let message;

    switch (page) {
      case 1:
        message = `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝒆𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 1:\n\n❍ aglitch ❍ Business ❍ blood\n❍ blackpink ❍ broken ❍ christmas\n❍ captainamerica ❍ carbon ❍ circuit\n❍ choror ❍ devil ❍ dropwater ❍ fire\n❍ glass ❍ greenhorror ❍ imglitch\n❍ layered ❍ light ❍ magma ❍ metallic\n❍ neon ❍ skeleton ❍ sketch ❍ stone ❍ transformers ❍ wall\n\n𝑷𝑨𝑮𝑬 1 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`;
        break;
      case 2:
        message = `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝒆𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 2:\n\n❍ naruto ❍ dragonfire ❍ avatar ❍ pubgavatar ❍ nightstars ❍ sunlight ❍ cloud ❍ pig ❍ caper\n❍ writestatus ❍ horror ❍ teamlogo ❍ queen ❍ beach ❍ fbc3 ❍ tattoo ❍ shirt3 ❍ oceansea ❍ shirt4 ❍ shirt5 ❍ shirt6 ❍ lovemsg ❍ chstm ❍ christmas2 ❍ icetext ❍ butterfly ❍ coffee\n\n𝑷𝑨𝑮𝑬 2 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`;
        break;
      case 3:
        message = `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝒆𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 3:\n\n❍ smoke ❍ more logos coming soon...\n\n𝑷𝑨𝑮𝑬 3 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`;
        break;
      default:
        message = `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid page number! Please use "list 1" or "list 2" or "list 3" to view the available logo lists.\n\n╚════ஜ۩۞۩ஜ═══╝`;
        break;
    }

    return api.sendMessage(message, threadID, messageID);
  }

  // Handle creating the logo
  if (args.length < 2) {
    return api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nInvalid command format! Use: logo list (page number) or logo (logo name) (text)\n\n╚════ஜ۩۞۩ஜ═══╝`, threadID, messageID);
  }

  const type = args[0].toLowerCase();
  const text = args.slice(1).join(" ");
  const pathImg = `${__dirname}/cache/${type}_${text}.png`;
  let apiUrl, message;

  switch (type) {
    case "glass":
      apiUrl = `https://textpro.me/create-glass-text-effect-online-969.html?text=${text}`;
      message = "Here's the [GLASS] Logo created:";
      break;
    case "business":
      apiUrl = `https://textpro.me/create-3d-business-text-effect-online-1070.html?text=${text}`;
      message = "Here's the [BUSINESS] Logo created:";
      break;
    case "wall":
      apiUrl = `https://textpro.me/create-embossed-text-effect-online-1015.html?text=${text}`;
      message = "Here's the [WALL] Logo created:";
      break;
    case "aglitch":
      apiUrl = `https://textpro.me/create-a-glitch-text-effect-online-free-1026.html?text=${text}&text2=${text}`;
      message = "Here's the [AGLITCH] Logo created:";
      break;
    case "berry":
      apiUrl = `https://textpro.me/create-berry-text-effect-online-971.html?text=${text}`;
      message = "Here's the [BERRY] Logo created:";
      break;
    case "blackpink":
      apiUrl = `https://textpro.me/create-blackpink-logo-style-online-982.html?text=${text}`;
      message = "Here's the [BLACKPINK] Logo created:";
      break;
    case "blood":
      apiUrl = `https://textpro.me/horror-blood-text-effect-online-883.html?text=${text}`;
      message = "Here's the [BLOOD] Logo created:";
      break;
    case "broken":
      apiUrl = `https://textpro.me/broken-glass-text-effect-free-online-1023.html?text=${text}`;
      message = "Here's the [BROKEN] Logo created:";
      break;
    case "smoke":
      apiUrl = `https://textpro.me/create-a-smoke-text-effect-online-free-1031.html?text=${text}`;
      message = "Here's the [SMOKE] Logo created:";
      break;
    case "captainamerica":
      apiUrl = `https://textpro.me/captain-america-text-logo-maker-online-1035.html?text=${text}&text2=${text}`;
      message = "Here's the [CAPTAINAMERICA] Logo created:";
      break;
    case "carbon":
      apiUrl = `https://textpro.me/create-carbon-text-effect-online-free-1042.html?text=${text}`;
      message = "Here's the [CARBON] Logo created:";
      break;
    case "choror":
      apiUrl = `https://textpro.me/choror-text-effect-online-993.html?text=${text}&text2=${text}`;
      message = "Here's the [CHOROR] Logo created:";
      break;
    case "christmas":
      apiUrl = `https://textpro.me/create-a-christmas-holiday-text-effect-online-free-1055.html?text=${text}`;
      message = "Here's the [CHRISTMAS] Logo created:";
      break;
    case "circuit":
      apiUrl = `https://textpro.me/create-circuit-board-text-effect-online-1049.html?text=${text}`;
      message = "Here's the [CIRCUIT] Logo created:";
      break;
    case "devil":
      apiUrl = `https://textpro.me/create-devil-wings-text-effect-online-free-1075.html?text=${text}`;
      message = "Here's the [DEVIL] Logo created:";
      break;
    case "discovery":
      apiUrl = `https://textpro.me/create-discovery-text-effect-online-free-1052.html?text=${text}`;
      message = "Here's the [DISCOVERY] Logo created:";
      break;
    case "dropwater":
      apiUrl = `https://textpro.me/create-dropwater-text-effect-free-online-1020.html?text=${text}`;
      message = "Here's the [DROPWATER] Logo created:";
      break;
    case "fiction":
      apiUrl = `https://textpro.me/create-fiction-text-effect-online-free-1041.html?text=${text}`;
      message = "Here's the [FICTION] Logo created:";
      break;
    case "firework":
      apiUrl = `https://textpro.me/create-firework-text-effect-online-free-1069.html?text=${text}`;
      message = "Here's the [FIREWORK] Logo created:";
      break;
    case "galaxy":
      apiUrl = `https://textpro.me/create-galaxy-style-free-text-effect-online-1044.html?text=${text}`;
      message = "Here's the [GALAXY] Logo created:";
      break;
    case "glass3d":
      apiUrl = `https://textpro.me/create-glass-3d-text-effect-online-1056.html?text=${text}`;
      message = "Here's the [GLASS3D] Logo created:";
      break;
    case "greenhorror":
      apiUrl = `https://textpro.me/create-greenhorror-text-effect-online-1024.html?text=${text}`;
      message = "Here's the [GREENHORROR] Logo created:";
      break;
    case "imglitch":
      apiUrl = `https://textpro.me/create-imglitch-text-effect-online-1062.html?text=${text}`;
      message = "Here's the [IMGLITCH] Logo created:";
      break;
    case "layered":
      apiUrl = `https://textpro.me/create-layered-text-effect-online-free-1072.html?text=${text}`;
      message = "Here's the [LAYERED] Logo created:";
      break;
    case "light":
      apiUrl = `https://textpro.me/create-light-text-effect-online-1008.html?text=${text}`;
      message = "Here's the [LIGHT] Logo created:";
      break;
    case "magma":
      apiUrl = `https://textpro.me/create-magma-text-effect-online-1079.html?text=${text}`;
      message = "Here's the [MAGMA] Logo created:";
      break;
    case "metallic":
      apiUrl = `https://textpro.me/create-metallic-text-effect-online-free-1010.html?text=${text}`;
      message = "Here's the [METALLIC] Logo created:";
      break;
    case "neon":
      apiUrl = `https://textpro.me/create-neon-text-effect-online-free-1030.html?text=${text}`;
      message = "Here's the [NEON] Logo created:";
      break;
    case "skeleton":
      apiUrl = `https://textpro.me/create-skeleton-text-effect-online-1009.html?text=${text}`;
      message = "Here's the [SKELETON] Logo created:";
      break;
    case "sketch":
      apiUrl = `https://textpro.me/create-sketch-text-effect-online-free-1007.html?text=${text}`;
      message = "Here's the [SKETCH] Logo created:";
      break;
    case "stone":
      apiUrl = `https://textpro.me/create-stone-text-effect-online-1064.html?text=${text}`;
      message = "Here's the [STONE] Logo created:";
      break;
    case "transformers":
      apiUrl = `https://textpro.me/create-transformers-text-effect-online-free-1071.html?text=${text}`;
      message = "Here's the [TRANSFORMERS] Logo created:";
      break;
    default:
      return api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nUnknown logo type! Please use "list" to view available logos.\n\n╚════ஜ۩۞۩ஜ═══╝`, threadID, messageID);
  }

  try {
    const response = await axios({
      method: 'GET',
      url: apiUrl,
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(pathImg))
      .on('finish', () => {
        api.sendMessage({ body: message, attachment: fs.createReadStream(pathImg) }, threadID, () => {
          fs.unlinkSync(pathImg);
        }, messageID);
      });
  } catch (error) {
    api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nFailed to create logo! Please try again.\n\n╚════ஜ۩۞۩ஜ═══╝`, threadID, messageID);
  }
};
