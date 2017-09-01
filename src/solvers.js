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
    if (board.hasColConflictAt(c)) {
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
  var board = new Board({n: n});
  var freeCols = Array(n).fill(true);
  
  var buildSolutionBoards = function (r) {
    if (r === n) {
      solutionCount++;
      return;
    }
    
    for (var c = 0; c < n; c++) {
      if (!freeCols[c]) {
        continue;
      }
      board.togglePiece(r, c);
      freeCols[c] = false;  
      buildSolutionBoards(r + 1); 
      board.togglePiece(r, c);
      freeCols[c] = true;
    }
  };
  
  buildSolutionBoards(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  
  var findSingleSolution = function(r, freeCols) {
    freeCols = freeCols || [...Array(n).keys()];
    if (r === n) {
      solution = board.rows();
      return true;
    }
    for (var i = 0; i < freeCols.length; i++) {
      var c = freeCols[i];
      board.togglePiece(r, c);
      if (!board.hasAnyQueenConflictsOn(r, c) && findSingleSolution(r + 1, freeCols.filter((ele) => ele !== c))) {
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
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var findAllSolutions = function(r, freeCols) {
    freeCols = freeCols || [...Array(n).keys()];
    if (r === n) {
      solutionCount++; 
      return;
    }
    for (var i = 0; i < freeCols.length; i++) {
      var c = freeCols[i];
      board.togglePiece(r, c);
      if (!board.hasAnyQueenConflictsOn(r, c)) {
        findAllSolutions(r + 1, freeCols.filter((ele) => ele !== c));
      }
      board.togglePiece(r, c);
    }
  };
     
  findAllSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
