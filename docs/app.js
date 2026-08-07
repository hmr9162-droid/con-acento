//conacento app.js

const letters = [
  "á", "é", "í", "ó", "ú",
  "ñ", "ü", "å", "ø", "ö",
  "ê", "¡", "¿", "ç"
];

const items = document.querySelectorAll("li");

let score = 0;
let timeLeft = 120;
let timer;
let gameStarted = false;

let player = {
  name: "",
  institution: "",
  initials: ""
};

function randomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function loadLetters() {
  items.forEach(item => {
    item.textContent = randomLetter();
  });
}

loadLetters();


// Start game button
document.getElementById("startButton").addEventListener("click", () => {

  player.name = document.getElementById("playerName").value;
  player.institution = document.getElementById("institution").value;
  player.initials = document.getElementById("initials").value
    .toUpperCase()
    .substring(0,3);

  if (!player.initials) {
    alert("Enter initials before starting");
    return;
  }

  startSequence();
});


function startSequence() {

  document.getElementById("message").textContent = "¡Dos minutos!";

  setTimeout(() => {
    document.getElementById("message").textContent = "Start!";
    beginGame();
  }, 2000);

}


function beginGame() {

  score = 0;
  timeLeft = 120;
  gameStarted = true;

  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = "2:00";

  timer = setInterval(updateTimer,1000);

  loadLetters();
}


function updateTimer() {

  timeLeft--;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timer").textContent =
    `${minutes}:${seconds.toString().padStart(2,"0")}`;


  if (timeLeft <= 0) {
    endGame();
  }
}


// Keyboard scoring
document.addEventListener("keydown", (event) => {

  if (!gameStarted) return;

  const key = event.key;

  items.forEach(item => {

    if (item.textContent === key) {

      score++;

      document.getElementById("score").textContent = score;

      item.textContent = randomLetter();
    }

  });

});


// End game
function endGame() {

  clearInterval(timer);

  gameStarted = false;

  document.getElementById("message").textContent =
    "Finish! Good job!";

  saveScore();

  displayScores();

}



// Save high score
function saveScore() {

  let scores =
    JSON.parse(localStorage.getItem("highScores")) || [];


  scores.push({
    initials: player.initials,
    name: player.name,
    institution: player.institution,
    score: score
  });


  scores.sort((a,b)=> b.score - a.score);


  scores = scores.slice(0,10);


  localStorage.setItem(
    "highScores",
    JSON.stringify(scores)
  );

}



// Display scoreboard
function displayScores() {

  const board =
    document.getElementById("scoreBoard");

  board.innerHTML = "";

  let scores =
    JSON.parse(localStorage.getItem("highScores")) || [];


  scores.forEach((player,index)=>{

    board.innerHTML += `
      <tr>
        <td>${index+1}</td>
        <td>${player.initials}</td>
        <td>${player.score}</td>
        <td>${player.institution}</td>
      </tr>
    `;

  });

}

displayScores();
