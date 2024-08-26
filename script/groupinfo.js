const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "groupinfo",
  aliases: ["boxinfo"],
  version: "1.0",
  role: 0,
  hasPrefix: false,
  description: "View detailed information about the current group chat.",
  usage: "groupinfo",
  credits: "Metoushela walker",
  cooldown: 5,
};

module.exports.run = async function({ api, event }) {
  let threadInfo = await api.getThreadInfo(event.threadID);
  const memLength = threadInfo.participantIDs.length;
  const threadMem = threadInfo.participantIDs.length;

  let gendernam = [];
  let gendernu = [];
  let nope = [];

  for (let userInfo of threadInfo.userInfo) {
    const gender = userInfo.gender;
    const name = userInfo.name;
    if (gender === "MALE") {
      gendernam.push(name);
    } else if (gender === "FEMALE") {
      gendernu.push(name);
    } else {
      nope.push(name);
    }
  }

  const nam = gendernam.length;
  const nu = gendernu.length;

  let listad = '';
  const adminIDs = threadInfo.adminIDs;
  const qtv = adminIDs.length;
  const sl = threadInfo.messageCount;
  const icon = threadInfo.emoji;
  const threadName = threadInfo.threadName;
  const id = threadInfo.threadID;

  for (let admin of adminIDs) {
    const userInfo = await api.getUserInfo(admin.id);
    const name = userInfo[admin.id].name;
    listad += `• ${name}\n`;
  }

  const approvalMode = threadInfo.approvalMode;
  const approvalStatus = approvalMode ? 'Turned on' : 'Turned off';

  const callback = () => {
    api.sendMessage({
      body: `🔧「 𝐆𝐂 𝐍𝐚𝐦𝐞 」: ${threadName}\n🔧「 𝐆𝐫𝐨𝐮𝐩 𝐈𝐃 」: ${id}\n🔧「 𝐀𝐩𝐩𝐫𝐨𝐯𝐚𝐥 」: ${approvalStatus}\n🔧「 𝐄𝐦𝐨𝐣𝐢 」: ${icon}\n🔧「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 」: Including ${threadMem} members\n🔧「 𝐍𝐮𝐦𝐛𝐞𝐫 𝐎𝐟 𝐌𝐚𝐥𝐞𝐬 」: ${nam}\n🔧「 𝐍𝐮𝐦𝐛𝐞𝐫 𝐎𝐟 𝐅𝐞𝐦𝐚𝐥𝐞𝐬 」: ${nu}\n🔧「 𝐓𝐨𝐭𝐚𝐥 𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫𝐬 」: ${qtv}\n「 𝐈𝐧𝐜𝐥𝐮𝐝𝐞 」:\n${listad}\n🔧「 𝐓𝐨𝐭𝐚𝐥 𝐍𝐮𝐦𝐛𝐞𝐫 𝐎𝐟 𝐌𝐞𝐬𝐬𝐚𝐠𝐞𝐬 」: ${sl} msgs.\n\n𝐌𝐚𝐝𝐞 𝐖𝐢𝐭𝐡 ❤️ 𝐁𝐲: Metoushela`,
      attachment: fs.createReadStream(__dirname + '/cache/1.png')
    }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/1.png'), event.messageID);
  };

  return request(encodeURI(threadInfo.imageSrc))
    .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
    .on('close', () => callback());
};
