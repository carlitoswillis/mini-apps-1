var playing = true;
var board = [['', '', ''], ['', '', ''], ['', '', '']];

var checkArr = function (arr) {
  for (var spot of arr) {
    if (spot === '') {
      return false;
    }
  }
  var total = arr.map((x) => {
    if (x === 'X') {
      return 1
    } else if (x === 'O') {
      return -1
    }
  }).reduce((x, y) => {
    return x+y;
  });
  if (total === 3 ||total === -3) {
    return true;
  }
  return false;
}
var checkRows = () => {
  return board.map((row) => checkArr(row)).reduce((x, y) => x || y);
}
var checkCols = () => {
  var cols = [[], [], []];
  for (var row = 0; row < 3; row++) {
    for (var i = 0; i < 3; i++) {
      cols[i].push(board[row][i]);
    }
  }
  return cols.map((col) => checkArr(col)).reduce((x, y) => x || y);
}
var checkDiagonals = () => {
  var diagonalOne = [board[0][0], board[1][1], board[2][2]];
  var diagonalTwo = [board[2][0], board[1][1], board[0][2]];
  var diagonals = [diagonalOne, diagonalTwo];
  return diagonals.map(d => checkArr(d)).reduce((x, y) => x||y);
}
var checkBoard = () => {
  return checkDiagonals() || checkCols() || checkRows();
}

var rowLegend = {'boxOne': [0,0], 'boxTwo': [0, 1], 'boxThree': [0, 2], 'boxFour': [1, 0], 'boxFive': [1, 1], 'boxSix': [1, 2], 'boxSeven': [2, 0], 'boxEight': [2, 1], 'boxNine': [2, 2]};

var currPlayer = "X";
var otherPlayer = "O"

var handleClicks = function (event) {
  if (playing) {
    if (board[rowLegend[event.target.id][0]][rowLegend[event.target.id][1]] === '') {
      board[rowLegend[event.target.id][0]][rowLegend[event.target.id][1]] = currPlayer;
      event.target.innerHTML = currPlayer;
        if (checkBoard()) {
          alert (`${currPlayer} Won!`);
          playing = false;
        }
        if (!playing) {
          currPlayer = "X";
          otherPlayer = "O"
        } else {
          currPlayer = otherPlayer;
          otherPlayer = board[rowLegend[event.target.id][0]][rowLegend[event.target.id][1]];
        }
      }
    }
}

for (var element of document.body.children) {
  if (element.className === 'grid-container') {
    element.addEventListener('click', handleClicks);
  }
  if (element.className === 'resetgame') {
    element.addEventListener('click', () => {
      board = [['', '', ''], ['', '', ''], ['', '', '']];
      playing = true;
      for (var el of document.body.children) {
        if (el.className === 'grid-container') {
          for (var child of el.children) {
            child.innerHTML = '';
          }
        }
      }
    });
  }
}