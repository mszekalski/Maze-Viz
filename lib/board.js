import Node from "./node";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = new Array(20);
    for (let row = 0; row < this.grid.length; row++) {
      this.grid[row] = new Array(20);
      for (let col = 0; col < this.grid[row].length; col++) {
        let up = this.randomNum(1, 100);
        let down = this.randomNum(1, 100);
        let left = this.randomNum(1, 100);
        let right = this.randomNum(1, 100);
        if (row === 0) {
          up = null;
        }
        if (row === this.grid.length - 1) {
          down = null;
        }
        if (col === 0) {
          left = null;
        }
        if (col === this.grid[row].length - 1) {
          right = null;
        }
        this.grid[row][col] = new Node(up, down, left, right);
      }
    }
    // this.start =
    // this.end =
  }

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export default Board;
