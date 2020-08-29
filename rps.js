const state = {
  wins: 0,
  losses: 0,
  ties: 0,
  round: 0,
};

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
    //TRIGGER GAME WINNING FUNCTION AND SKIP FINAL SELECTION ANIMATIONS
  }
  selectionAnimation(message);
}

function incrementScore(result) {
  if (result === "DRAW") return;
  const wins = document.querySelector("span.wins>span");
  const losses = document.querySelector("span.losses>span");

  if (result === "PLAYER") {
    state.wins++;
    wins.textContent = state.wins.toString();
  } else if (result === "COMPUTER") {
    state.losses++;
    losses.textContent = state.losses.toString();
  }
}

function selectionAnimation(message) {
  const winStatement = document.querySelector("div.winStatement");
  toggleButtons();
  winStatement.classList.remove("hidden");
  winStatement.textContent = message;

  setTimeout(() => {
    winStatement.textContent = "";
    winStatement.classList.add("hidden");
    toggleButtons();
  }, 2500);
}

function toggleButtons() {
  const buttons = document.querySelectorAll("button.button");
  buttons.forEach((element) => {
    if (element.disabled == true) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  });
}

const btnSelection = document.querySelectorAll("button[class=button]");
const btnReset = document.querySelector("button.resetButton");

btnSelection.forEach((element) => {
  element.addEventListener("click", playRoundHandler);
});

// function game() {
//   let score = { player: 0, computer: 0 };
//   for (let i = 0; i < 5; i++) {
//     let winner = playRoundHandler();
//     if (winner === "PLAYER") {
//       score.player++;
//     } else if (winner === "COMPUTER") {
//       score.computer++;
//     }
//   }
//   if (score.computer > score.player) {
//     console.log(
//       `Nice try, the computer beat you ${score.computer} - ${score.player}`
//     );
//   } else if (score.player > score.computer) {
//     console.log(
//       `Well done, you beat the computer ${score.player} - ${score.computer}`
//     );
//   } else {
//     console.log(
//       `You both played well, its a tie ${score.player} - ${score.computer}`
//     );
//   }
// }

// game();
