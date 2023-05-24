class Bot {
  constructor(isWhite) {
    this.isWhite = isWhite;
    this.colorShort = isWhite ? "w" : "b";
  }
  isWhite;
  colorShort;
  generatingMoves = false;
  genNewMove(board) {
    this.generatingMoves = true;
    let s = 10;
    let toDo = [{ board: board, layer: 0, botTurn:true }];
    let time = Date.now() + s * 1000;
    let idx = 0;
    let highestLayer = 0;
    let layerLength = 0;
    let lastLayerLength = 0;
    while (this.generatingMoves) {
      if (toDo[idx].layer !== highestLayer) {
        highestLayer++;
        lastLayerLength = layerLength;
        layerLength = 0;
        console.log(highestLayer);
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (toDo[idx].board.board[i][j].charAt(1) == this.colorShort)
            continue;
          pieces
            .getValidMovesForPiece({ x: j, y: i }, toDo[idx].board)
            .forEach((move) => {
              const newBoard = toDo[idx].board.cloneBoard();
              pieces.movePiece({ x: j, y: i }, move, newBoard);
              toDo.push({
                board: newBoard,
                layer: toDo[idx].layer + 1,
                eval: this.evalBoard(),
                mother: idx,
                botTurn: !toDo[idx].botTurn
              });
              layerLength++;
              if(toDo[idx].layer > 0) return
              toDo[toDo.length - 1].startPos = { x: j, y: i };
              toDo[toDo.length - 1].endPos = move;
            });
        }
      }
      

      if (Date.now() > time) this.generatingMoves = false;
      idx++;
      console.log("c");
    }
    let highestEval = 0,
    highestIdx;
    for(let i = 0;i<lastLayerLength;i++){
      if(toDo[toDo.length - 1 - layerLength - i].eval < highestEval) continue
      highestEval = toDo[toDo.length - 1 - layerLength - i].eval;
      highestIdx = toDo.length - 1 - layerLength - i
    }
    let move = toDo[highestIdx];
    for(let i = 0;i<highestLayer-1;i++){
      move = toDo[move.mother]
    }
    
    console.log(toDo[highestIdx])
    pieces.movePiece(move.startPos, move.endPos, stdBoard)
    stdBoard.resetBoard()
    
  }
  evalBoard(board) {
    let factors = [];

    //king safety
    return Math.random();
  }
}
