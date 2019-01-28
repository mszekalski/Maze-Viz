class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.coords = { row: rowCoord, col: colCoord };
    this.ctx = ctx;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.coords.col * 10 + 10, this.coords.row * 10 + 10, 10, 10);
  }

  drawSolution(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.coords.col * 10 + 10, this.coords.row * 10 + 10, 10, 10);
  }
  drawVisited(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.coords.col * 10 + 10, this.coords.row * 10 + 10, 10, 10);
  }
}

export default Node;
