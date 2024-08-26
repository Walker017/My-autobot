const axios = require('axios');
const { exec } = require('child_process');

module.exports.config = {
  name: 'pkgcompile',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['compilepkg', 'buildpkg'],
  description: 'Compiles Termux packages and displays their status.',
  usage: 'Pkgcompile [package]',
  credits: 'Metoushela',
  cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
  const packageName = args.join(' ');
  if (!packageName) {
    return api.sendMessage('🔧 Please provide the name of the Termux package you want to compile.', event.threadID, event.messageID);
  }

  try {
    const compileCommand = `pkg build ${packageName}`;
    exec(compileCommand, (error, stdout, stderr) => {
      if (error) {
        return api.sendMessage(`❌ Error compiling the package:\n\n${stderr}`, event.threadID, event.messageID);
      }

      api.sendMessage(`✅ Compilation status for package "${packageName}":\n\n${stdout}`, event.threadID, event.messageID);
    });
  } catch (error) {
    api.sendMessage('❌ Error: Unable to compile the package. Please try again later.', event.threadID, event.messageID);
    console.error('Error in the pkgcompile command:', error);
  }
};
