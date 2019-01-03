class Node {
  constructor(upCost, downCost, leftCost, rightCost, rowCoord, colCoord) {
    this.neighborsCost = {
      up: upCost,
      down: downCost,
      left: leftCost,
      right: rightCost
    };
    this.coords = { row: rowCoord, col: colCoord };
    this.neighborsCost.up === null
      ? (this.up = null)
      : (this.up = { row: this.coords.row - 1, col: this.coords.col });
    this.neighborsCost.down === null
      ? (this.down = null)
      : (this.down = { row: this.coords.row + 1, col: this.coords.col });
    this.neighborsCost.left === null
      ? (this.left = null)
      : (this.left = { row: this.coords.row, col: this.coords.col - 1 });
    this.neighborsCost.right === null
      ? (this.right = null)
      : (this.right = { row: this.coords.row, col: this.coords.col + 1 });
  }
}

export default Node;