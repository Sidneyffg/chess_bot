const boardBoard =
["r","n","b","q","k","b","n","r","p","p","p","p","p","p","p","p","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","P","P","P","P","P","P","P","P","R","N","B","Q","K","B","N","R","1","0","0","0","0","0","0"];
//stdBoard rnbqkbnrppppppppeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeePPPPPPPPRNBQKBNR1000000
//pieces -> isWhiteTurn -> r/k moved
/*class Board {
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
}*/

class Board {
  constructor(board) {
    this.board = board;
    this.resetBoard();
  }
  dots = []
  selectedNode = null
  htmlBoard = document.getElementById("board");
  perft(){
    this.board[64] = "1"
    bot.genNewMove(this.board);
    console.log("perft: " + count2)
  }
  resetBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let pos = i*8+j;
        const node = this.htmlBoard.children[i].children[j];
        node.classList = "";
        node.onclick = () => {
          this.clickNode(pos);
        };
        if (this.board[pos] == "e") {
          node.innerHTML = ``;
          continue;
        }
        let isWhite = pieces.isPieceWhite(this.board[pos])
        node.innerHTML = `<img src="./website/images/${pieces.toLowerCase(this.board[pos]) + (isWhite ? "w":"b")}.png">`;
      }
    }
    this.dots.forEach((pos) => {
      let y = pos>>>3;
      this.htmlBoard.children[y].children[pos - y*8].classList.add("dot");
    });
    if (!this.selectedNode) return;
    let y = this.selectedNode>>>3;
    this.htmlBoard.children[y].children[
      this.selectedNode - y*8
    ].classList.add("selected");
  }
  clickNode(node) {
    console.log(node)
    if (this.dots.includes(node)) {
      pieces.movePiece(this.selectedNode, node, this.board);
      this.board[64] = this.board[64] == "1"?"0":"1"
      this.resetSelectedNode(true)
      const ended = this.hasGameEnded();
      if (ended)
        console.log((this.board[64] == "1" ? "Black" : "White") + " has won!");
      else if (ended == null) console.log("Stalemate");
      else
        setTimeout(() => {
          bot.genNewMove(this.board);
          this.board[64] = this.board[64] == "1" ? "0":"1"
        }, 100);
      return;
    } else if (this.board[node] == "e") {
      this.resetSelectedNode(true);
      return;
    }
    if (pieces.isPieceWhite(this.board[node]) !== (this.board[64] == "1")) {
      this.resetSelectedNode(true);
      return;
    }
    this.dots = pieces.getValidMovesForPiece(node, this.board);
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
  hasGameEnded() {
    for (let i = 0; i < 64; i++) {
      if (pieces.isPieceBlack(this.board[i]) == (this.board[64] == "1")) continue;
      //console.log(this.board[i], this.board[64])
      if (pieces.getValidMovesForPiece(i, this.board).length !== 0) {
        return false;
      }
    }
    if (pieces.isInCheck(this.board[64] == "1", this.board)) return true;
    return null;
  }
  cloneBoard(board) {
    return board.slice(0)
  }
}
let count2 = 0;
const stdBoard = new Board(boardBoard);
console.log(stdBoard)
const bot = new Bot(false);

