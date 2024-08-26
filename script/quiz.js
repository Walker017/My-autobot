const axios = require('axios');

module.exports.config = {
  name: 'quiz',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['QUIZ', 'Quiz'],
  description: "Provides programming quizzes using an external API",
  usage: "Quiz",
  credits: 'Metoushela',
  cooldown: 3,
};

module.exports.run = async function({ api, event }) {
  try {
    // Fetch a quiz question from an external API
    const { data } = await axios.get('https://opentdb.com/api.php?amount=1&category=18&type=multiple');
    const questionData = data.results[0];

    // Format the question and options
    const question = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;
    const options = [...incorrectAnswers, correctAnswer].sort(() => 0.5 - Math.random());

    let message = `🧠 **Programming Quiz**:\n\n`;
    message += `❓ **Question**: ${question}\n`;
    options.forEach((option, index) => {
      message += `🔸 **${index + 1}.** ${option}\n`;
    });

    message += `\n💡 **Reply with the correct option number** to answer!`;

    api.sendMessage(message, event.threadID, (err, info) => {
      if (err) return console.error(err);

      // Listen for the user's reply to check the answer
      const responseListener = function(reply) {
        const userAnswer = parseInt(reply.body, 10);

        if (userAnswer > 0 && userAnswer <= options.length) {
          const selectedOption = options[userAnswer - 1];
          const resultMessage = selectedOption === correctAnswer 
            ? `🎉 Correct! The answer is **${correctAnswer}**.` 
            : `😞 Incorrect. The correct answer was **${correctAnswer}**.`;

          api.sendMessage(resultMessage, reply.threadID, reply.messageID);
        } else {
          api.sendMessage('😕 Please respond with a valid option number.', reply.threadID, reply.messageID);
        }

        api.removeMessageListener(responseListener);
      };

      // Add a listener to handle the user's reply
      api.listenMqtt(responseListener);
    });

  } catch (error) {
    api.sendMessage('😕 Oops, something went wrong while fetching the quiz. Please try again later.', event.threadID, event.messageID);
    console.error(error);
  }
};
