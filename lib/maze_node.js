import Node from "./node";

class MazeNode extends Node {
  constructor(rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);

    this.children = { up: null, down: null, left: null, right: null };
  }

  up() {
    return { row: this.coords.row - 2, col: this.coords.col };
  }

  down() {
    return { row: this.coords.row + 2, col: this.coords.col };
  }

  left() {
    return { row: this.coords.row, col: this.coords.col - 2 };
  }
  right() {
    return { row: this.coords.row, col: this.coords.col + 2 };
  }
}

export default MazeNode;
