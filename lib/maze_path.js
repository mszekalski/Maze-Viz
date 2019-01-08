import MazeNode from "./maze_node";
import Board from "./board";

class MazePath {
  constructor(tree, size, ctx) {
    this.size = size * 2 - 1;
    this.tree = tree;
    this.ctx = ctx;
    this.grid = this.generateGrid(this.size);
    this.path = this.generateMaze(this.tree, this.ctx);
    this.visualize();
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

  createDestNode(edge) {
    let sourceRow = edge.source.coords.row * 2;
    let sourceCol = edge.source.coords.col * 2;
    let node;
    if (edge.direction === "down") {
      node = new MazeNode(sourceRow + 2, sourceCol);
      node.children.up = true;
    } else if (edge.direction === "up") {
      node = new MazeNode(sourceRow - 2, sourceCol);
      node.children.down = true;
    } else if (edge.direction === "left") {
      node = new MazeNode(sourceRow, sourceCol - 2);
      node.children.right = true;
    } else {
      node = new MazeNode(sourceRow, sourceCol + 2);
      node.children.left = true;
    }
    return node;
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

  adjustGrid(sourceNode, direction, destNode) {
    sourceNode.children[direction] = true;
    let row = sourceNode.coords.row;
    let col = sourceNode.coords.col;
    if (direction === "down") {
      this.grid[row + 1][col] = "path";
      this.grid[row + 2][col] = destNode;
    } else if (direction === "up") {
      this.grid[row - 1][col] = "path";
      this.grid[row - 2][col] = destNode;
    } else if (direction === "right") {
      this.grid[row][col + 1] = "path";
      this.grid[row][col + 2] = destNode;
    } else {
      this.grid[row][col - 1] = "path";
      this.grid[row][col - 2] = destNode;
    }
  }

  generateMaze(tree, ctx) {
    for (let i = 0; i < tree.length; i++) {
      let edge = tree[i];
      let direction = edge.direction;
      let sourceRow = edge.source.coords.row * 2;
      let sourceCol = edge.source.coords.col * 2;
      let destNode = this.createDestNode(edge);
      if (this.grid[sourceRow][sourceCol] === null) {
        let sourceNode = new MazeNode(sourceRow, sourceCol);
        this.grid[sourceRow][sourceCol] = sourceNode;
        this.adjustGrid(sourceNode, direction, destNode);
      } else {
        let sourceNode = this.grid[sourceRow][sourceCol];
        this.adjustGrid(sourceNode, direction, destNode);
      }
    }
    return this.grid;
  }
}

export default MazePath;
