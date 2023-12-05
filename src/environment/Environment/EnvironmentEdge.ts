import Creature from "../../creatures/Creature"
import Edge, { EdgeID } from "../Graph/Edge"
import { VertexID } from "../Graph/Vertex"

export default class EnvironmentEdge extends Edge {
    public creatures: Creature[]

    constructor(id: EdgeID, source: VertexID, target: VertexID) {
        super(id, source, target)
        this.creatures = []
    }
}
