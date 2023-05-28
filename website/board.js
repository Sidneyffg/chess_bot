class Board {
  constructor(board, moved, pawnMoves) {
    this.board = board;
    this.moved = moved;
    this.pawnMoves = pawnMoves;
  }
  board;
  moved;
  pawnMoves;
  isWhiteTurn = true;
  dots = [];
  selectedNode = null;
  moveNum = 0;

  resetSelectedNode(resetBoard) {
    this.selectedNode = null;
    this.dots = [];
    if (resetBoard) {
      this.resetBoard();
    }
  }
  cloneBoard() {
    const newBoard = new Board(
      JSON.parse(JSON.stringify(this.board)),
      JSON.parse(JSON.stringify(this.moved))
    );
    newBoard.isWhiteTurn = this.isWhiteTurn;
    return newBoard;
  }
}

class StdBoard extends Board {
  constructor(board) {
    super(
      board,
      [
        {
          name: "rw1",
          moved: false,
        },
        {
          name: "rw2",
          moved: false,
        },
        {
          name: "kw",
          moved: true,
        },
        {
          name: "rb1",
          moved: true,
        },
        {
          name: "rb2",
          moved: true,
        },
        {
          name: "kb",
          moved: true,
        },
      ],
      []
    );
    this.resetBoard();
  }
  htmlBoard = document.getElementById("board");
  resetBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const node = this.htmlBoard.children[i].children[j];
        node.classList = "";
        node.onclick = () => {
          this.clickNode({ x: j, y: i });
        };
        if (!this.board[i][j]) {
          node.innerHTML = ``;
          continue;
        }
        node.innerHTML = `<img src="./website/images/${this.board[i][j]}.png">`;
      }
    }
    this.dots.forEach((pos) => {
      this.htmlBoard.children[pos.y].children[pos.x].classList.add("dot");
    });
    if (!this.selectedNode) return;
    this.htmlBoard.children[this.selectedNode.y].children[
      this.selectedNode.x
    ].classList.add("selected");
  }
  clickNode(node) {
    if (this.dots.find((e) => e.x == node.x && e.y == node.y)) {
      pieces.movePiece(this.selectedNode, node, stdBoard);
      this.isWhiteTurn = !this.isWhiteTurn;
      this.resetBoard();
      const ended = this.hasGameEnded();
      if (ended)
        console.log((this.isWhiteTurn ? "Black" : "White") + " has won!");
      else if (ended == null) console.log("Stalemate");
      else
        setTimeout(() => {
          bot.genNewMove(this);
          this.isWhiteTurn = !this.isWhiteTurn;
        }, 100);
      return;
    } else if (!this.board[node.y][node.x]) {
      this.resetSelectedNode(true);
      return;
    }
    if ((this.board[node.y][node.x].charAt(1) == "w") !== this.isWhiteTurn) {
      this.resetSelectedNode(true);
      return;
    }
    this.dots = pieces.getValidMovesForPiece(node, stdBoard);
    this.selectedNode = node;
    this.resetBoard();
  }
  hasGameEnded() {
    const color = this.isWhiteTurn ? "w" : "b";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j].charAt(1) != color) continue;
        if (pieces.getValidMovesForPiece({ x: j, y: i }, this).length !== 0) {
          return false;
        }
      }
    }
    if (pieces.isInCheck(this.isWhiteTurn, this)) return true;
    return null;
  }
}

const stdBoard = new StdBoard([
  ["", "", "", "rb", "", "rb", "kb", ""],
  ["", "", "", "", "", "pb", "bb", "pb"],
  ["", "pb", "qb", "", "pb", "", "pb", ""],
  ["pb", "", "", "pb", "", "", "", ""],
  ["", "", "pw", "pw", "pw", "", "", ""],
  ["", "pw", "", "bw", "", "qw", "pw", ""],
  ["", "", "", "", "", "", "pw", "pw"],
  ["rw", "", "", "", "", "rw", "kw", ""],
]);
const bot = new Bot(false);
/* std board 
["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"],
["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["pw", "pw", "pw", "pw", "pw", "pw", "pw", "pw"],
["rw", "nw", "bw", "qw", "kw", "bw", "nw", "rw"],

["", "", "", "", "", "rb", "kb", ""],
  ["pb", "pb", "pb", "", "", "", "pb", ""],
  ["", "", "", "", "", "rb", "", ""],
  ["", "", "", "pb", "pb", "", "bw", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "pw", "", "", "pw", "qb"],
  ["pw", "pw", "pw", "", "", "", "", ""],
  ["rw", "", "", "", "", "qw", "kw", "rw"],
*/
