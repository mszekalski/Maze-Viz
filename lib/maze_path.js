import Node from "./node";
import Board from "./board";

class MazePath {
  constructor(tree, size) {
    this.size = size;
    this.tree = tree;
    this.path = this.generateMaze(this.size, this.tree);
    this.visualize();
  }

  visualize() {
    for (let i = 0; i < this.path.length; i++) {
      let array = [];
      for (let j = 0; j < this.path[i].length; j++) {
        if (this.path[i][j] instanceof Node) {
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
      node = new Node(null, null, null, null, sourceRow + 2, sourceCol);
      node.neighborsCost.up = true;
    } else if (edge.direction === "up") {
      node = new Node(null, null, null, null, sourceRow - 2, sourceCol);
      node.neighborsCost.down = true;
    } else if (edge.direction === "left") {
      node = new Node(null, null, null, null, sourceRow, sourceCol - 2);
      node.neighborsCost.right = true;
    } else {
      node = new Node(null, null, null, null, sourceRow, sourceCol + 2);
      node.neighborsCost.left = true;
    }
    return node;
  }

  generateMaze(size, tree) {
    let path = new Array(size);
    for (let row = 0; row < path.length; row++) {
      path[row] = new Array(size);
      for (let col = 0; col < path[row].length; col++) {
        path[row][col] = null;
      }
    }

    for (let i = 0; i < tree.length; i++) {
      let edge = tree[i];
      let direction = edge.direction;
      let sourceRow = edge.source.coords.row * 2;
      let sourceCol = edge.source.coords.col * 2;
      let destNode = this.createDestNode(edge);
      if (path[sourceRow][sourceCol] === null) {
        let sourceNode = new Node(null, null, null, null, sourceRow, sourceCol);
        sourceNode.neighborsCost[direction] = true;
        path[sourceRow][sourceCol] = sourceNode;
        if (direction === "down") {
          path[sourceRow + 1][sourceCol] = "path";
          path[sourceRow + 2][sourceCol] = destNode;
        } else if (direction === "up") {
          path[sourceRow - 1][sourceCol] = "path";
          path[sourceRow - 2][sourceCol] = destNode;
        } else if (direction === "right") {
          path[sourceRow][sourceCol + 1] = "path";
          path[sourceRow][sourceCol + 2] = destNode;
        } else {
          path[sourceRow][sourceCol - 1] = "path";
          path[sourceRow][sourceCol - 2] = destNode;
        }
      } else {
        let sourceNode = path[sourceRow][sourceCol];
        sourceNode.neighborsCost[direction] = true;
        if (direction === "down") {
          path[sourceRow + 1][sourceCol] = "path";
          path[sourceRow + 2][sourceCol] = destNode;
        } else if (direction === "up") {
          path[sourceRow - 1][sourceCol] = "path";
          path[sourceRow - 2][sourceCol] = destNode;
        } else if (direction === "right") {
          path[sourceRow][sourceCol + 1] = "path";
          path[sourceRow][sourceCol + 2] = destNode;
        } else {
          path[sourceRow][sourceCol - 1] = "path";
          path[sourceRow][sourceCol - 2] = destNode;
        }
      }
    }
    return path;
  }
}

export default MazePath;
