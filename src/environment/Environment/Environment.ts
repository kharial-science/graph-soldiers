import Creature from "../../creatures/Creature"
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
     * The edges of the environment.
     */
    public edges: EnvironmentEdge[]

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
     * The current time of the environment.
     * Le setup se fait à 0, le temps commence à 1.
     */
    public time: number = 0

    /**
     * Advances the time of the environment by one unit.
     * And triggers all the creatures to output, input and activate.
     */
    public advanceTime(): void {
        this.time++
        // all creatures outputs inputs and activate
    }

    /**
     * Creates an environment from a graph.
     * @param graph - The graph to create the environment from.
     * @returns - The environment created from the graph.
     */
    public static createEnvironmentFromGraph(graph: Graph): Environment {
        return new Environment(graph.vertices)
    }

    /**
     * Moves a creature from from a vertex or an edge to another vertex or edge.
     * This method does not check whether the move is possible or not giving the
     * topology of the environment.
     * @param creature - The creature to move
     * @param localization - The initial position of the creature
     * @param destination - The final position of the creature
     */
    public moveCreature = (
        creature: Creature,
        localization: EnvironmentVertex | EnvironmentEdge,
        destination: EnvironmentVertex | EnvironmentEdge
    ) => {
        localization.creatures = localization.creatures.filter(
            (creatureOnVertex) => creatureOnVertex.id !== creature.id
        )
        destination.creatures.push(creature)
    }
}
