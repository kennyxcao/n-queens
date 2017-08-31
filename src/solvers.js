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

  for (var r = 0, c = 0; r < n && c < n; r++, c++) {
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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //var solutions = [];
  
  var buildSolutionBoards = function (r, board, freeCols) {
    if (r === n) {
      //solutions.push(board.rows());
      solutionCount++;
      return;
    } 
    
    board = board || new Board({n: n});
    freeCols = freeCols || [...Array(n).keys()];

    for (var i = 0; i < freeCols.length; i++) {
      var c = freeCols[i];
      board.togglePiece(r, c);
      if (!board.hasRowConflictAt(r) && !board.hasColConflictAt(c)) {
        buildSolutionBoards(r + 1, board, freeCols.filter((ele) => ele !== c));
      }
      board.togglePiece(r, c);
    }
  };
  
  buildSolutionBoards(0);

  //solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = (new Board({n: n})).rows();
  
  var findSingleSolution = function(r, board = new Board({n: n}), freeCols) {
    freeCols = freeCols || [...Array(n).keys()];
    if (r === n) {
      solution = board.rows();
      return true;
    }
    for (var i = 0; i < freeCols.length; i++) {
      var c = freeCols[i];
      board.togglePiece(r, c);
      if (!board.hasAnyQueenConflictsOn(r, c) && findSingleSolution(r + 1, board, freeCols.filter((ele) => ele !== c))) {
        return true;
      }
      board.togglePiece(r, c);
    }
    return false;
  };
     
  findSingleSolution(0);
    
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = [];
  
  var findAllSolutions = function(r, board = new Board({n: n}), freeCols) {
    freeCols = freeCols || [...Array(n).keys()];
    if (r === n) {
      solutions.push(board.rows()); 
      return;
    }
    for (var i = 0; i < freeCols.length; i++) {
      var c = freeCols[i];
      board.togglePiece(r, c);
      if (!board.hasAnyQueenConflictsOn(r, c)) {
        findAllSolutions(r + 1, board, freeCols.filter((ele) => ele !== c));
      }
      board.togglePiece(r, c);
    }
  };
     

  findAllSolutions(0);

  var solutionCount = solutions.length;
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
