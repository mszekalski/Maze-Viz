import MazePath from "./maze_path";
import MazeNode from "./maze_node";

class Solvers {
  constructor(ctx, startNode, endNode, grid) {
    this.ctx = ctx;
    this.startNode = startNode;
    this.endNode = endNode;
    this.grid = grid;
    this.steps = 0;
    this.depthFirstSolution = this.depthFirstSolution.bind(this);
    this.breadthFirstSolution = this.breadthFirstSolution.bind(this);
    document
      .getElementById("depth-first")
      .addEventListener("click", this.depthFirstSolution);
    document.getElementById("reset").addEventListener("click", this.resetGrid);
    document
      .getElementById("breadth-first")
      .addEventListener("click", this.breadthFirstSolution);
  }

  render(ctx, row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  depthFirstSolution() {
    let visited = this.depthFirstSearch(this.startNode, this.endNode);
    let ctx = this.ctx;

    setTimeout(() => {
      let j = 0;

      let intervalId = setInterval(() => {
        if (j === visited.length - 2) {
          clearInterval(intervalId);
        }
        let node = visited[visited.length - j - 1];
        let nextNode = visited[visited.length - j - 2];
        let edgeRow = (node.coords.row + nextNode.coords.row) / 2;
        let edgeCol = (node.coords.col + nextNode.coords.col) / 2;
        if (j !== 0) {
          this.render(ctx, node.coords.row, node.coords.col, "blue");
          this.render(ctx, edgeRow, edgeCol, "blue");
        } else if (j === 0) {
          this.render(ctx, edgeRow, edgeCol, "blue");
        }
        j++;
      }, 50);
    }, this.steps * 10);
  }

  depthFirstSearch(currNode, endNode, visited = []) {
    this.steps++;
    let ctx = this.ctx;
    if (currNode === endNode) {
      visited.unshift(currNode);
      return visited;
    }
    if (visited.includes(currNode)) return;
    for (let dir in currNode.children) {
      if (currNode.children[dir] !== null) {
        let coords;
        coords = currNode[dir]();
        let nextNode = this.grid[coords.row][coords.col];
        setTimeout(() => {
          if (currNode !== this.startNode && currNode !== this.endNode) {
            this.render(ctx, currNode.coords.row, currNode.coords.col, "grey");
          }
          let edgeRow = (currNode.coords.row + nextNode.coords.row) / 2;
          let edgeCol = (currNode.coords.col + nextNode.coords.col) / 2;
          this.render(ctx, edgeRow, edgeCol, "grey");
        }, this.steps * 10);
        let rest = this.depthFirstSearch(nextNode, endNode, [
          currNode,
          ...visited
        ]);
        if (rest) {
          return rest;
        }
      }
    }
  }

  breadthFirstSearch(startNode, endNode) {
    let ctx = this.ctx;
    const set = new Set();
    let queue = [];
    queue.push(startNode);
    set.add(startNode);
    while (queue.length) {
      this.steps++;
      let currNode = queue.shift();
      set.add(currNode);
      if (currNode === endNode) return;
      setTimeout(() => {
        if (currNode !== startNode && currNode !== endNode) {
          this.render(ctx, currNode.coords.row, currNode.coords.col, "grey");
        }
      }, this.steps * 10);
      let currChildren = currNode.children;
      for (let dir in currChildren) {
        if (currChildren[dir] !== null) {
          let coords;
          coords = currNode[dir]();
          let nextNode = this.grid[coords.row][coords.col];
          if (set.has(nextNode)) {
            continue;
          }
          queue.push(nextNode);
        }
      }
    }
  }
  breadthFirstSolution() {
    this.breadthFirstSearch(this.startNode, this.endNode);
  }
}

export default Solvers;
