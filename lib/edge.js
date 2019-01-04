class Edge {
  constructor(edgeSource, edgeCost, edgeDirection) {
    (this.source = edgeSource),
      (this.cost = edgeCost),
      (this.direction = edgeDirection);
  }
}

export default Edge;
