import Node from "./node";

class BoardNode extends Node {
  constructor(upCost, downCost, leftCost, rightCost, rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);
    this.neighborsCost = {
      up: upCost,
      down: downCost,
      left: leftCost,
      right: rightCost
    };
    this.up = this.neighborsCost.up
      ? { row: this.coords.row - 1, col: this.coords.col }
      : null;
    this.down = this.neighborsCost.down
      ? { row: this.coords.row + 1, col: this.coords.col }
      : null;
    this.left = this.neighborsCost.left
      ? { row: this.coords.row, col: this.coords.col - 1 }
      : null;
    this.right = this.neighborsCost.right
      ? { row: this.coords.row, col: this.coords.col + 1 }
      : null;
    this.ctx = ctx;
  }
}

export default BoardNode;
