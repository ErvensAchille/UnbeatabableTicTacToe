let reset = document.querySelector('.reset')
let box = document.querySelectorAll('.box')
let container = document.querySelectorAll('.container')
let filledBoxes = [];
let clicks = 0;
let boardState = [
  "", "", "",
  "", "", "",
  "", "", ""
]


for (let i=0; i<box.length; i++){
  box[i].addEventListener('click', function(){
    if (!(filledBoxes.includes(i))) {
      box[i].innerHTML = 'X';
      boardState[i] = 'X';
      filledBoxes.push(i);
      clicks++;
      let move = generateBestComputerChoice(boardState, 'O')[0];
      if (move != -1) {
        box[move].innerHTML = 'O';
        boardState[move] = 'O'
        filledBoxes.push(move);
      }
      if (clicks >= 3) {
        result()
      }
    }
  })
}

function generateRandomComputerChoice() {
  for (let i=0; i<box.length; i++) {
    let computerChoice = Math.floor(Math.random()*9);
    if (!(filledBoxes.includes(computerChoice))) {
      box[computerChoice].innerHTML = 'O';
      boardState[computerChoice] = 'O'
      filledBoxes.push(computerChoice);
      break;
    }
  }
}

function generateBestComputerChoice(board, player) {
  let maxScore = -1;
  let bestMove;
  for (let i=0; i<box.length; i++) {
    if (board[i] == "") {
      let newBoard = [...board];
      newBoard[i] = player;
      if (hasSomebodyWon(newBoard)) {
        return [i, 100]
      } else {
        let opponentScore = generateBestComputerChoice(newBoard, player=='X' ? 'O': 'X')
        let ourScore = 100-opponentScore[1]
        if (ourScore > maxScore) {
          maxScore = ourScore;
          bestMove = i;
        }
      }
    }
  }
  if (maxScore == -1) {
    return [-1, 50]
  }
  return [bestMove, maxScore]
}

function hasSomebodyWon(board) {
  for (let i=0; i<board.length; i++) {
    if (board[i] == "") {
      continue;
    }
    if (i == 0 || i == 3 || i == 6) {
      if(board[i] == board[i+1] && board[i+1] == board[i+2]) {
        return true;
      }
    }
    if (i == 0 || i == 1 || i == 2) {
      if(board[i] == board[i+3] && board[i+3] == board[i+6]) {
        return true;
      }
    }
    if (i == 0) {
      if (board[i] == board[i+4] && board[i+4] == board[i+8]) {
        return true;
      }
    }
    if (i == 2) {
      if (board[i] == board[i+2] && board[i+2] == board[i+4]) {
        return true;
      }
    }
  }
  return false;
}

function result() {
  for (let i=0; i<box.length; i++) {
    if (i == 0 || i == 3 || i == 6) {
      if(box[i].innerHTML == box[i+1].innerHTML && box[i+1].innerHTML == box[i+2].innerHTML) {
        box[i].style.background = 'gold';
        box[i+1].style.background = 'gold';
        box[i+2].style.background = 'gold';
        break;
      }
    }
    if (i == 0 || i == 1 || i == 2) {
      if(box[i].innerHTML == box[i+3].innerHTML && box[i+3].innerHTML == box[i+6].innerHTML) {
        box[i].style.background = 'gold';
        box[i+3].style.background = 'gold';
        box[i+6].style.background = 'gold';
        break;
      }
    }
    if (i == 0) {
      if (box[i].innerHTML == box[i+4].innerHTML && box[i+4].innerHTML == box[i+8].innerHTML) {
        box[i].style.background = 'gold';
        box[i+4].style.background = 'gold';
        box[i+8].style.background = 'gold';
        break;
      }
    }
    if (i == 2) {
      if (box[i].innerHTML == box[i+2].innerHTML && box[i+2].innerHTML == box[i+4].innerHTML) {
        box[i].style.background = 'red';
        box[i+2].style.background = 'red';
        box[i+4].style.background = 'red';
        break;
      }
    }
  }
}

reset.addEventListener('click', function(){
  filledBoxes = [];
  boardState = [
    "", "", "",
    "", "", "",
    "", "", ""
  ]
  for (let i=0; i<box.length; i++) {
    box[i].innerHTML = ''
    box[i].style.background = 'transparent';
    clicks = 0;
  }
})
