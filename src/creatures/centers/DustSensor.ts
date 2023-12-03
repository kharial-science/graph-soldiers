import Environment from "../../environment/Environment/Environment"
import EnvironmentEdge from "../../environment/Environment/EnvironmentEdge"
import Center, { CenterID } from "../Center"
import Creature from "../Creature"

export default class DustSensor extends Center {
    public readonly type = "sensor" as const

    constructor(
        public id: CenterID,
        creature: Creature,
        environment: Environment
    ) {
        super(creature, environment)
        this.id = id
    }

    public hasInput = false
    public inputsWeights = {}
    public evolveInputWeights: () => void = () => {}

    public hasOutput = true
    public lastOutputUpdate: number = 0
    public outputValue: number = 0
    public calculateOutput = (): number => {
        if (this.lastOutputUpdate === this.environment.time) {
            return this.outputValue
        }

        if (this.creature.localization instanceof EnvironmentEdge) {
            return 0
        } else {
            const dust = this.creature.localization.spice.dust
            this.outputValue = dust
        }
        this.lastOutputUpdate = this.environment.time

        return this.outputValue
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0
}
