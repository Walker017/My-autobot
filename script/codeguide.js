module.exports.config = {
  name: 'codeguide',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['CODEGUIDE', 'CodeGuide'],
  description: "Provides coding guidance and resources",
  usage: "CodeGuide [topic]",
  credits: 'Metoushela',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const topic = args.join(' ').toLowerCase();

  if (!topic) {
    api.sendMessage('💡 Please specify a coding topic or question you need help with.', event.threadID, event.messageID);
    return;
  }

  const codingGuides = {
    'javascript': `📚 **JavaScript Basics**:
JavaScript is a versatile programming language commonly used in web development. 
- 📖 *Start learning*: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- 📘 *Free online book*: https://eloquentjavascript.net/
- 💻 *Practice*: Try solving problems on [LeetCode](https://leetcode.com/) or [Codewars](https://www.codewars.com/).`,

    'python': `🐍 **Python Fundamentals**:
Python is known for its simplicity and readability, making it a great choice for beginners.
- 📖 *Start learning*: https://docs.python.org/3/tutorial/
- 📘 *Interactive tutorials*: https://www.learnpython.org/
- 💻 *Practice*: Solve problems on [HackerRank](https://www.hackerrank.com/domains/tutorials/10-days-of-python) or [LeetCode](https://leetcode.com/).`,

    'html': `🌐 **HTML Basics**:
HTML is the standard language for creating web pages.
- 📖 *Start learning*: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
- 📘 *Cheat sheet*: https://htmlcheatsheet.com/
- 💻 *Practice*: Build simple projects on [CodePen](https://codepen.io/) or [JSFiddle](https://jsfiddle.net/).`,

    'css': `🎨 **CSS Fundamentals**:
CSS is used to style and layout web pages.
- 📖 *Start learning*: https://developer.mozilla.org/en-US/docs/Web/CSS
- 📘 *Free CSS Guide*: https://css-tricks.com/
- 💻 *Practice*: Try replicating designs on [CodePen](https://codepen.io/) or [CSSBattle](https://cssbattle.dev/).`,

    'nodejs': `🚀 **Node.js Introduction**:
Node.js is a JavaScript runtime built on Chrome's V8 engine, used for building fast and scalable network applications.
- 📖 *Start learning*: https://nodejs.org/en/docs/guides/getting-started-guide/
- 📘 *Interactive courses*: https://nodeschool.io/
- 💻 *Practice*: Build a simple web server or explore APIs with [Express.js](https://expressjs.com/).`,
    
    'git': `🔄 **Git Version Control**:
Git is a distributed version control system to track changes in source code.
- 📖 *Start learning*: https://git-scm.com/book/en/v2
- 📘 *Interactive tutorial*: https://learngitbranching.js.org/
- 💻 *Practice*: Create your own repository on [GitHub](https://github.com/) or [GitLab](https://gitlab.com/).`
  };

  const guide = codingGuides[topic] || `❓ Sorry, I don't have a guide for "${topic}". Try asking about JavaScript, Python, HTML, CSS, Node.js, or Git.`;

  api.sendMessage(guide, event.threadID, event.messageID);
};
