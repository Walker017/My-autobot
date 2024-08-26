const axios = require('axios');

async function gpt4(prompt, customId, link) {
    try {
        const endpoint = prompt.toLowerCase() === 'clear' ? '/clear' : '/chat';
        const data = prompt.toLowerCase() === 'clear' 
            ? { id: customId } 
            : { prompt, customId, ...(link && { link }) };
        const res = await axios.post(`https://cadis.onrender.com${endpoint}`, data);
        return res.data.message;
    } catch (error) {
        return error.message;
    }
}

module.exports.config = {
    name: 'gpt4',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ["Gpt4"],
    description: "Interact with GPT-4 AI",
    usage: "gpt4 [prompt]",
    credits: 'Metoushela walker',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const input = args.join(' ');
    const { senderID: userId, messageReply } = event;
    
    // Determine if the message is a reply with an attachment
    const link = messageReply?.attachments?.[0]?.type === 'photo' ? messageReply.attachments[0].url : null;
    
    // Call the GPT-4 API
    const response = await gpt4(input || 'hello', userId, link);
    
    // Send the response back
    api.sendMessage(response, event.threadID, event.messageID);
};