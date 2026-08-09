//conacento app.js

const letters = [
  "á", "é", "í", "ó", "ú",
  "ñ", "ü", "å", "ø", "ö",
  "ê", "¡", "¿", "ç", "¡",
];

const items = document.querySelectorAll("li");

let points = 0;
let timeLeft = 60;
let timer;
let gameStarted = false;

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


// play button 
document.getElementById("startButton").addEventListener("click", () => {

  player.name = document.getElementById("nombre").value;
  player.institution = document.getElementById("institución").value
    .toUpperCase()
    .substring(0,3);

  if (!player.name) {
    alert("escrive tú nombre aquí your name for the leader board before starting")
    return;
  }

  startSequence();
});


function startSequence() {

  document.getElementById("message").textContent = "tienes un minuto";

  setTimeout(() => {
    document.getElementById("message").textContent = "comenzar";
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

  let minutes = Math.floor(timeLeft / 30);
  let seconds = timeLeft % 30;

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

      document.getElementById("puntos").textContent = puntos;

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

function savePuntos() {

  let puntos =
    JSON.parse(localStorage.getItem("highPuntos")) || [];


  puntos.push({
    name: player.nombre,
    institution: player.institution,
    score: puntos
  });


  puntos.sort((a,b)=> b.score - a.score);


  puntos = puntos.slice(0,20);


  localStorage.setItem(
    "highPuntos",
    JSON.stringify(puntos)
  );

}



// Display scoreboard
function displayScores() {

  const board =
    document.getElementById("scoreBoard");

  board.innerHTML = "";

  let puntos =
    JSON.parse(localStorage.getItem("highScores")) || [];


  scores.forEach((player,index)=>{

    board.innerHTML += `
      <tr>
        <td>${index+1}</td>
        <td>${player.puntos}</td>
        <td>${player.institución}</td>
      </tr>
    `;

  });

}

displayPuntos();
