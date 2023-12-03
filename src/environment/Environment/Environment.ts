import Edge, { RawEdge } from "../Graph/Edge"
import Graph from "../Graph/Graph"
import Vertex, { RawVertex } from "../Graph/Vertex"
import EnvironmentEdge from "./EnvironmentEdge"
import EnvironmentVertex, { RawEnvironmentVertex } from "./EnvironmentVertex"

/**
 * Represents an environment, which is a type of graph.
 */
export default class Environment extends Graph {
    /**
     * The vertices of the environment.
     */
    public vertices: EnvironmentVertex[]

    /**
     * Creates an environment.
     *
     * @param environmentVertices - The vertices of the environment.
     * @param environmentEdges - The edges of the environment.
     */
    constructor(
        environmentVertices: (
            | RawEnvironmentVertex
            | EnvironmentVertex
            | RawVertex
            | Vertex
        )[],
        environmentEdges: (EnvironmentEdge | RawEdge | Edge)[] = []
    ) {
        const vertices = environmentVertices.map((vertex) => {
            if (vertex instanceof EnvironmentVertex) {
                return vertex
            } else if (vertex instanceof Vertex) {
                return new EnvironmentVertex(vertex)
            } else if (vertex instanceof RawEnvironmentVertex) {
                return new EnvironmentVertex(
                    vertex.id,
                    vertex.spice,
                    vertex.creatures
                )
            } else {
                return new EnvironmentVertex(vertex)
            }
        })

        super(vertices, environmentEdges)
    }

    /**
     * Creates an environment from a graph.
     * @param graph - The graph to create the environment from.
     * @returns - The environment created from the graph.
     */
    public static createEnvironmentFromGraph(graph: Graph): Environment {
        return new Environment(graph.vertices)
    }
}
