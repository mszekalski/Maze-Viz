import MazeNode from "./maze_node";
import Board from "./board";

class MazePath {
  constructor(tree, size, ctx) {
    this.size = size * 2 - 1;
    this.tree = tree;
    this.ctx = ctx;
    this.path = this.generateMaze(this.size, this.tree, this.ctx);
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

  generateMaze(size, tree, ctx) {
    let grid = this.generateGrid(size);

    for (let i = 0; i < tree.length; i++) {
      let edge = tree[i];
      let direction = edge.direction;
      let sourceRow = edge.source.coords.row * 2;
      let sourceCol = edge.source.coords.col * 2;
      let destNode = this.createDestNode(edge);
      if (grid[sourceRow][sourceCol] === null) {
        let sourceNode = new MazeNode(sourceRow, sourceCol);
        sourceNode.children[direction] = true;
        grid[sourceRow][sourceCol] = sourceNode;

        if (direction === "down") {
          grid[sourceRow + 1][sourceCol] = "path";
          grid[sourceRow + 2][sourceCol] = destNode;
        } else if (direction === "up") {
          grid[sourceRow - 1][sourceCol] = "path";
          grid[sourceRow - 2][sourceCol] = destNode;
        } else if (direction === "right") {
          grid[sourceRow][sourceCol + 1] = "path";
          grid[sourceRow][sourceCol + 2] = destNode;
        } else {
          grid[sourceRow][sourceCol - 1] = "path";
          grid[sourceRow][sourceCol - 2] = destNode;
        }
      } else {
        let sourceNode = grid[sourceRow][sourceCol];
        sourceNode.children[direction] = true;
        if (direction === "down") {
          grid[sourceRow + 1][sourceCol] = "path";
          grid[sourceRow + 2][sourceCol] = destNode;
        } else if (direction === "up") {
          grid[sourceRow - 1][sourceCol] = "path";
          grid[sourceRow - 2][sourceCol] = destNode;
        } else if (direction === "right") {
          grid[sourceRow][sourceCol + 1] = "path";
          grid[sourceRow][sourceCol + 2] = destNode;
        } else {
          grid[sourceRow][sourceCol - 1] = "path";
          grid[sourceRow][sourceCol - 2] = destNode;
        }
      }
    }
    return grid;
  }
}

export default MazePath;
