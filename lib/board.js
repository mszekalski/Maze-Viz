import Node from "./node";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateGrid(30);

    this.start = this.randomIndex(29);
    this.end = this.randomIndex(29);
    // if (this.start === this.end) {
    //   new Board(this.ctx);
    // }
    this.primsGenerate();
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

  randomIndex(max) {
    return { row: this.randomNum(0, max), col: this.randomNum(0, max) };
  }

  primsGenerate() {
    let startingNode = this.grid[0][0];
    startingNode.visited = true;
    let totalEdges = [];
    let minimumTree = new Set();
    minimumTree.add(startingNode);
    let costs = startingNode.neighborsCost;
    let minNode;
    let minCost = null;
    for (let direction in costs) {
      if (costs[direction] !== null) {
        totalEdges.push({
          destination: this.grid[startingNode[direction].row][
            startingNode[direction].col
          ],
          cost: costs[direction]
        });
      }
    }
    for (let i = 0; i < totalEdges.length; i++) {
      let edge = totalEdges[i];
      if (
        (edge.cost < minCost || minCost === null) &&
        edge.destination.visited !== true
      ) {
        minCost = edge.cost;
        minNode = edge.destination;
      }
    }
    minNode.visited = true;
    minimumTree.add(minNode);
    console.log(minimumTree);
  }
}

export default Board;
