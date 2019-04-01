class Graph{

  constructor(numVertices){
    this.numVertices = numVertices;
    this.adjacentList = new Map();
  }

  addVertex(vertex){
    this.adjacentList.set(vertex, []);
  }

  addEdge(sourceVertex, destVertex){
    let current = this.adjacentList.get(sourceVertex);
    if (!current.includes(destVertex)){
      this.adjacentList.get(sourceVertex).push(destVertex);
    }
  }

}
