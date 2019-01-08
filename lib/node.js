class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.visited = false;
    this.coords = { row: rowCoord, col: colCoord };
    this.ctx = ctx;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.coords.row * 25, this.coords.col * 25, 25, 25);
  }
}

export default Node;
