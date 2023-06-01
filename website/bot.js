const inf = 999999999;
class Bot {
  constructor(isWhite) {
    this.isWhite = isWhite;
    this.colorShort = isWhite ? "w" : "b";
  }
  isWhite;
  colorShort;
  generatingMoves = false;
  genNewMove(board) {
    const time = Date.now();
    const move = this.newMove(board, 4);
    console.log(move, Date.now() - time);
    pieces.movePiece(move.startMove.start, move.startMove.end, stdBoard);
    stdBoard.resetBoard();
  }
  newMove(board, maxDepth, depth, startMove) {
    depth = depth || 0;
    if (depth == maxDepth) {
      const test = { eval: this.evalBoard(board), startMove: startMove };
      return test;
    }
    let color = board.isWhiteTurn ? "w" : "b";
    let highestEval = board.isWhiteTurn ? -Infinity : Infinity;
    let bestEval;
    let totalMoves = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board.board[i][j].charAt(1) !== color) continue;

        let moves = pieces.getValidMovesForPiece({ x: j, y: i }, board);
        totalMoves += moves.length;
        for (let u = 0; u < moves.length; u++) {
          const move = moves[u];
          const newBoard = board.cloneBoard();
          newBoard.isWhiteTurn = !newBoard.isWhiteTurn;

          pieces.movePiece({ x: j, y: i }, move, newBoard);

          let r;
          if (startMove) {
            r = this.newMove(newBoard, maxDepth, depth + 1, startMove);
          } else {
            r = this.newMove(newBoard, maxDepth, depth + 1, {
              start: { x: j, y: i },
              end: move,
            });
          }
          if (board.isWhiteTurn) {
            if (r.eval >= highestEval) {
              highestEval = r.eval;
              bestEval = r;
            }
          } else {
            if (r.eval <= highestEval) {
              highestEval = r.eval;
              bestEval = r;
            }
          }
        }
      }
    }
    if (totalMoves == 0) {
      if (pieces.isInCheck(board.isWhiteTurn, board)) {
        console.log("yes", board.isWhiteTurn ? -Infinity : Infinity);
        return {
          eval: board.isWhiteTurn ? -inf + depth : inf - depth,
          startMove: startMove,
        };
      }
      console.log("no", board);
      return {
        eval: 0,
        startMove: startMove,
      };
    }
    if (bestEval == undefined) {
      console.log(board, maxDepth, depth, startMove);
      console.log(totalMoves);
    }
    return bestEval;
  }
  evalBoard(board) {
    let factors = [];

    //king safety

    //piece activity

    //structure
    let wMoves = [],
      bMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board.board[i][j] == "") continue;
        pieces.getMovesForPiece({ x: j, y: i }, board).forEach((move) => {
          if (board.board[i][j].charAt(1) == "w") {
            wMoves.push(move);
          } else {
            bMoves.push(move);
          }
        });
      }
    }

    wMoves = wMoves.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.x === value.x && t.y === value.y)
    );

    bMoves = bMoves.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.x === value.x && t.y === value.y)
    );

    //material
    let wPoints = 0,
      bPoints = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board.board[i][j] == "") continue;
        if (board.board[i][j].charAt(1) == "w") {
          wPoints += pieces.pieces.find(
            (e) => e.short == board.board[i][j].charAt(0)
          ).points;
        } else {
          bPoints += pieces.pieces.find(
            (e) => e.short == board.board[i][j].charAt(0)
          ).points;
        }
      }
    }
    return wPoints - bPoints + (wMoves.length - bMoves.length) / 2;
  }
}