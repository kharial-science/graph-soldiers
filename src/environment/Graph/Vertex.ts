import { RawEdge } from "./Edge"

/**
 * Represents a vertex in a graph.
 */
export default class Vertex {
    /**
     * Neighbors of this vertex.
     * Only the vertices connected to this vertex by an edge that this
     * vertex is the source are considered in neighborsSource.
     */
    public neighborsSource: RawVertex[] = []

    /**
     * Neighbors of this vertex.
     * Only the vertices connected to this vertex by an edge that this
     * vertex is the target are considered in neighborsTarget.
     */
    public neighborsTarget: RawVertex[] = []

    /**
     * Creates a new vertex with the given id.
     *
     * @param {string} id - The id of the vertex.
     */
    constructor(public id: RawVertex) {
        this.id = id
    }
}

export type RawVertex = `vertex-${string}`
export type VertexID = RawVertex
