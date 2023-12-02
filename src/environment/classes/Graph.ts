import Edge, { RawEdge } from "./Edge"
import Vertex, { RawVertex } from "./Vertex"

/**
 * Represents a graph data structure.
 */
export default class Graph {
    /**
     * The vertices of the graph.
     */
    public vertices: Vertex[]

    /**
     * The edges of the graph.
     * Computed from the informations the vertices hold.
     */
    public get edges(): Edge[] {
        const edges = []
        for (const vertex of this.vertices) {
            for (const neighbor of vertex.neighborsSource) {
                edges.push(new Edge(vertex.id, neighbor))
            }
        }
        return edges
    }

    /**
     * Creates a graph.
     *
     * @param {RawVertex[]} verticesIDs - The ids of the vertices of the graph.
     * @param {RawEdge[]} rawEdges - The edges of the graph.
     */
    constructor(verticesIDs: RawVertex[] = [], rawEdges: RawEdge[] = []) {
        this.vertices = verticesIDs.map((id) => new Vertex(id))
        for (const rawEdge of rawEdges) {
            this.addEdge(new Edge(...rawEdge))
        }
    }

    /**
     * Adds a vertex to the graph.
     *
     * @param {Vertex} vertex - The vertex to be added.
     */
    public addVertex(vertex: Vertex) {
        this.vertices.push(vertex)
    }

    /**
     * Adds an edge to the graph.
     *
     * @param {Edge} edge - The edge to be added.
     */
    public addEdge(edge: Edge) {
        this.vertices
            .find((vertex) => vertex.id === edge.source)
            .neighborsSource.push(edge.target)
        this.vertices
            .find((vertex) => vertex.id === edge.target)
            .neighborsTarget.push(edge.source)
    }

    /**
     * Returns a vertex by its id.
     *
     * @param {string} id - The id of the vertex to be returned.
     * @returns {Vertex} The vertex with the given id.
     */
    public getVertexById(id: RawVertex): Vertex {
        return this.vertices.find((vertex) => vertex.id === id)
    }

    /**
     * Get the neighbors of the vertex given a certain depth.
     * The neighbors of a vertex are the vertices that are connected to it by a certain path
     * of edges with length equal to the given depth.
     *
     * @param {Vertex} vertex - The vertex whose neighbors are to be returned.
     * @param {number} depth - The depth of the neighbors.
     * @param {number} currentDepth - The current depth of the neighbors.
     * @returns {Vertex[]} The neighbors of the vertex.
     */
    public getNeighborsWithDepth(
        vertex: Vertex,
        depth: number,
        currentDepth: number = 0
    ): Vertex[] {
        if (depth === currentDepth) {
            return [vertex]
        }

        const neighbors = []
        for (const neighbor of vertex.neighborsSource) {
            const recursiveNeighbors = this.getNeighborsWithDepth(
                this.getVertexById(neighbor),
                depth,
                currentDepth + 1
            )

            /* Avoiding repetitions by not including vertices which already
            are neighbors of the given vertex by some other path */
            recursiveNeighbors.forEach((recursiveNeighbor) => {
                if (!neighbors.includes(recursiveNeighbor)) {
                    neighbors.push(recursiveNeighbor)
                }
            })
        }

        return neighbors
    }

    /**
     * Get the subgraph of the graph induced by the given vertices.
     * The subgraph is a graph whose vertices are the given vertices and whose
     * edges are the edges of the graph whose source and target are in the subgraph.
     *
     * @param {Vertex[]} vertices - The vertices of the subgraph.
     * @returns {Graph} The subgraph.
     */
    public getSubGraph(vertices: Vertex[]): Graph {
        const subGraph = new Graph()

        /* Need to recreate the vertices from the ids because the vertices hold
        edges information, which might not be true in the subgraph, if, for example,
        a neighbor of the vertex is not in the graph anymore */
        for (const vertex of vertices) {
            subGraph.addVertex(new Vertex(vertex.id))
        }

        /* We thus need to reimplement the edges from the graph whose source and target
        are actually in the subgraph */
        for (const vertex of subGraph.vertices) {
            for (const neighbor of vertex.neighborsSource) {
                if (subGraph.vertices.find((v) => v.id === neighbor)) {
                    subGraph.addEdge(new Edge(vertex.id, neighbor))
                }
            }
        }

        return subGraph
    }

    /**
     * Returns the adjacency matrix of the graph.
     *
     * @returns {number[][]} The adjacency matrix of the graph.
     * @todo Use a library to manage matrices if needed.
     */
    public getAdjacencyMatrix(): number[][] {
        const matrix = []
        for (const vertex of this.vertices) {
            matrix.push([])
            for (const neighbor of this.vertices) {
                matrix[matrix.length - 1].push(
                    vertex.neighborsSource.includes(neighbor.id) ? 1 : 0
                )
            }
        }
        return matrix
    }
}
