const state = {
  wins: 0,
  losses: 0,
};

const btnSelection = document.querySelectorAll("button[class=button]");
const btnReset = document.querySelector("button.resetButton");
const winStatement = document.querySelector("div.winStatement");
const winsPlaceHolder = document.querySelector("span.wins>span");
const lossesPlaceHolder = document.querySelector("span.losses>span");

btnSelection.forEach((element) => {
  element.addEventListener("click", playRoundHandler);
});

btnReset.addEventListener("click", resetScore);

function computerPlay() {
  let rand = Math.floor((Math.random() * 101) % 3);
  switch (rand) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function playerPlay(playerSel) {
  playerSel = playerSel.toLocaleUpperCase();
  let inputValid = ["ROCK", "PAPER", "SCISSORS"].includes(playerSel);
  if (!inputValid) {
    console.log("Invalid value passed to playerPlay function in rps.js");
    return;
  }
  return playerSel;
}

function determineWinner(computerSelection, playerSelection) {
  let [cSel, pSel] = [computerSelection, playerSelection];
  let result;
  let message;

  let cpuSelNum =
    cSel === "ROCK" && pSel !== "ROCK"
      ? 0
      : cSel === "PAPER" && pSel !== "PAPER"
      ? 1
      : cSel === "SCISSORS" && pSel !== "SCISSORS"
      ? 2
      : null; // null cpuSelNum === Tie Game
  let pSelNum = pSel === "ROCK" ? 0 : pSel === "PAPER" ? 1 : 2;
  // 0 === ROCK, 1 === PAPER, 2 === SCISSORS

  switch (cpuSelNum) {
    case 0:
      switch (pSelNum) {
        case 1: // Rock v. Paper
          message = `You win -- ${pSel} beats ${cSel}!`;
          result = "PLAYER";
          break;
        case 2: // Rock v. Scissors
          message = `You lose -- ${cSel} beats ${pSel}!`;
          result = "COMPUTER";
      }
      break;
    case 1:
      switch (pSelNum) {
        case 0: // Paper v. Rock
          message = `You lose -- ${cSel} beats ${pSel}!`;
          result = "COMPUTER";
          break;
        case 2: // Paper v. Scissors
          message = `You win -- ${pSel} beats ${cSel}!`;
          result = "PLAYER";
      }
      break;
    case 2:
      switch (pSelNum) {
        case 0: // Scissors v. Rock
          message = `You win -- ${pSel} beats ${cSel}!`;
          result = "PLAYER";
          break;
        case 1: // Scissors v. Paper
          message = `You lose -- ${cSel} beats ${pSel}!`;
          result = "COMPUTER";
      }
      break;
    default:
      message = `It's a draw -- both picked ${pSel}!`;
      result = "DRAW";
  }
  return { result, message };
}

function playRoundHandler(event) {
  const playerSel = event.target.innerHTML;

  let { result, message } = determineWinner(
    computerPlay(),
    playerPlay(playerSel)
  );
  incrementScore(result);
  if (state.wins >= 5 || state.losses >= 5) {
    gameOverAnimation();
    return;
  }
  selectionAnimation(message);
}

function incrementScore(result) {
  if (result === "DRAW") return;

  if (result === "PLAYER") {
    state.wins++;
    winsPlaceHolder.textContent = state.wins.toString();
  } else if (result === "COMPUTER") {
    state.losses++;
    lossesPlaceHolder.textContent = state.losses.toString();
  }
}

function gameOverAnimation() {
  let winner = state.wins >= 5 ? "PLAYER" : "COMPUTER";

  toggleSelectionButtons();
  toggleResetButton();
  winStatement.textContent = `Game over! ${winner} has won!`;
  winStatement.classList.remove("hidden");

  setTimeout(() => {
    winStatement.textContent = "";
    winStatement.classList.add("hidden");
    toggleResetButton();
  }, 1500);
}

function resetScore() {
  for (key in state) {
    state[key] = 0;
  }
  winsPlaceHolder.textContent = "0";
  lossesPlaceHolder.textContent = "0";
  toggleSelectionButtons();
}

function selectionAnimation(message) {
  const winStatement = document.querySelector("div.winStatement");
  toggleSelectionButtons();
  toggleResetButton();
  winStatement.textContent = message;
  winStatement.classList.remove("hidden");

  setTimeout(() => {
    winStatement.textContent = "";
    winStatement.classList.add("hidden");
    toggleSelectionButtons();
    toggleResetButton();
  }, 1500);
}

function toggleSelectionButtons() {
  const buttons = document.querySelectorAll("button[class='button']");
  buttons.forEach((element) => {
    if (element.disabled == true) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  });
}

function toggleResetButton() {
  const button = document.querySelector("button.resetButton");
  if (button.disabled === true) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
