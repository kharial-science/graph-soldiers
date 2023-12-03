import Creature from "../../creatures/Creature"
import Vertex, { RawVertex } from "../Graph/Vertex"

export default class EnvironmentVertex extends Vertex {
    /**
     * The spice inventory of this vertex.
     */
    public spice: SpiceInventory

    /**
     * The creatures that are currently on this vertex.
     */
    public creatures: Creature[]

    /**
     * Creates a vertex in an environment.
     *
     * @param {RawVertex} id - The ID of the vertex.
     * @param {SpiceInventory} spice - The spice inventory of the vertex.
     * @param {Creature[]} creatures - The creatures on the vertex.
     */
    constructor(
        public id: RawVertex,
        spice: SpiceInventory = { dust: 0, powder: 0, crystal: 0 },
        creatures: Creature[] = []
    ) {
        super(id)
        this.spice = spice
        this.creatures = creatures
    }
}

export interface RawEnvironmentVertex {
    id: RawVertex
    spice: SpiceInventory
    creatures: Creature[]
}

export type SpiceInventory = {
    [spice in Spice]: number
}

export type Spice = "dust" | "powder" | "crystal"
