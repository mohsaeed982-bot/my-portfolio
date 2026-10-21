
let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  Ties: 0,
};

updateScore()

function gameResult(playerMove) {
  computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'rock') {
    if (computerMove === 'rock') { result = 'Its a tie' }
    else if (computerMove === 'paper') { result = 'You lose' }
    else if (computerMove === 'scissors') { result = 'You win' }
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') { result = 'You win' }
    else if (computerMove === 'paper') { result = 'Its a tie' }
    else if (computerMove === 'scissors') { result = 'You lose' }
  }

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') { result = 'You lose' }
    else if (computerMove === 'paper') { result = 'You win' }
    else if (computerMove === 'scissors') { result = 'Its a tie' }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Its a tie') {
    score.Ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score))

  document.querySelector('.js-pra1').innerHTML = result;
  document.querySelector('.js-pra2').innerHTML = `You: <img src="emojies/${playerMove}-emoji.png"> - <img src="emojies/${computerMove}-emoji.png"> Computer`;
  updateScore()
}
function pickComputerMove() {
  const randNum = Math.random()
  let computerMove = '';

  if (randNum >= 0 && randNum < 1 / 3) {
    computerMove = 'rock';

  } else if (randNum >= 1 / 3 && randNum < 2 / 3) {
    computerMove = 'paper';

  } else if (randNum >= 2 / 3 && randNum < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScore() {
  document.querySelector('.js-pra3').innerHTML = `Wins: ${score.wins}   Losses: ${score.losses}   Ties: ${score.Ties}`;
}