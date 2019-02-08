class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.coords = { row: rowCoord, col: colCoord };
    this.ctx = ctx;
  }
}

export default Node;
