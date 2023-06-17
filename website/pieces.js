class Pieces {
  pieces = [
    {
      name: "king",
      short: "k",
      points: 100,
      moves: [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ],
    },
    {
      name: "queen",
      short: "q",
      points: 9,
      moves: [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [0, -5],
        [0, -6],
        [0, -7],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-4, -4],
        [-5, -5],
        [-6, -6],
        [-7, -7],
        [-1, 1],
        [-2, 2],
        [-3, 3],
        [-4, 4],
        [-5, 5],
        [-6, 6],
        [-7, 7],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [1, -1],
        [2, -2],
        [3, -3],
        [4, -4],
        [5, -5],
        [6, -6],
        [7, -7],
      ],
    },
    {
      name: "rook",
      short: "r",
      points: 5,
      moves: [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [0, -5],
        [0, -6],
        [0, -7],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
      ],
    },
    {
      name: "bishop",
      short: "b",
      points: 3,
      moves: [
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-4, -4],
        [-5, -5],
        [-6, -6],
        [-7, -7],
        [-1, 1],
        [-2, 2],
        [-3, 3],
        [-4, 4],
        [-5, 5],
        [-6, 6],
        [-7, 7],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [1, -1],
        [2, -2],
        [3, -3],
        [4, -4],
        [5, -5],
        [6, -6],
        [7, -7],
      ],
    },
    {
      name: "knight",
      short: "n",
      points: 3,
      moves: [
        [-2, -1],
        [-1, -2],
        [2, -1],
        [1, -2],
        [-2, 1],
        [-1, 2],
        [2, 1],
        [1, 2],
      ],
    },
    {
      name: "pawn",
      short: "p",
      points: 1,
    },
  ];
  movePiece(startPos, endPos, board) {
    const piece = board[startPos],
      lowKey = this.toLowerCase(piece),
      isWhite = this.isPieceWhite(piece);
    switch (lowKey) {
      case "k":
        const startX = startPos & 7,
          endX = endPos & 7
        if (
          board[this.boardKingPos(isWhite)] == "1" ||
          (endX !== 2 && endX !== 6) ||
          startX !== 4
        ) {
          board[this.boardKingPos(isWhite)] = "1"
          break;
        }
        if (isWhite) {
          if (endX == 2) {
            board[56] = "e"
            board[59] = "R"
          } else {
            board[63] = "e"
            board[61] = "R"
          }
        } else {
          if (endX == 2) {
            board[0] = "e"
            board[3] = "r"
          } else {
            board[7] = "e"
            board[5] = "r"
          }
        }
        board[this.boardKingPos(isWhite)] = "1"
        break;
      case "r":
        const startx = startPos & 7,
          starty = startPos >>> 3
        if (
          (startx !== 0 && startx !== 7) ||
          (starty !== 0 && starty !== 7)
        )
          break;
        board[this.boardRookPos(isWhite, startx == 0)] = "1"
        break;
      case "p":
        const pY = endPos >>> 3
        if (pY == 0 || pY == 7) {
          board[startPos] = isWhite ? "Q" : "q"
        }
    }
    board[endPos] = board[startPos]
    board[startPos] = "e"
  }
  getMovesForPiece(pos, board) {
    const piece = board[pos],
      moves = [],
      isWhite = this.isPieceWhite(piece);
    switch (this.toLowerCase(piece)) {
      case "k":
        this.pieces
          .find((e) => e.short == "k")
          .moves.forEach((move) => {
            if (!this.#isValidPos(pos, move)) return;
            const movePos = pos + move[0] + move[1]*8
            if (
              board[movePos] !== "e" &&
              this.isPieceWhite(board[movePos]) == isWhite
            )
              return;
            moves.push(movePos);
          });
        if (isWhite) {
          if (board[this.boardKingPos(true)]) break;
          if (
            board[56] == "r" &&
            board[57] == "e" &&
            board[58] == "e" &&
            board[59] == "e" &&
            !board[this.boardRookPos(true, true)]
          )
            moves.push(23);
          if (
            board[61] == "e" &&
            board[62] == "e" &&
            board[63] == "r" &&
            !board[this.boardRookPos(true, false)]
          )
            moves.push(55);
        } else {
          if (board[this.boardKingPos(false)]) break;
          if (
            board[0] == "r" &&
            board[1] == "e" &&
            board[2] == "e" &&
            board[3] == "e" &&
            !board[this.boardRookPos(false, true)]
          )
            moves.push(16);
          if (
            board[5] == "e" &&
            board[6] == "e" &&
            board[7] == "r" &&
            !board[this.boardRookPos(false, false)]
          )
            moves.push(48);
        }
        break;
      case "q":
        const qMoves = this.pieces.find((e) => e.short == "q").moves;
        for (let s = 0; s < 8; s++) {
          //side
          for (let i = 0; i < 7; i++) {
            if (!this.#isValidPos(pos, qMoves[s * 7 + i])) break;
            const movePos = pos + qMoves[s * 7 + i][0] + qMoves[s * 7 + i][1] * 8;
            if (board[movePos] !== "e") {
              if (
                this.isPieceWhite(board[movePos]) == isWhite
              )
                break;
              moves.push(movePos);
              break;
            }
            moves.push(movePos);
          }
        }
        break;
      case "r":
        const rMoves = this.pieces.find((e) => e.short == "r").moves;
        for (let s = 0; s < 4; s++) {
          //side
          for (let i = 0; i < 7; i++) {
            if (!this.#isValidPos(pos, rMoves[s * 7 + i])) break;
            const movePos = pos + rMoves[s * 7 + i][0] + rMoves[s * 7 + i][1]* 8;
            if (board[movePos] !== "e") {
              if (
                this.isPieceWhite(board[movePos]) == isWhite
              )
                break;
              moves.push(movePos);
              break;
            }
            moves.push(movePos);
          }
        }
        break;
      case "b":
        const bMoves = this.pieces.find((e) => e.short == "b").moves;
        for (let s = 0; s < 4; s++) {
          //side
          for (let i = 0; i < 7; i++) {
            if (!this.#isValidPos(pos, bMoves[s * 7 + i])) break;
            const movePos = pos + bMoves[s * 7 + i][0] + bMoves[s * 7 + i][1]* 8;
            if (board[movePos] !== "e") {
              if (
                this.isPieceWhite(board[movePos]) == isWhite
              )
                break;
              moves.push(movePos);
              break;
            }
            moves.push(movePos);
          }
        }
        break;
      case "n":
        this.pieces
          .find((e) => e.short == "n")
          .moves.forEach((move) => {
            if (!this.#isValidPos(pos, move)) return;
            const movePos = pos + move[0] + move[1]* 8;
            if (
              board[movePos] !== "e" &&
              this.isPieceWhite(board[movePos]) == isWhite
            )
              return;
            moves.push(movePos);
          });
        break;
      case "p":
        if (isWhite) {
          let changePos = [-1,-1];
          if (this.checkNode(pos, changePos, board) == "b")
            moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[0]+=2;
          if (this.checkNode(pos, changePos, board) == "b")
            moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[0]--;
          if (board[pos + changePos[0] + changePos[1] * 8] !== "e") break;
          moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[1]--;;
          if ((pos >>> 3) == 6 && board[pos + changePos[0] + changePos[1] * 8] === "e")
            moves.push(pos + changePos[0] + changePos[1] * 8);
        } else {
          let changePos = [-1,1];
          if (this.checkNode(pos, changePos, board) == "w")
            moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[0] += 2;
          if (this.checkNode(pos, changePos, board) == "w")
            moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[0]--;
          if (board[pos + changePos[0] + changePos[1] * 8] !== "e") break;
          moves.push(pos + changePos[0] + changePos[1] * 8);
          changePos[1] ++;
          if ((pos >>> 3) == 1 && board[pos + changePos[0] + changePos[1] * 8] === "e")
            moves.push(pos + changePos[0] + changePos[1] * 8);
        }
        
        break;
    }
    return moves;
  }
  checkNode(startPos, changePos, board) {
    if (!this.#isValidPos(startPos, changePos)) return false;
    const newPos = startPos + changePos[0] + changePos[1] * 8;
    if (board[newPos] == "e") return "e";
    return this.isPieceWhite(board[newPos]) ? "w" : "b";
  }
  getValidMovesForPiece(pos, board) {
    const moves = this.getMovesForPiece(pos, board);
    const validMoves = [];
    moves.forEach((move) => {
      const newBoard = stdBoard.cloneBoard(board);
      this.movePiece(pos, move, newBoard);
      if (this.isInCheck(newBoard[64] == "1", newBoard)) return;
      validMoves.push(move);
    });
    return validMoves;
  }
  isInCheck(isWhiteMove, board) {
    let kingPos,
      shortKing = isWhiteMove ? "K" : "k";
    for (let i = 0; i < 64; i++) {
      if (board[i] !== shortKing) continue;
      kingPos = i;
    }
    for (let i = 0; i < 64; i++) {
      if (board[i] !== "e" &&
        this.getMovesForPiece(i, board).find(
          (e) => e == kingPos
        )
      )
      return true;
    }
    return false;
  }
  #isValidPos(startPos, changePos) {
    const startY = startPos >>> 3,
      startX = startPos & 7;
    if (startX + changePos[0] >= 8 || startX + changePos[0] < 0) return false;
    if (startY + changePos[1] >= 8 || startY + changePos[1] < 0) return false;
    return true;
  }
  nameToShort(name) {
    return pieces.find((e) => e.name == name).short;
  }
  shortToName(short) {
    return pieces.find((e) => e.short == short.charAt(0)).name;
  }
  whitePiecesArr = ["K","Q","R","B","N","P"]
  blackPiecesArr = ["k","q","r","b","n","p"]
  isPieceWhite(piece) {
    //return piece == piece.toUpperCase();
    return this.whitePiecesArr.includes(piece)
  }
  isPieceBlack(piece) {
    //return piece == piece.toLowerCase();
    return this.blackPiecesArr.includes(piece)
  }
  toLowerCase(piece) {
    for(let i = 0;i<6;i++){
      if(piece == this.whitePiecesArr[i]){
        return this.blackPiecesArr[i];
      }
    }
    return piece;
  }
  boardKingPos(isWhite) {
    return 66 + 3 * isWhite;
  }
  boardRookPos(isWhite, leftRook) {
    return 65 + 3 * isWhite + 2 * !leftRook;
  }
}
const pieces = new Pieces();
