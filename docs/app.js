//conacento app.js

const letters = [ "á", "é", "í", "ó", "ú", "ñ", "ü", "ö", "å", "ø", "ö", "ê", "¡", "¿", "ç" ];

const items = document.querySelectorAll("li");

let points = 0;
let timeLeft = 60;
let timer = null;
let gameStarted = false;
let gameStarting = false;

// player information input

let player = {
  nombre: "",
  institución: "",
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


// press any key to start the game 

document.addEventListener("keydown", (event) => {

    if (gameStarted) return;

    player.name = document.getElementById("name").value;

    player.institución = document
        .getElementById("institution")
        .value
        .toUpperCase()
        .substring(0, 3);

    if (!player.name) {
        document.getElementById("message").textContent =
            "escribe tu nombre primero";
        return;
    }

    startSequence();
});


function startSequence() {

  document.getElementById("message").textContent = "tienes un minuto";

  setTimeout(() => {
    document.getElementById("message").textContent = "comenza";
    beginGame();
  }, 2000);

}


function beginGame() {

  score = 0;
  timeLeft = 60;
  gameStarted = true;

  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = "1:00";

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

      document.getElementById("points").textContent = points;

      item.textContent = randomLetter();
    }

  });

});


// End game
function endGame() {

  clearInterval(timer);

  gameStarted = false;

  document.getElementById("message").textContent =
    "¡Buena!";

  saveScore();

  displayScores();

}


// la lista de puntuación altas o "maximos"

function saveScore() {

  let points =
    JSON.parse(localStorage.getItem("highScore")) || [];


  points.push({
    name: player.name,
    institution: player.institution,
    score: points
  });


  points.sort((a,b)=> b.score - a.score);


  points = points.slice(0,20);


  localStorage.setItem(
    "highScore",
    JSON.stringify(points)
  );

}



// Display scoreboard
function displayScores() {

  const board =
    document.getElementById("scoreBoard");

  board.innerHTML = "";

  let points =
    JSON.parse(localStorage.getItem("highScore")) || [];


  scores.forEach((player,index)=>{

    board.innerHTML += 
      <tr>
        <td>${index+1}</td>
        <td>${player.points}</td>
        <td>${player.institution}</td>
      </tr>
    ;

  });

}

displayPoints();
