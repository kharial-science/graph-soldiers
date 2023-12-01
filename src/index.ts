/**
 * Represents a vertex in a graph.
 */
class Vertex {
    /**
     * Creates a new vertex with the given id.
     * 
     * @param {string} id - The id of the vertex.
     */
    constructor(public id: string) {
        this.id = id
    }
}

/**
 * Represents an edge between two vertices.
 */
class Edge {
    /**
     * Creates an edge between two vertices.
     * 
     * @param {Vertex} source - The source vertex.
     * @param {Vertex} target - The target vertex.
     */
    constructor(public source: Vertex, public target: Vertex) {
        this.source = source
        this.target = target
    }
}

/**
 * Represents a graph data structure.
 */
class Graph {
    /**
     * The vertices of the graph.
     */
    public vertices: Vertex[]

    /**
     * The edges of the graph.
     */
    public edges: Edge[]

    /**
     * Creates a new graph with the given vertices and edges.
     * 
     * @param {string[]} verticesIDs - The ids of the vertices.
     * @param {[string, string][]} rawEdges - The raw edges represented as pairs of vertex ids.
     */
    constructor(verticesIDs: string[] = [], rawEdges: [string, string][] = []) {
        this.vertices = verticesIDs.map(id => new Vertex(id))
        this.edges = rawEdges.map(rawEdge => new Edge(this.getVertexById(rawEdge[0]), this.getVertexById(rawEdge[1])))
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
        this.edges.push(edge)
    }

    /**
     * Returns a vertex by its id.
     * 
     * @param {string} id - The id of the vertex to be returned.
     * @returns {Vertex} The vertex with the given id.
     */
    public getVertexById(id: string): Vertex {
        return this.vertices.find(vertex => vertex.id === id)
    }

    /**
     * Returns the neighbors of a vertex.
     * Only the vertices that are the target of an edge whose source is the given vertex are considered neighbors.
     * 
     * @param {Vertex} vertex - The vertex whose neighbors are to be returned.
     * @returns {Vertex[]} The neighbors of the given vertex.
     */
    public getNeighbors(vertex: Vertex): Vertex[] {
        return this.edges
            .filter(edge => edge.source === vertex)
            .map(edge => edge.target)
    }
}

/**
 * Represents an environment, which is a type of graph.
 */
class Environment extends Graph {
    
}

const graph = new Environment()
