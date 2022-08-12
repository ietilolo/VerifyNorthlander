// get containers
let image = document.querySelector("#quizImg");
let option1 = document.querySelector("#quizAnswer1");
let option2 = document.querySelector("#quizAnswer2");
let option3 = document.querySelector("#quizAnswer3");
let timerContainer = document.querySelector("#timer");

// total failed attempts
let failedAttempts = 0;

// Questions objects
const questionsDB = [
  {
    id: 1,
    image: "./img/quizImg2.jpg",
    options: [
      "Kerikeri",
      "Paihia",
      "Opua"
    ],
    answer: "Paihia"
  },
  {
    id: 2,
    image: "./img/quizImg1.jpg",
    options: [
      "Whangarei",
      "Kerikeri",
      "Kawakawa"
    ],
    answer: "Kawakawa"
  },
  {
    id: 3,
    image: "./img/quizImg3.jpg",
    options: [
      "Waitangi",
      "Opononi",
      "Kaitaia"
    ],
    answer: "Waitangi"
  },
  {
    id: 4,
    image: "./img/quizImg4.jpg",
    options: [
      "Paihia",
      "Mitimiti",
      "Moerewa"
    ],
    answer: "Moerewa"
  }
];

let userLevel = parseInt(window.prompt("Before we begin, Type the number corresponding to the diffculty level then press enter: (1) Easy, (2) Medium, (3) Hard"));

function askQuestion(question)
{
  return new Promise((resolved, rejected) => {

    // count fails for current question & start timer
    let currentAttempts = 0;
    let time = userLevel == 1 ? 20 : userLevel == 2 ? 15 : userLevel == 3 ? 10 : 10;
    let timer = time * 1000;

    // start timer
    timerContainer.innerHTML = time;
    let timerId = setInterval(() => {
      time--;
      timerContainer.innerHTML = time;
      if (time <= 0) {
        clearInterval(timerId);
        failedAttempts++;
        resolved();
      }
    }, 1000);

    // Set variables to question values
    image.src = question.image;
    option1.innerHTML = question.options[0];
    option2.innerHTML = question.options[1];
    option3.innerHTML = question.options[2];
    timerContainer.innerHTML = time;

    document.querySelectorAll(".quizBtn").forEach(e => {
      e.addEventListener("click", e => {
        if (e.target.innerHTML === question.answer)
        {
          console.log("Correct!");
          resolved();
        }
      });
    });

  });
}

askQuestion(questionsDB[0])
  .then(() => {
    return askQuestion(questionsDB[1]);
  }).then(() => {
    return askQuestion(questionsDB[2]);
  }).then(() => {
    return askQuestion(questionsDB[3]);
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    alert("Quiz completed!");
    alert(`Failed attempts: ${failedAttempts}`);
    location.reload();
  });