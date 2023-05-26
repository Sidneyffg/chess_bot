class Bot {
  constructor(isWhite) {
    this.isWhite = isWhite;
    this.colorShort = isWhite ? "w" : "b";
  }
  isWhite;
  colorShort;
  generatingMoves = false;
  OLDgenNewMove(board) {
    this.generatingMoves = true;
    let s = 100;
    let toDo = [{ board: board, layer: 0, botTurn: true }];
    let time = Date.now() + s * 1000;
    let idx = 0;
    let highestLayer = 0;
    let layerLength = 0;
    let lastLayerLength = 0;
    while (this.generatingMoves) {
      if (toDo[idx].layer == 3) this.generatingMoves = false;
      if (toDo[idx].layer !== highestLayer) {
        highestLayer++;
        lastLayerLength = layerLength;
        layerLength = 0;
        console.log(highestLayer);
      }
      let color = toDo[idx].botTurn == this.isWhite ? "w" : "b";
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (toDo[idx].board.board[i][j].charAt(1) !== color) continue;
          pieces
            .getValidMovesForPiece({ x: j, y: i }, toDo[idx].board)
            .forEach((move) => {
              const newBoard = toDo[idx].board.cloneBoard();
              pieces.movePiece({ x: j, y: i }, move, newBoard);
              toDo.push({
                board: newBoard,
                layer: toDo[idx].layer + 1,
                eval: this.evalBoard(newBoard),
                mother: idx,
                botTurn: !toDo[idx].botTurn,
              });
              layerLength++;
              if (toDo[idx].layer > 0) return;
              toDo[toDo.length - 1].startPos = { x: j, y: i };
              toDo[toDo.length - 1].endPos = move;
            });
        }
      }

      if (Date.now() > time) this.generatingMoves = false;
      idx++;
    }
    let highestEval = -99999,
      highestIdx;
    for (let i = 0; i < lastLayerLength; i++) {
      if (toDo[toDo.length - 1 - layerLength - i].eval < highestEval) continue;
      highestEval = toDo[toDo.length - 1 - layerLength - i].eval;
      highestIdx = toDo.length - 1 - layerLength - i;
    }
    let move = toDo[highestIdx];
    for (let i = 0; i < highestLayer - 1; i++) {
      console.log(move);
      move = toDo[move.mother];
    }
    console.log(toDo);
    console.log(toDo[highestIdx]);
    pieces.movePiece(move.startPos, move.endPos, stdBoard);
    stdBoard.resetBoard();
  }
  genNewMove(board) {
    const move = this.newMove(board, 3);
    pieces.movePiece(move.startMove.start, move.startMove.end, stdBoard);
    stdBoard.resetBoard();
  }
  newMove(board, maxDepth, depth, startMove) {
    depth = depth || 0;
    if (depth == maxDepth)
      return { eval: this.evalBoard(board), startMove: startMove };
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
          console.log(r);
          if (board.isWhiteTurn) {
            if (r.eval > highestEval) {
              highestEval = r.eval;
              bestEval = r;
            }
          } else {
            if (r.eval < highestEval) {
              highestEval = r.eval;
              bestEval = r;
            }
          }
        }
      }
    }
    if (totalMoves == 0) {
      console.log(
        "ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );
      return color == "b" ? -Infinity : Infinity;
    }
    return bestEval;
  }
  evalBoard(board) {
    let factors = [];

    //king safety

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
    return wPoints - bPoints;
  }
}
