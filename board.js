class Board {
  constructor(id) {
    this.id = id;
    this.resetBoard();
  }
  htmlBoard = document.getElementById("board");
  board = [
    ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"],
    ["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pw", "pw", "pw", "pw", "pw", "pw", "pw", "pw"],
    ["rw", "nw", "bw", "qw", "kw", "bw", "nw", "rw"],
  ];
  moved = [
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
      moved: false,
    },
    {
      name: "rb1",
      moved: false,
    },
    {
      name: "rb2",
      moved: false,
    },
    {
      name: "kb",
      moved: false,
    },
  ];
  isWhiteTurn = true;
  dots = [];
  selectedNode = null;
  resetBoard() {
    console.log("board reset");
    if (this.id !== "stdBoard") return;
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
        node.innerHTML = `<img src="./images/${this.board[i][j]}.png">`;
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
      return;
    } else if (!this.board[node.y][node.x]) {
      this.resetSelectedNode(true);
      return;
    }
    if ((this.board[node.y][node.x].charAt(1) == "w") !== this.isWhiteTurn) {
      this.resetSelectedNode(true);
      return;
    }
    this.dots = pieces.getMovesForPiece(node, stdBoard);
    this.selectedNode = node;
    this.resetBoard();
  }
  resetSelectedNode(resetBoard) {
    this.selectedNode = null;
    this.dots = [];
    if (resetBoard) {
      this.resetBoard();
    }
  }
  cloneBoard() {
    const newBoard = new Board("oui");
    newBoard.board = Object.assign({}, this.board);
    newBoard.moved = Object.assign({}, this.moved);
    return newBoard;
  }
}

const stdBoard = new Board("stdBoard");

/* std board 
["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"],
["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", ""],
["pw", "pw", "pw", "pw", "pw", "pw", "pw", "pw"],
["rw", "nw", "bw", "qw", "kw", "bw", "nw", "rw"],
*/
