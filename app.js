const playBtn = document.querySelector(".playBtn"),
  playerInput = document.querySelector(".playerInput"),
  playerName = document.querySelector(".playerName"),
  container = document.querySelector(".container"),
  welcomePage = document.querySelector(".welcomePage"),
  dificultyMenu = document.querySelector(".dificultyMenu"),
  diffStages = document.querySelectorAll(".diffStages"),
  cardStacks = document.querySelectorAll(".cardStacks"),
  backs = document.querySelectorAll(".back"),
  faces = document.querySelectorAll("#face"),
  playerNameMenu = document.querySelector(".playerNameMenu"),
  startBtn = document.querySelector(".startBtn"),
  easyBtn = document.querySelector(".easyBtn"),
  meduimBtn = document.querySelector(".meduimBtn"),
  hardBtn = document.querySelector(".hardBtn"),
  playerLivesCount = document.querySelector(".playerLivesCount"),
  gameWon = document.querySelector(".gameWon"),
  clickMe = document.querySelector(".clickMe"),
  clickFip = document.querySelector(".clickFip"),
  startMenu = document.querySelector(".startMenu"),
  playerScore = document.querySelector(".playerScore"),
  gwHeader = document.querySelector(".gwHeader"),
  replayBtn = document.querySelector(".replayBtn"),
  restart = document.querySelector(".restart"),
  form = document.querySelector("form");

clickFip.addEventListener("click", () => {
  clickMe.classList.add("flipMe");
  welcomePage.classList.add("showFlipped");
});

playBtn.addEventListener("click", (e) => {
  e.preventDefault(e);
  welcomePage.style.display = "none";
  dificultyMenu.style.display = "grid";
  startMenu.style.display = "none";
});

function chooseDiff() {
  playerNameMenu.style.display = "grid";
  dificultyMenu.style.display = "none";
  playerInput.focus();
}

easyBtn.addEventListener("click", () => {
  chooseDiff();
  playerLivesCount.textContent = "20";
});
meduimBtn.addEventListener("click", () => {
  chooseDiff();
  playerLivesCount.textContent = "18";
});
hardBtn.addEventListener("click", () => {
  chooseDiff();
  playerLivesCount.textContent = "12";
});

playerInput.addEventListener("keyup", (e) => {
  if (e.target.value.trim().length > 2) {
    startBtn.removeAttribute("disabled");
    startBtn.style.cursor = "pointer";
  } else {
    startBtn.setAttribute("disabled", "true");
    startBtn.style.cursor = "initial";
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    container.style.display = "grid";
    playerNameMenu.style.display = "none";

    playerName.textContent = playerInput.value;
    appearRandom();
  });
});

function appearRandom() {
  const cardShapes = [
    "cross",
    "circle",
    "block",
    "check",
    "cross",
    "circle",
    "block",
    "check",
    "cross",
    "circle",
    "block",
    "check",
    "cross",
    "circle",
    "block",
    "check",
  ];

  const sortedShape = cardShapes.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });

  faces.forEach((face, index) => {
    face.className = sortedShape[index];
  });
}

// FLIP CARD
cardStacks.forEach((cardStack) => {
  cardStack.addEventListener("click", (e) => {
    e.target.classList.add("flipMe");
    e.target.previousElementSibling.classList.add("showFlipped");
    e.target.previousElementSibling.classList.add("cardClicked");
    let cardClicked = document.querySelectorAll(".cardClicked");
    if (cardClicked.length == 2) {
      playerLivesCount.textContent =
        parseFloat(playerLivesCount.textContent) - 1;
      playerScore.textContent = parseFloat(playerScore.textContent) - 2;
      if (cardClicked[0].className == cardClicked[1].className) {
        cardClicked.forEach((cardClicke) => {
          cardClicke.parentElement.classList.add("disappear");
          cardClicke.classList.remove("cardClicked");
        });
      } else if (cardClicked[0].className != cardClicked[1].className) {
        cardClicked.forEach((cardClicke) => {
          cardClicke.classList.remove("cardClicked");
          setTimeout(flipCardBack, 800);
          function flipCardBack() {
            cardClicke.nextElementSibling.classList.remove("flipMe");
            cardClicke.classList.remove("showFlipped");
          }
        });
      }
    }

    //check for win
    let disappears = document.querySelectorAll(".disappear");
    function delayPopUp() {
      gameWon.style.display = "grid";
    }
    if (disappears.length === 16) {
      setTimeout(delayPopUp, 800);
    } else if (playerLivesCount.textContent == 0 && disappears.length < 16) {
      container.classList.add("disableGameArena");
      setTimeout(delayPopUp, 800);
      gwHeader.textContent = "GAME OVER!!!";
    }
  });
});

//restart game

function restartGame() {
  dificultyMenu.style.display = "grid";
  container.style.display = "none";

  playerScore.textContent = "53";
  setTimeout(appearRandom, 800);
  container.classList.remove("disableGameArena");

  cardStacks.forEach((cardStack) => {
    cardStack.classList.remove("disappear");
  });

  faces.forEach((face) => {
    face.nextElementSibling.classList.remove("flipMe");
  });
}

restart.addEventListener("click", ()=> {
  restartGame();
})
replayBtn.addEventListener("click", () => {
  
  gameWon.style.display = "none";

  restartGame();
  
});
