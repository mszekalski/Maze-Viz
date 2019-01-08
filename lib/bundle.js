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
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./lib/node.js");
/* harmony import */ var _edge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edge */ "./lib/edge.js");
/* harmony import */ var _maze_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maze_path */ "./lib/maze_path.js");




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
        grid[row][col] = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](up, down, left, right, row, col);
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
  canvas.width = 500;
  canvas.height = 500;
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, 10);
});


/***/ }),

/***/ "./lib/maze_path.js":
/*!**************************!*\
  !*** ./lib/maze_path.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./lib/node.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./lib/board.js");



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
        if (this.path[i][j] instanceof _node__WEBPACK_IMPORTED_MODULE_0__["default"]) {
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
      node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](null, null, null, null, sourceRow + 2, sourceCol);
      node.children.up = true;
    } else if (edge.direction === "up") {
      node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](null, null, null, null, sourceRow - 2, sourceCol);
      node.children.down = true;
    } else if (edge.direction === "left") {
      node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](null, null, null, null, sourceRow, sourceCol - 2);
      node.children.right = true;
    } else {
      node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](null, null, null, null, sourceRow, sourceCol + 2);
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
        let sourceNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](null, null, null, null, sourceRow, sourceCol);
        sourceNode.children[direction] = true;
        grid[sourceRow][sourceCol] = sourceNode;
        // sourceNode.draw(ctx);
        if (direction === "down") {
          grid[sourceRow + 1][sourceCol] = "path";
          grid[sourceRow + 2][sourceCol] = destNode;
          //   destNode.draw(ctx);
        } else if (direction === "up") {
          grid[sourceRow - 1][sourceCol] = "path";
          grid[sourceRow - 2][sourceCol] = destNode;
          //   destNode.draw(ctx);
        } else if (direction === "right") {
          grid[sourceRow][sourceCol + 1] = "path";
          grid[sourceRow][sourceCol + 2] = destNode;
          //   destNode.draw(ctx);
        } else {
          grid[sourceRow][sourceCol - 1] = "path";
          grid[sourceRow][sourceCol - 2] = destNode;
          //   destNode.draw(ctx);
        }
      } else {
        let sourceNode = grid[sourceRow][sourceCol];
        sourceNode.children[direction] = true;
        if (direction === "down") {
          grid[sourceRow + 1][sourceCol] = "path";
          grid[sourceRow + 2][sourceCol] = destNode;
          //   destNode.draw(ctx);
        } else if (direction === "up") {
          grid[sourceRow - 1][sourceCol] = "path";
          grid[sourceRow - 2][sourceCol] = destNode;
          //   destNode.draw(ctx);
        } else if (direction === "right") {
          grid[sourceRow][sourceCol + 1] = "path";
          grid[sourceRow][sourceCol + 2] = destNode;
          //   destNode.draw(ctx);
        } else {
          grid[sourceRow][sourceCol - 1] = "path";
          grid[sourceRow][sourceCol - 2] = destNode;
          //   destNode.draw(ctx);
        }
      }
    }
    return grid;
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
  constructor(upCost, downCost, leftCost, rightCost, rowCoord, colCoord, ctx) {
    this.neighborsCost = {
      up: upCost,
      down: downCost,
      left: leftCost,
      right: rightCost
    };
    this.children = { up: null, down: null, left: null, right: null };
    this.visited = false;
    this.coords = { row: rowCoord, col: colCoord };
    this.neighborsCost.up === null
      ? (this.up = null)
      : (this.up = { row: this.coords.row - 1, col: this.coords.col });
    this.neighborsCost.down === null
      ? (this.down = null)
      : (this.down = { row: this.coords.row + 1, col: this.coords.col });
    this.neighborsCost.left === null
      ? (this.left = null)
      : (this.left = { row: this.coords.row, col: this.coords.col - 1 });
    this.neighborsCost.right === null
      ? (this.right = null)
      : (this.right = { row: this.coords.row, col: this.coords.col + 1 });
    this.ctx = ctx;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.coords.row, this.coords.col, 25, 25);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Node);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map