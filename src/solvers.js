/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var count = 0;
  var solution = [];

  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);
      if (board.hasRowConflictAt(r) || board.hasColConflictAt(c)) {
        board.togglePiece(r, c);
      } else {
        count++;
      }
      if (count === n) {
        solution = board.rows();
        break;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solutions = [];
  
  var buildSolutionBoards = function (r, board) {
    if (r === n) {
      solutions.push(board.rows());
      return;
    } 
    
    board = board || new Board({n: n});

    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);
      if (board.hasRowConflictAt(r) || board.hasColConflictAt(c)) {
        board.togglePiece(r, c);      
      } else {
        buildSolutionBoards(r + 1, new Board(board.rows()));
        board.togglePiece(r, c);
      }
    }
  };
  
  buildSolutionBoards(0);

  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var count = 0;
  var solution = [];
  
  //board.get(0)[1] = 1;


  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);
      if (board.hasAnyQueenConflictsOn(r, c)) {
        board.togglePiece(r, c);
      } else {
        count++;
      }
      if (count === n) {
        solution = board.rows();
      }
    }
  }
     


  
  console.log(solution);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};
