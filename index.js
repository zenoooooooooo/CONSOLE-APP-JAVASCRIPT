const readline = require("readline");

let name = "";
let rounds = 0;
let score = 0;

const questionAndAnswers = {
  "What is the capital of Canada?": "Ottawa",
  "How many continents are there in the world?": "7",
  "What is the largest mammal on Earth?": "Blue Whale",
  "Who wrote 'Harry Potter and the Philosopher's Stone'?": "J.K. Rowling",
  "What is the currency of Japan?": "Yen",
  "In which year did the Titanic sink?": "1912",
  "What is the chemical symbol for gold?": "Au",
  "Which planet is known as the 'Red Planet'?": "Mars",
  "What is the square root of 144?": "12",
  "Who is known as the 'Father of Computer Science'?": "Alan Turing",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function welcomeUser() {
  name = await askQuestion("Enter your name...\n");
  console.log(`Welcome ${name}!\n`);

  while (true) {
      rounds = await askQuestion("How many rounds would you like to play?\n");
      if (rounds > 0) {
        break;
      } else {
        console.log("Please enter a valid positive number.\n");
      }
  }
}

async function generateQuestions() {
  const questions = Object.keys(questionAndAnswers);
  let randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  const answer = await askQuestion(`\n${question}\nYour answer: `);
  const correctAnswer = questionAndAnswers[question];

  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
  } else {
    console.log("\nIncorrect. Correct Answer: " + correctAnswer);
  }
}

async function runQuiz() {
  await welcomeUser();
  for (let i = 1; i <= rounds; i++) {
    await generateQuestions();
  }
  console.log(
    `\nThanks for playing, ${name}! Your final score is ${score}/${rounds}`
  );
}

runQuiz();
