class Edge {
  constructor(edgeSource, edgeCost, edgeDirection) {
    return {
      source: edgeSource,
      cost: edgeCost,
      direction: edgeDirection
    };
  }
}

export default Edge;
