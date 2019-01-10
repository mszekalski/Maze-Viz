import MazeNode from "./maze_node";
import Board from "./board";

class MazePath {
  constructor(tree, size, ctx) {
    this.size = size * 2 - 1;
    this.tree = tree;
    this.ctx = ctx;
    this.grid = this.generateGrid(this.size);
    this.path = this.generateMaze(this.tree, this.ctx);
    // this.visualize();
  }

  visualize() {
    for (let i = 0; i < this.path.length; i++) {
      let array = [];
      for (let j = 0; j < this.path[i].length; j++) {
        if (this.path[i][j] instanceof MazeNode) {
          array.push("N");
        } else if (this.path[i][j] === "path") {
          array.push("E");
        } else {
          array.push("X");
        }
      }
      console.log(...array);
    }
  }

  markGrid(sourceNode, direction) {
    sourceNode.children[direction] = true;
    let row = sourceNode.coords.row;
    let col = sourceNode.coords.col;
    if (direction === "down") {
      let destNode = new MazeNode(row + 2, col, this.ctx);
      this.grid[row + 2][col] = destNode;
      destNode.children.up = true;
      destNode.draw(this.ctx);
      this.grid[row + 1][col] = "path";
      this.draw(this.ctx, row + 1, col);
    } else if (direction === "up") {
      let destNode = new MazeNode(row - 2, col, this.ctx);
      destNode.children.down = true;
      this.grid[row - 2][col] = destNode;
      destNode.draw(this.ctx);
      this.grid[row - 1][col] = "path";
      this.draw(this.ctx, row - 1, col);
    } else if (direction === "right") {
      let destNode = new MazeNode(row, col + 2, this.ctx);
      destNode.children.left = true;
      this.grid[row][col + 2] = destNode;
      destNode.draw(this.ctx);
      this.grid[row][col + 1] = "path";
      this.draw(this.ctx, row, col + 1);
    } else {
      let destNode = new MazeNode(row, col - 2, this.ctx);
      destNode.children.right = true;
      this.grid[row][col - 2] = destNode;
      destNode.draw(this.ctx);
      this.grid[row][col - 1] = "path";
      this.draw(this.ctx, row, col - 1);
    }
  }

  draw(ctx, row, col) {
    ctx.fillStyle = "white";
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  generateGrid(size) {
    let path = new Array(size);
    for (let row = 0; row < path.length; row++) {
      path[row] = new Array(size);
      for (let col = 0; col < path[row].length; col++) {
        path[row][col] = null;
      }
    }
    return path;
  }

  generateMaze(tree, ctx) {
    tree.forEach((edge, index) => {
      let direction = edge.direction;
      let sourceRow = edge.source.coords.row * 2;
      let sourceCol = edge.source.coords.col * 2;
      let sourceNode = this.grid[sourceRow][sourceCol];
      if (sourceNode === null) {
        sourceNode = new MazeNode(sourceRow, sourceCol, this.ctx);
        this.grid[sourceRow][sourceCol] = sourceNode;
      }
      setTimeout(() => {
        sourceNode.draw(this.ctx);
        this.markGrid(sourceNode, direction);
      }, index * 10);
    });
  }
}

export default MazePath;
