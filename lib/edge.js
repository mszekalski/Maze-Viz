class Edge {
  constructor(source, cost, direction, ctx) {
    (this.source = source),
      (this.cost = cost),
      (this.direction = direction),
      (this.ctx = ctx);
  }
}

export default Edge;
