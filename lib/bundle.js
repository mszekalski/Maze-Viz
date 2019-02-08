/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/maze.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board_node */ "./lib/board_node.js");
/* harmony import */ var _edge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edge */ "./lib/edge.js");
/* harmony import */ var _maze_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maze_path */ "./lib/maze_path.js");




class Board {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.grid = this.generateGrid(this.size);
    this.tree = this.primsGenerate();
    new _maze_path__WEBPACK_IMPORTED_MODULE_2__["default"](this.tree, this.size, this.ctx);
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
        grid[row][col] = new _board_node__WEBPACK_IMPORTED_MODULE_0__["default"](up, down, left, right, row, col);
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
        output.push(new _edge__WEBPACK_IMPORTED_MODULE_1__["default"](sourceNode, direction, destination));
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

/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./lib/board_node.js":
/*!***************************!*\
  !*** ./lib/board_node.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./lib/node.js");


class BoardNode extends _node__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(upCost, downCost, leftCost, rightCost, rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);
    this.visited = false;
    this.neighborsCost = {
      up: upCost,
      down: downCost,
      left: leftCost,
      right: rightCost
    };
    this.up = this.neighborsCost.up
      ? { row: this.coords.row - 1, col: this.coords.col }
      : null;
    this.down = this.neighborsCost.down
      ? { row: this.coords.row + 1, col: this.coords.col }
      : null;
    this.left = this.neighborsCost.left
      ? { row: this.coords.row, col: this.coords.col - 1 }
      : null;
    this.right = this.neighborsCost.right
      ? { row: this.coords.row, col: this.coords.col + 1 }
      : null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BoardNode);


/***/ }),

/***/ "./lib/edge.js":
/*!*********************!*\
  !*** ./lib/edge.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Edge {
  constructor(source, cost, direction, ctx) {
    (this.source = source),
      (this.cost = cost),
      (this.direction = direction),
      (this.ctx = ctx);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Edge);


/***/ }),

/***/ "./lib/maze.js":
/*!*********************!*\
  !*** ./lib/maze.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");


document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 510;
  canvas.height = 510;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, 25);
});


/***/ }),

/***/ "./lib/maze_node.js":
/*!**************************!*\
  !*** ./lib/maze_node.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./lib/node.js");


class MazeNode extends _node__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);

    this.children = { up: null, down: null, left: null, right: null };
  }

  up() {
    return { row: this.coords.row - 2, col: this.coords.col };
  }

  down() {
    return { row: this.coords.row + 2, col: this.coords.col };
  }

  left() {
    return { row: this.coords.row, col: this.coords.col - 2 };
  }
  right() {
    return { row: this.coords.row, col: this.coords.col + 2 };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MazeNode);


/***/ }),

/***/ "./lib/maze_path.js":
/*!**************************!*\
  !*** ./lib/maze_path.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maze_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maze_node */ "./lib/maze_node.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _solvers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solvers.js */ "./lib/solvers.js");




class MazePath {
  constructor(tree, size, ctx) {
    this.size = size * 2 - 1;
    this.tree = tree;
    this.ctx = ctx;
    this.grid = this.generateGrid(this.size);
    this.path = this.generateMaze(this.tree, this.ctx);
    this.startNode = null;
    this.endNode = null;
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
      this.render(this.ctx, row + 1, col, "white");
      if (this.grid[row + 2][col] === null)
        this.grid[row + 2][col] = new _maze_node__WEBPACK_IMPORTED_MODULE_0__["default"](row + 2, col, this.ctx);
      let destNode = this.grid[row + 2][col];
      destNode.children.up = true;
      this.render(this.ctx, destNode.coords.row, destNode.coords.col, "white");
      this.grid[row + 1][col] = "path";
    } else if (direction === "up") {
      this.render(this.ctx, row - 1, col, "white");
      if (this.grid[row - 2][col] === null)
        this.grid[row - 2][col] = new _maze_node__WEBPACK_IMPORTED_MODULE_0__["default"](row - 2, col, this.ctx);
      let destNode = this.grid[row - 2][col];
      destNode.children.down = true;
      this.grid[row - 2][col] = destNode;
      this.render(this.ctx, destNode.coords.row, destNode.coords.col, "white");
      this.grid[row - 1][col] = "path";
    } else if (direction === "right") {
      this.render(this.ctx, row, col + 1, "white");
      if (this.grid[row][col + 2] === null)
        this.grid[row][col + 2] = new _maze_node__WEBPACK_IMPORTED_MODULE_0__["default"](row, col + 2, this.ctx);
      let destNode = this.grid[row][col + 2];
      destNode.children.left = true;
      this.grid[row][col + 2] = destNode;
      this.render(this.ctx, destNode.coords.row, destNode.coords.col, "white");
      this.grid[row][col + 1] = "path";
    } else {
      this.render(this.ctx, row, col - 1, "white");
      if (this.grid[row][col - 2] === null)
        this.grid[row][col - 2] = new _maze_node__WEBPACK_IMPORTED_MODULE_0__["default"](row, col - 2, this.ctx);
      let destNode = this.grid[row][col - 2];
      destNode.children.right = true;
      this.grid[row][col - 2] = destNode;
      this.render(this.ctx, destNode.coords.row, destNode.coords.col, "white");
      this.grid[row][col - 1] = "path";
    }
  }

  render(ctx, row, col, color) {
    ctx.fillStyle = color;
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
        sourceNode = new _maze_node__WEBPACK_IMPORTED_MODULE_0__["default"](sourceRow, sourceCol, this.ctx);
        this.grid[sourceRow][sourceCol] = sourceNode;
      }

      setTimeout(() => {
        this.render(
          this.ctx,
          sourceNode.coords.row,
          sourceNode.coords.col,
          "white"
        );
        this.markGrid(sourceNode, direction);
      }, index * 10);
    });

    setTimeout(() => {
      this.render(this.ctx, startIndex.row, startIndex.col, "green");
      this.render(this.ctx, endIndex.row, endIndex.col, "red");
      this.startNode = this.grid[startIndex.row][startIndex.col];
      this.endNode = this.grid[endIndex.row][endIndex.col];
      new _solvers_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.ctx, this.startNode, this.endNode, this.grid);
    }, tree.length * 10);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MazePath);


/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Node {
  constructor(rowCoord, colCoord, ctx) {
    this.coords = { row: rowCoord, col: colCoord };
    this.ctx = ctx;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Node);


/***/ }),

/***/ "./lib/solvers.js":
/*!************************!*\
  !*** ./lib/solvers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maze_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maze_path */ "./lib/maze_path.js");
/* harmony import */ var _maze_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maze_node */ "./lib/maze_node.js");



class Solvers {
  constructor(ctx, startNode, endNode, grid) {
    this.ctx = ctx;
    this.startNode = startNode;
    this.endNode = endNode;
    this.grid = grid;
    this.steps = 0;
    this.depthFirstSolution = this.depthFirstSolution.bind(this);
    document
      .getElementById("depth-first")
      .addEventListener("click", this.depthFirstSolution);
    document.getElementById("reset").addEventListener("click", this.resetGrid);
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

  breadthFirstSearch() {
    let queue = [];
    queue.push(this.startNode);
    while (queue.length) {
      let currNode = queue.pop();
      if (currNode === this.endNode) return true;
      let currChildren = currNode.children;
      for (let dir in currChildren) {
        if (currChildren[dir]) {
          queue.push(currChildren[dir]());
        }
      }
    }
  }
  breadthFirstSolution() {}
}

/* harmony default export */ __webpack_exports__["default"] = (Solvers);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map