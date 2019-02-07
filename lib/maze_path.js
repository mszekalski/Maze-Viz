import MazeNode from "./maze_node";
import Board from "./board";
import "./solvers.js";

class MazePath {
  constructor(tree, size, ctx) {
    this.size = size * 2 - 1;
    this.tree = tree;
    this.ctx = ctx;
    this.grid = this.generateGrid(this.size);
    this.path = this.generateMaze(this.tree, this.ctx);
    this.startNode = null;
    this.endNode = null;
    this.steps = 0;
    this.depthFirstGenerate = this.depthFirstGenerate.bind(this);
    document
      .getElementById("depth-first")
      .addEventListener("click", this.depthFirstGenerate);
  }

  randomNum(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    if (num % 2 !== 0) {
      return this.randomNum(min, max);
    } else {
      return num;
    }
  }

  randomIndex(max) {
    return { row: this.randomNum(0, max), col: this.randomNum(0, max) };
  }

  markGrid(sourceNode, direction) {
    sourceNode.children[direction] = true;
    let row = sourceNode.coords.row;
    let col = sourceNode.coords.col;

    if (direction === "down") {
      this.draw(this.ctx, row + 1, col);
      if (this.grid[row + 2][col] === null)
        this.grid[row + 2][col] = new MazeNode(row + 2, col, this.ctx);
      let destNode = this.grid[row + 2][col];
      destNode.children.up = true;
      destNode.draw(this.ctx);
      this.grid[row + 1][col] = "path";
    } else if (direction === "up") {
      this.draw(this.ctx, row - 1, col);
      if (this.grid[row - 2][col] === null)
        this.grid[row - 2][col] = new MazeNode(row - 2, col, this.ctx);
      let destNode = this.grid[row - 2][col];
      destNode.children.down = true;
      this.grid[row - 2][col] = destNode;
      destNode.draw(this.ctx);
      this.grid[row - 1][col] = "path";
    } else if (direction === "right") {
      this.draw(this.ctx, row, col + 1);
      if (this.grid[row][col + 2] === null)
        this.grid[row][col + 2] = new MazeNode(row, col + 2, this.ctx);
      let destNode = this.grid[row][col + 2];
      destNode.children.left = true;
      this.grid[row][col + 2] = destNode;
      destNode.draw(this.ctx);
      this.grid[row][col + 1] = "path";
    } else {
      this.draw(this.ctx, row, col - 1);
      if (this.grid[row][col - 2] === null)
        this.grid[row][col - 2] = new MazeNode(row, col - 2, this.ctx);
      let destNode = this.grid[row][col - 2];
      destNode.children.right = true;
      this.grid[row][col - 2] = destNode;
      destNode.draw(this.ctx);
      this.grid[row][col - 1] = "path";
    }
  }

  draw(ctx, row, col) {
    ctx.fillStyle = "white";
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  drawEdgeSolution(ctx, row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  drawStart(ctx, row, col) {
    ctx.fillStyle = "green";
    ctx.fillRect(col * 10 + 10, row * 10 + 10, 10, 10);
  }

  drawEnd(ctx, row, col) {
    ctx.fillStyle = "red";
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
    let startIndex = this.randomIndex(this.size);
    let endIndex = this.randomIndex(this.size);

    while (startIndex === endIndex) {
      endIndex = this.randomIndex(this.size);
    }
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
        this.markGrid(sourceNode, direction);
        sourceNode.draw(this.ctx);
      }, index * 10);
    });

    setTimeout(() => {
      this.drawStart(this.ctx, startIndex.row, startIndex.col);
      this.drawEnd(this.ctx, endIndex.row, endIndex.col);
      this.startNode = this.grid[startIndex.row][startIndex.col];
      this.endNode = this.grid[endIndex.row][endIndex.col];
    }, tree.length * 10);
  }

  depthFirstGenerate() {
    let visited = this.depthFirst(this.startNode, this.endNode);
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
          node.drawSolution(ctx);
          this.drawEdgeSolution(ctx, edgeRow, edgeCol, "blue");
        } else if (j === 0) {
          this.drawEdgeSolution(ctx, edgeRow, edgeCol, "blue");
        }
        j++;
      }, 50);
    }, this.steps * 10);
  }

  depthFirst(currNode, endNode, visited = []) {
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
            currNode.drawVisited(ctx);
          }
          let edgeRow = (currNode.coords.row + nextNode.coords.row) / 2;
          let edgeCol = (currNode.coords.col + nextNode.coords.col) / 2;
          this.drawEdgeSolution(ctx, edgeRow, edgeCol, "grey");
        }, this.steps * 10);
        let rest = this.depthFirst(nextNode, endNode, [currNode, ...visited]);
        if (rest) {
          return rest;
        }
      }
    }
  }
}

export default MazePath;
