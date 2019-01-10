class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.visited = false;
    this.coords = { row: rowCoord, col: colCoord };
    this.ctx = ctx;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.coords.col * 10 + 10, this.coords.row * 10 + 10, 10, 10);
  }
}

export default Node;
