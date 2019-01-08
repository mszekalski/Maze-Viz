class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.visited = false;
    this.coords = { row: rowCoord, col: colCoord };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.coords.row, this.coords.col, 25, 25);
  }
}

export default Node;
