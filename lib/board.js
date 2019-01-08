import BoardNode from "./board_node";
import Edge from "./edge";
import MazePath from "./maze_path";

class Board {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.grid = this.generateGrid(this.size);

    // this.start = this.randomIndex(4);
    // this.end = this.randomIndex(4);
    // if (this.start === this.end) {
    //   new Board(this.ctx);
    // }
    this.tree = this.primsGenerate();
    new MazePath(this.tree, this.size, this.ctx);
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
        grid[row][col] = new BoardNode(up, down, left, right, row, col);
      }
    }

    return grid;
  }

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomIndex(max) {
    return { row: this.randomNum(0, max), col: this.randomNum(0, max) };
  }

  findMinEdge(array) {
    let minEdge = null;
    for (let i = 0; i < array.length; i++) {
      let edge = array[i];
      let destination = this.destinationNode(edge);
      if (
        (minEdge === null || edge.cost < minEdge.cost) &&
        !destination.visited
      ) {
        minEdge = edge;
      }
    }

    return minEdge;
  }

  destinationNode(edge) {
    let direction = edge.source[edge.direction];
    let destinationRow = direction.row;
    let destinationCol = direction.col;
    return this.grid[destinationRow][destinationCol];
  }

  createEdges(sourceNode, costs) {
    let output = [];
    for (let destination in costs) {
      let direction = costs[destination];
      if (direction !== null) {
        output.push(new Edge(sourceNode, direction, destination));
      }
    }
    return output;
  }

  primsGenerate() {
    let totalEdges = [];
    let startingNode = this.grid[0][0];
    let startingCosts = startingNode.neighborsCost;
    let minimumTree = new Array();
    startingNode.visited = true;
    totalEdges.push(...this.createEdges(startingNode, startingCosts));

    while (minimumTree.length < this.size * this.size - 1) {
      let minEdge = this.findMinEdge(totalEdges);
      let minNode = this.destinationNode(minEdge);
      let minNodeCosts = minNode.neighborsCost;
      minNode.visited = true;
      minimumTree.push(minEdge);
      totalEdges.push(...this.createEdges(minNode, minNodeCosts));
    }

    return minimumTree;
  }
}

export default Board;
