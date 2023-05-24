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
    let toDo = [{ board: board, layer: 0 }];
    let time = Date.now() + s * 1000;
    let idx = 0;
    let highestLayer = 0;
    let layerLength = 0;
    let lastLayerLength = 0;
    while (this.generatingMoves) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (toDo[idx].board.board[i][j].charAt(1) !== this.colorShort)
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
              });
              layerLength++;
            });
        }
      }
      if (toDo[idx].layer !== highestLayer) {
        highestLayer++;
        lastLayerLength = layerLength;
        layerLength = 0;
        console.log(highestLayer);
      }

      if (Date.now() > time) this.generatingMoves = false;
      idx++;
      console.log("c");
    }
    console.log(toDo);
    console.log(toDo.length - 1 - layerLength);
  }
  evalBoard(board) {
    let factors = [];

    //king safety
    return Math.random();
  }
}
