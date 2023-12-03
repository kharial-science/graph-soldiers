import { RawEdge } from "../Graph/Edge"
import Graph from "../Graph/Graph"
import { RawVertex } from "../Graph/Vertex"
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
     * @param {EnvironmentVertex[]} vertices - The vertices of the environment.
     */
    constructor(rawVertices: RawEnvironmentVertex[], rawEdges: RawEdge[] = []) {
        super()

        this.vertices = rawVertices.map(
            (vertex) =>
                new EnvironmentVertex(vertex.id, vertex.spice, vertex.creatures)
        )

        for (const rawEdge of rawEdges) {
            super.addEdge(new EnvironmentEdge(...rawEdge))
        }
    }
}
