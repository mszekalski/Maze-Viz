import Node from "./node";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateGrid(10);

    // this.start = this.randomIndex(4);
    // this.end = this.randomIndex(4);
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

  findMinEdge(array) {
    let minEdge = null;
    for (let i = 0; i < array.length; i++) {
      let edge = array[i];
      let destination = this.grid[edge.source[edge.direction].row][
        edge.source[edge.direction].col
      ];
      if (
        (minEdge === null || edge.cost < minEdge.cost) &&
        !destination.visited
      ) {
        minEdge = edge;
      }
    }

    return minEdge;
  }

  createEdges(node, costs) {
    let output = [];
    for (let destination in costs) {
      if (costs[destination] !== null) {
        output.push({
          source: node,
          cost: costs[destination],
          direction: destination
        });
      }
    }

    return output;
  }

  primsGenerate() {
    let startingNode = this.grid[0][0];
    let totalEdges = [];
    let startingCosts = startingNode.neighborsCost;
    let minimumTree = new Set();
    startingNode.visited = true;
    totalEdges = totalEdges.concat(
      this.createEdges(startingNode, startingCosts)
    );

    while (minimumTree.size < 10 * 10 - 1) {
      let minEdge = this.findMinEdge(totalEdges);
      console.log(minimumTree);
      let minNode = this.grid[minEdge.source[minEdge.direction].row][
        minEdge.source[minEdge.direction].col
      ];
      let minNodeCosts = minNode.neighborsCost;
      minNode.visited = true;
      minimumTree.add(minEdge);
      totalEdges = totalEdges.concat(this.createEdges(minNode, minNodeCosts));
    }
    console.log(totalEdges);
  }
}

export default Board;
