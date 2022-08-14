// get containers
let image = document.querySelector("#quizImg");
let option1 = document.querySelector("#quizAnswer1");
let option2 = document.querySelector("#quizAnswer2");
let option3 = document.querySelector("#quizAnswer3");
let modal = document.querySelector("#modal-1");
let failedAttempts = 0; // Track total failed attempts
let userLevel; // Holds difficulty level
let time; // How much time allocated depending on userLevel
let timer; // setInterval id
let timerContainer = document.querySelector("#timer");
let currQuestionIndex = 0; // Keep track of question


// Show Modal
modal.classList.add("show");

// let user choose difficulty
const levelBtns = modal.querySelectorAll(".chooseLevelBtn");
levelBtns.forEach(button => {
  button.onclick = e => {
    userLevel = parseInt(e.target.dataset.level);
  }
});

// Listen for game start
modal.querySelector("#modalStartBtn").onclick = () => {
  modal.classList.remove("show"); // Hide Modal
  askQuestion();
}

function askQuestion(){

  // --------------
  // PRECHECKS
  // --------------
  if (currQuestionIndex >= questionsDB.length) {
    alert(`You got ${questionsDB.length - failedAttempts} \\ ${questionsDB.length}`);
    location.reload();
  } // Check if no more questions then reset game
  let question = questionsDB[currQuestionIndex]; // Show question
  
  // --------------
  // SETUP DOME
  // --------------
  image.src = question.image; // Set DOM with question
  option1.innerHTML = question.options[0];
  option2.innerHTML = question.options[1];
  option3.innerHTML = question.options[2];

  // --------------
  // SETUP TIMER
  // --------------
  time = userLevel === 1 ? 20 : userLevel === 2 ? 15 : userLevel === 3 ? 10 : 10; // Start timer
  timerContainer.innerHTML = time;
  timer = setInterval(() => {
    time--;
    timerContainer.innerHTML = time; // set DOM timer to time
    if (time <= 0) {
      timerContainer.innerHTML = "00:00"; // Reset DOMtimer
      clearInterval(timer) // Clear timer
      failedAttempts++; // Add 1 to failedAttempts
      currQuestionIndex++; // Increase current question by 1
      askQuestion();
    }
  }, 1000);

  // --------------
  // LISTEN CLICK ANSWER
  // --------------
  document.querySelectorAll(".quizBtn").forEach(button => {
    button.onclick = e => {
      if (e.target.innerHTML === question.answer){ // If right, reset time / clearInterval / currQuestionIndex++ / askQuestion
        time = 0;
        clearInterval(timer);
        currQuestionIndex++;
        askQuestion();
      } else {
        time = 0;
        clearInterval(timer);
        currQuestionIndex++;
        failedAttempts++;
        askQuestion();
      }
    }
  });

}