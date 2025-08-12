const options = ['Rock', 'Paper', 'Scissors'];

// Randomly pick computer's choice
function getRandomComputerResult() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Check if player wins the round
function hasPlayerWonTheRound(player, computer) {
  return (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Scissors' && computer === 'Paper') ||
    (player === 'Paper' && computer === 'Rock')
  );
}

let playerScore = 0; // Player score
let computerScore = 0; // Computer score

// Play a round and update scores
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

// Get DOM elements
const playerScoreSpanElement = document.getElementById('player-score');
const computerScoreSpanElement = document.getElementById('computer-score');
const roundResultsMsg = document.getElementById('results-msg');
const winnerMsgElement = document.getElementById('winner-msg');
const optionsContainer = document.querySelector('.options-container');
const resetGameBtn = document.getElementById('reset-game-btn');

// Show round result and update UI
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  // Check for game winner
  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? 'Player' : 'Computer'
    } has won the game!`;

    resetGameBtn.style.display = 'block';
    optionsContainer.style.display = 'none';
  }
}

// Reset scores and UI for new game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;
  resetGameBtn.style.display = 'none';
  optionsContainer.style.display = 'block';
  winnerMsgElement.innerText = '';
  roundResultsMsg.innerText = '';
}

// Reset button event
resetGameBtn.addEventListener('click', resetGame);

// Option buttons events
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

rockBtn.addEventListener('click', function () {
  showResults('Rock');
});

paperBtn.addEventListener('click', function () {
  showResults('Paper');
});
