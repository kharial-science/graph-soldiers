import EnvironmentEdge from "../environment/Environment/EnvironmentEdge"
import EnvironmentVertex from "../environment/Environment/EnvironmentVertex"
import Center from "./Center"

export default class Creature {
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
}
