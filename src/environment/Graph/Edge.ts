import Graph from "../Graph/Graph"
import Vertex, { RawVertex } from "../Graph/Vertex"

/**
 * Represents an edge between two vertices.
 */
export default class Edge {
    /**
     * Creates an edge between two vertices.
     *
     * @param {RawVertex} source - The source vertex.
     * @param {RawVertex} target - The target vertex.
     */
    constructor(
        public id: EdgeID,
        public source: RawVertex,
        public target: RawVertex
    ) {
        this.source = source
        this.target = target
    }

    public getSourceVertex(graph: Graph): Vertex {
        return graph.getVertexById(this.source)
    }

    public getTargetVertex(graph: Graph): Vertex {
        return graph.getVertexById(this.target)
    }

    public getVertices(graph: Graph): [Vertex, Vertex] {
        return [this.getSourceVertex(graph), this.getTargetVertex(graph)]
    }
}

export type RawEdge = [RawVertex, RawVertex]
export type EdgeID = `edge-${string}`
