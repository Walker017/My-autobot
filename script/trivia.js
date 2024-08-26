const axios = require('axios');

module.exports.config = {
  name: "trivia",
  aliases: ["quiz", "question"],
  version: "1.0",
  author: "Metoushela Walker",
  role: 0,
  category: "fun",
  shortDescription: "Asks a trivia question with multiple choice answers.",
  longDescription: "This command fetches a trivia question with multiple choice answers using the Open Trivia Database API.",
  usage: "trivia",
  credits: "Metoushela Walker",
  cooldown: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    // Fetch a trivia question from the Open Trivia Database API
    const { data } = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 1,
        type: 'multiple',
      },
    });

    const questionData = data.results[0];
    const question = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5); // Shuffle answers

    // Format the question and answers
    let answersMessage = '';
    allAnswers.forEach((answer, index) => {
      answersMessage += `\n${index + 1}. ${answer}`;
    });

    const message = `🧠 **Trivia Question**\n\n${question}\n\nChoose the correct answer by typing the number of the answer:\n${answersMessage}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Sorry, an error occurred while fetching the trivia question. Please try again later.', event.threadID, event.messageID);
  }
};
