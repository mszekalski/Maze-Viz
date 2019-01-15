import Node from "./node";

class MazeNode extends Node {
  constructor(rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);

    this.children = { up: null, down: null, left: null, right: null };
  }

  up() {
    if (this.children.up) {
      return { row: this.coords.row - 2, col: this.coords.col };
    } else {
      return null;
    }
  }

  down() {
    if (this.children.down) {
      return { row: this.coords.row + 2, col: this.coords.col };
    } else {
      return null;
    }
  }

  left() {
    if (this.children.left) {
      return { row: this.coords.row, col: this.coords.col - 2 };
    } else {
      return null;
    }
  }
  right() {
    if (this.children.right) {
      return { row: this.coords.row, col: this.coords.col + 2 };
    } else {
      return null;
    }
  }
}

export default MazeNode;
