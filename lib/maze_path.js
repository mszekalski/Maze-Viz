import Node from "./node";
import Board from "./board";

class MazePath {
  constructor(tree, size) {
    this.tree = tree;

    this.generateMaze(this.tree);
  }

  generateMaze(size, tree) {
    let grid = new Array(size);
    for (let row = 0; row < grid.length; row++) {
      grid[row] = new Array(size);
    }
  }
}

export default MazePath;
