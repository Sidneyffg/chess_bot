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
    stdBoard.board = pieces.movePiece(move.startMove.start, move.startMove.end, board);
    stdBoard.resetBoard();
  }
  newMove(board, maxDepth, depth, startMove) {
    //console.log(board,maxDepth,depth,startMove)
    depth = depth || 0;
    if (depth == maxDepth) {
      const test = { eval: this.evalBoard(board), startMove: startMove };
      count2++;
      return test;
    }
    let color =  board[64] == "1"
    let highestEval = board[64] == "1" ? -Infinity : Infinity;
    let bestEval;
    let totalMoves = 0;
    for (let i = 0; i < 64; i++) {
        if (pieces.isPieceWhite(board[i]) !== color) continue;

        let moves = pieces.getValidMovesForPiece(i, board);
        totalMoves += moves.length;
        for (let u = 0; u < moves.length; u++) {
          const move = moves[u];
          let newBoard = board;
          newBoard = pieces.setCharAt(newBoard, 64, newBoard[64] == "0" ? "1":"0")

          newBoard = pieces.movePiece(i, move, newBoard);

          let r;
          if (startMove) {
            r = this.newMove(newBoard, maxDepth, depth + 1, startMove);
          } else {
            //console.log({
            //  start: i,
            //  end: move,
            //})
            r = this.newMove(newBoard, maxDepth, depth + 1, {
              start: i,
              end: move,
            });
          }
          //console.log(board[64])
          if (board[64] == "1") {
            if (r.eval >= highestEval) {
              highestEval = r.eval;
              bestEval = r;
            }
          } else {
            //console.log(r)
            if (r.eval <= highestEval) {
              highestEval = r.eval;
              bestEval = r;
              //console.log(r)
            }
        }
      }
    }
    if (totalMoves == 0) {
      if (pieces.isInCheck(color, board)) {
        console.log("yes", (board[64]=="1") ? -Infinity : Infinity);
        return {
          eval: (board[64]=="1") ? -inf + depth : inf - depth,
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
      //console.log(board, maxDepth, depth, startMove);
      //console.log(totalMoves);
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
    for (let i = 0; i < 64; i++) {
        if (board[i] == "e") continue;
        pieces.getMovesForPiece(i, board).forEach((move) => {
          if (pieces.isPieceWhite(board[i])) {
            wMoves.push(move);
          } else {
            bMoves.push(move);
          }
        });
    }

    /*wMoves = wMoves.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.x === value.x && t.y === value.y)
    );

    bMoves = bMoves.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.x === value.x && t.y === value.y)
    );*/

    //material
    let wPoints = 0,
      bPoints = 0;
    for (let i = 0; i < 64; i++) {
        if (board[i] == "e") continue;
        if (pieces.isPieceWhite(board[i])) {
          wPoints += pieces.pieces.find(
            (e) => e.short == pieces.toLowerCase(board[i])
          ).points;
        } else {
          bPoints += pieces.pieces.find(
            (e) => e.short == pieces.toLowerCase(board[i])
          ).points;
        }
    }
    return wPoints - bPoints + (wMoves.length - bMoves.length) / 2;
  }
}