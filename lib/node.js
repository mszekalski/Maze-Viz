class Node {
  constructor(up, down, left, right) {
    this.neighborCost = { up: up, down: down, left: left, right: right };
  }

  up() {
    if (this.up === null) {
      return null;
    }
  }

  down() {
    if (this.down === null) {
      return null;
    }
  }

  left() {
    if (this.left === null) {
      return null;
    }
  }

  right() {
    if (this.right === null) {
      return null;
    }
  }
}

export default Node;
