import Node from "./node";

class MazeNode extends Node {
  constructor(rowCoord, colCoord, ctx) {
    super(rowCoord, colCoord, ctx);
    this.children = { up: null, down: null, left: null, right: null };
    this.start = null;
    this.end = null;
  }
}

export default MazeNode;
