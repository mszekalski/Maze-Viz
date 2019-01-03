import Node from "./node";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateGrid(30);

    this.start = { row: this.randomNum(0, 29), col: this.randomNum(0, 29) };
    this.end = { row: this.randomNum(0, 29), col: this.randomNum(0, 29) };
    // if (this.start === this.end) {
    //   new Board(this.ctx);
    // }
  }

  generateGrid(size) {
    let grid = new Array(size);
    for (let row = 0; row < grid.length; row++) {
      grid[row] = new Array(size);
      for (let col = 0; col < grid[row].length; col++) {
        let up = this.randomNum(1, 100);
        let down = this.randomNum(1, 100);
        let left = this.randomNum(1, 100);
        let right = this.randomNum(1, 100);
        if (row === 0) {
          up = null;
        }
        if (row === grid.length - 1) {
          down = null;
        }
        if (col === 0) {
          left = null;
        }
        if (col === grid[row].length - 1) {
          right = null;
        }
        grid[row][col] = new Node(up, down, left, right, row, col);
      }
    }
    return grid;
  }

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export default Board;
