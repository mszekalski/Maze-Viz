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
    let minNode;
    let minCost = null;
    for (let i = 0; i < array.length; i++) {
      let edge = array[i];
      if (
        (edge.cost < minCost || minCost === null) &&
        edge.destination.visited !== true
      ) {
        minCost = edge.cost;
        minNode = edge.destination;
      }
    }
    return minNode;
  }

  primsGenerate() {
    let startingNode = this.grid[0][0];
    startingNode.visited = true;
    let totalEdges = [];
    let minimumTree = new Set();
    minimumTree.add(startingNode);
    let costs = startingNode.neighborsCost;
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

    let minNode = this.findMinEdge(totalEdges);

    minNode.visited = true;
    minimumTree.add(minNode);
    console.log(minimumTree);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);


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
  canvas.width = 600;
  canvas.height = 600;
  let board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
  console.log(board);
});


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
  constructor(upCost, downCost, leftCost, rightCost, rowCoord, colCoord) {
    this.neighborsCost = {
      up: upCost,
      down: downCost,
      left: leftCost,
      right: rightCost
    };
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
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Node);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map