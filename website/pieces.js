class Pieces {
  pieces = [
    {
      name: "king",
      short: "k",
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
    },
  ];
  getMoves() {}
  movePiece(startPos, endPos, board) {
    console.log(startPos, endPos, board);
    const piece = board.board[startPos.y][startPos.x],
      isWhite = piece.charAt(1) == "w" ? true : false,
      sideShort = isWhite ? "w" : "b";
    switch (piece.charAt(0)) {
      case "k":
        if (
          board.moved.find((e) => e.name == "k" + sideShort).moved ||
          (endPos.x !== 2 && endPos.x !== 6) ||
          startPos.x !== 4
        ) {
          board.moved.find((e) => e.name == "k" + sideShort).moved = true;
          break;
        }
        if (isWhite) {
          if (endPos.x == 2) {
            board.board[7][0] = "";
            board.board[7][3] = "rw";
          } else {
            board.board[7][7] = "";
            board.board[7][5] = "rw";
          }
        } else {
          if (endPos.x == 2) {
            board.board[0][0] = "";
            board.board[0][3] = "rb";
          } else {
            board.board[0][7] = "";
            board.board[0][5] = "rb";
          }
        }
        board.moved.find((e) => e.name == "k" + sideShort).moved = true;
        break;
      case "r":
        if (
          (startPos.x !== 0 && startPos.x !== 7) ||
          (startPos.y !== 0 && startPos.y !== 7)
        )
          break;
        board.moved.find(
          (e) => e.name == "r" + sideShort + (startPos.x == 0 ? "1" : "2")
        ).moved = true;
        console.log("r" + sideShort + (startPos.x == 0 ? "1" : "2"));
        break;
    }
    
    board.board[endPos.y][endPos.x] = board.board[startPos.y][startPos.x];
    board.board[startPos.y][startPos.x] = "";
    console.log(JSON.parse(JSON.stringify(board)))

    board.resetSelectedNode(true);
  }
  getMovesForPiece(pos, board) {
    const piece = board.board[pos.y][pos.x],
      moves = [],
      isWhite = piece.charAt(1) == "w";
    switch (piece.charAt(0)) {
      case "k":
        this.pieces
          .find((e) => e.short == "k")
          .moves.forEach((move) => {
            const movePos = { x: pos.x + move[0], y: pos.y + move[1] };
            if (!this.#isValidPos(movePos)) return;
            if (
              board.board[movePos.y][movePos.x] !== "" &&
              board.board[movePos.y][movePos.x].charAt(1) == piece.charAt(1)
            )
              return;
            moves.push(movePos);
          });
        if (isWhite) {
          if (board.moved.find((e) => e.name == "kw").moved) break;
          if (
            board.board[7][0] == "rw" &&
            board.board[7][1] == "" &&
            board.board[7][2] == "" &&
            board.board[7][3] == "" &&
            !board.moved.find((e) => e.name == "rw1").moved
          )
            moves.push({ x: 2, y: 7 });
          if (
            board.board[7][5] == "" &&
            board.board[7][6] == "" &&
            board.board[7][7] == "rw" &&
            !board.moved.find((e) => e.name == "rw2").moved
          )
            moves.push({ x: 6, y: 7 });
        } else {
          if (board.moved.find((e) => e.name == "kb").moved) break;
          if (
            board.board[0][0] == "rb" &&
            board.board[0][1] == "" &&
            board.board[0][2] == "" &&
            board.board[0][3] == "" &&
            !board.moved.find((e) => e.name == "rb1").moved
          )
            moves.push({ x: 2, y: 0 });
          if (
            board.board[0][5] == "" &&
            board.board[0][6] == "" &&
            board.board[0][7] == "rb" &&
            !board.moved.find((e) => e.name == "rb2").moved
          )
            moves.push({ x: 6, y: 0 });
        }
        break;
      case "q":
        const qMoves = this.pieces.find((e) => e.short == "q").moves;
        for (let s = 0; s < 8; s++) {
          //side
          for (let i = 0; i < 7; i++) {
            const movePos = {
              x: pos.x + qMoves[s * 7 + i][0],
              y: pos.y + qMoves[s * 7 + i][1],
            };
            if (!this.#isValidPos(movePos)) break;
            if (board.board[movePos.y][movePos.x] !== "") {
              if (
                board.board[movePos.y][movePos.x].charAt(1) == piece.charAt(1)
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
            const movePos = {
              x: pos.x + rMoves[s * 7 + i][0],
              y: pos.y + rMoves[s * 7 + i][1],
            };
            if (!this.#isValidPos(movePos)) break;
            if (board.board[movePos.y][movePos.x] !== "") {
              if (
                board.board[movePos.y][movePos.x].charAt(1) == piece.charAt(1)
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
            const movePos = {
              x: pos.x + bMoves[s * 7 + i][0],
              y: pos.y + bMoves[s * 7 + i][1],
            };
            if (!this.#isValidPos(movePos)) break;
            if (board.board[movePos.y][movePos.x] !== "") {
              if (
                board.board[movePos.y][movePos.x].charAt(1) == piece.charAt(1)
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
            const movePos = { x: pos.x + move[0], y: pos.y + move[1] };
            if (!this.#isValidPos(movePos)) return;
            if (
              board.board[movePos.y][movePos.x] !== "" &&
              board.board[movePos.y][movePos.x].charAt(1) == piece.charAt(1)
            )
              return;
            moves.push(movePos);
          });
        break;
      case "p":
        if (isWhite) {
          const movePos = { x: pos.x - 1, y: pos.y - 1 };
          if (this.checkNode(movePos, board) == "b")
            moves.push(Object.assign({}, movePos));
          movePos.x += 2;
          if (this.checkNode(movePos, board) == "b")
            moves.push(Object.assign({}, movePos));
          movePos.x--;
          if (this.checkNode(movePos, board) !== "") break;
          moves.push(Object.assign({}, movePos));
          movePos.y--;
          if (pos.y == 6 && this.checkNode(movePos, board) === "")
            moves.push(movePos);
        } else {
          const movePos = { x: pos.x - 1, y: pos.y + 1 };
          if (this.checkNode(movePos, board) == "w")
            moves.push(Object.assign({}, movePos));
          movePos.x += 2;
          if (this.checkNode(movePos, board) == "w")
            moves.push(Object.assign({}, movePos));
          movePos.x--;
          if (this.checkNode(movePos, board) !== "") break;
          moves.push(Object.assign({}, movePos));
          movePos.y++;
          if (pos.y == 1 && this.checkNode(movePos, board) === "")
            moves.push(movePos);
        }
        break;
    }
    return moves;
  }
  checkNode(pos, board) {
    if (!this.#isValidPos(pos)) return false;
    if (board.board[pos.y][pos.x] == "") return "";
    return board.board[pos.y][pos.x].charAt(1);
  }
  getValidMovesForPiece(pos, board) {
    const moves = this.getMovesForPiece(pos, board);
    const validMoves = [];
    moves.forEach((move, idx) => {
      const newBoard = board.cloneBoard();
      console.log(newBoard);
      this.movePiece(pos, move, newBoard);
      if (this.isInCheck(!newBoard.isWhiteMove, newBoard)) return;
      validMoves.push(move);
    });
    return validMoves;
  }
  isInCheck(isWhiteMove, board) {
    const kingPos = {},
      shortKing = "k" + (isWhiteMove ? "w" : "b");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board.board[i][j] !== shortKing) continue;
        kingPos.x = j;
        kingPos.y = i;
      }
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          this.getMovesForPiece({ x: j, y: i }, board).find(
            (e) => e.x == kingPos.x && e.y == kingPos.y
          )
        )
          return true;
      }
    }
    return false;
  }
  #isValidPos(...args) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].x >= 8 || args[i].x < 0) return false;
      if (args[i].y >= 8 || args[i].y < 0) return false;
    }
    return true;
  }
  nameToShort(name) {
    return pieces.find((e) => e.name == name).short;
  }
  shortToName(short) {
    return pieces.find((e) => e.short == short.charAt(0)).name;
  }
}
const pieces = new Pieces();
