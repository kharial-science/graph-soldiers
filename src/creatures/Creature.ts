import Environment from "../environment/Environment/Environment"
import EnvironmentEdge from "../environment/Environment/EnvironmentEdge"
import EnvironmentVertex from "../environment/Environment/EnvironmentVertex"
import Center from "./Center"

export default class Creature {
    constructor(public id: CreatureID, private environment: Environment) {
        this.environment = environment
    }

    /**
     * A list of the centers of the creature.
     */
    public centers: Center[]
    public get outputCenters(): Center[] {
        return this.centers.filter((center) => center.hasOutput)
    }
    public get inputCenters(): Center[] {
        return this.centers.filter((center) => center.hasInput)
    }

    /**
     * The localization of the creature on the graph.
     */
    public localization: EnvironmentVertex | EnvironmentEdge

    /**
     * Moves the creature to the given destination.
     *
     * @param destination - The destination of the creature.
     */
    public navigateTo = (destination: EnvironmentVertex) => {
        // TODO: the creature should choose and edge to go to
        // then wait time units it has to wait on that edge
        // then go to the vertex
        this.environment.moveCreature(this, this.localization, destination)
        this.localization = destination
    }
}

export type CreatureID = `creature-${string}`
