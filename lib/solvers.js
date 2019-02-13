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
    this.setTimeouts = [];
    this.setIntervals = [];

    this.destroySolver = this.destroySolver.bind(this);
    document
      .getElementById("depth-first")
      .addEventListener("click", this.depthFirstSolution);

    document
      .getElementById("breadth-first")
      .addEventListener("click", this.breadthFirstSolution);

    document
      .getElementById("reset")
      .addEventListener("click", this.destroySolver);
  }

  render(ctx, row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  destroySolver() {
    let ctx = this.ctx;
    for (let i = 0; i < this.setTimeouts.length; i++) {
      let timeOut = this.setTimeouts[i];
      clearTimeout(timeOut);
    }

    for (let j = 0; j < this.setIntervals.length; j++) {
      let timeInterval = this.setIntervals[j];
      clearInterval(timeInterval);
      this.setIntervals = [];
    }
    for (let k = 0; k < this.grid.length; k++) {
      let row = this.grid[k];
      for (let l = 0; l < row.length; l++) {
        let col = row[l];
        if (col !== null && col !== this.startNode && col !== this.endNode) {
          this.render(ctx, k, l, "white");
        }
      }
    }
    this.steps = 0;
    console.log(this.setTimeouts, this.setIntervals);
  }

  depthFirstSolution() {
    this.destroySolver();
    let visited = this.depthFirstSearch(this.startNode, this.endNode);
    let ctx = this.ctx;

    let timeOut = setTimeout(() => {
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
          this.render(ctx, edgeRow, edgeCol, "blue");
          this.render(ctx, node.coords.row, node.coords.col, "blue");
        } else if (j === 0) {
          this.render(ctx, edgeRow, edgeCol, "blue");
        }
        j++;
      }, 50);
      this.setIntervals.push(intervalId);
    }, this.steps * 10);

    this.setTimeouts.push(timeOut);
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
        let timeOut = setTimeout(() => {
          let edgeRow = (currNode.coords.row + nextNode.coords.row) / 2;
          let edgeCol = (currNode.coords.col + nextNode.coords.col) / 2;
          this.render(ctx, edgeRow, edgeCol, "grey");
          if (currNode !== this.startNode && currNode !== this.endNode) {
            this.render(ctx, currNode.coords.row, currNode.coords.col, "grey");
          }
        }, this.steps * 10);
        this.setTimeouts.push(timeOut);
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

  breadthFirstBackTrace(parent, start, end) {
    let path = [[end.coords.row, end.coords.col]];

    while (path[path.length - 1] !== "root") {
      let prevCoords = path[path.length - 1];
      let prevRow = prevCoords[0];
      let prevCol = prevCoords[1];

      let nextNode = parent[[prevRow, prevCol]];
      if (nextNode !== "root") {
        let nextNodeRow = nextNode.coords.row;
        let nextNodeCol = nextNode.coords.col;
        path.push([nextNodeRow, nextNodeCol]);
      } else {
        path.push("root");
      }
    }

    return path;
  }

  breadthFirstSearch(startNode, endNode) {
    let ctx = this.ctx;
    const set = new Set();
    let parent = {};
    parent[[startNode.coords.row, startNode.coords.col]] = "root";
    let queue = [];
    queue.push({ node: startNode });

    while (queue.length) {
      this.steps++;
      let currObject = queue.shift();
      let currNode = currObject.node;
      let prevNode = currObject.prevNode || null;
      set.add(currNode);
      if (currNode === endNode) {
        let timeOut = setTimeout(() => {
          let edgeRow = (currNode.coords.row + prevNode.coords.row) / 2;
          let edgeCol = (currNode.coords.col + prevNode.coords.col) / 2;
          this.render(ctx, edgeRow, edgeCol, "grey");
        }, this.steps * 10);
        this.setTimeouts.push(timeOut);

        return this.breadthFirstBackTrace(parent, startNode, endNode);
      }

      let timeOutTwo = setTimeout(() => {
        if (currNode !== startNode && currNode !== endNode) {
          let edgeRow = (currNode.coords.row + prevNode.coords.row) / 2;
          let edgeCol = (currNode.coords.col + prevNode.coords.col) / 2;
          this.render(ctx, edgeRow, edgeCol, "grey");
          this.render(ctx, currNode.coords.row, currNode.coords.col, "grey");
        }
      }, this.steps * 10);
      this.setTimeouts.push(timeOutTwo);
      let currChildren = currNode.children;
      for (let dir in currChildren) {
        if (currChildren[dir] !== null) {
          let coords;
          coords = currNode[dir]();
          let nextNode = this.grid[coords.row][coords.col];

          if (set.has(nextNode)) {
            continue;
          }
          let coordinates = [nextNode.coords.row, nextNode.coords.col];
          parent[coordinates] = currNode;
          queue.push({ node: nextNode, prevNode: currNode });
        }
      }
    }
  }

  breadthFirstSolution() {
    this.destroySolver();
    let visited = this.breadthFirstSearch(this.startNode, this.endNode);
    let ctx = this.ctx;

    let timeOut = setTimeout(() => {
      let j = 0;

      let intervalId = setInterval(() => {
        if (j === visited.length - 3) {
          clearInterval(intervalId);
        }
        let node = visited[visited.length - j - 2];
        let nextNode = visited[visited.length - j - 3];
        let edgeRow = (node[0] + nextNode[0]) / 2;
        let edgeCol = (node[1] + nextNode[1]) / 2;
        if (j !== 0) {
          this.render(ctx, edgeRow, edgeCol, "blue");
          this.render(ctx, node[0], node[1], "blue");
        } else if (j === 0) {
          this.render(ctx, edgeRow, edgeCol, "blue");
        }
        j++;
      }, 50);
      this.setIntervals.push(intervalId);
    }, this.steps * 10);
    this.setTimeouts.push(timeOut);
  }
}

export default Solvers;
