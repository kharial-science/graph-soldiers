import Environment from "../../environment/Environment/Environment"
import Center from "../Center"
import Creature from "../Creature"

export default class TimeSensor extends Center {
    public readonly type = "sensor" as const

    constructor(creature: Creature, environment: Environment) {
        super(creature, environment)
    }

    public hasInput = false

    public innerWeights = {
        frequency: 1,
        phase: 0,
    }
    public innerWeightsFactors = {
        frequency: 1,
        phase: 1,
    }
    public evolveInnerWeights(weightFactor: number): void {
        this.innerWeights.frequency +=
            weightFactor * this.innerWeightsFactors.frequency
        this.innerWeights.phase += weightFactor * this.innerWeightsFactors.phase
    }

    public hasOutput = true
    public lastOutputUpdate: number = 0
    public outputValue: number = 0
    public calculateOutput(): number {
        if (this.lastOutputUpdate === this.environment.time) {
            return this.outputValue
        }

        this.outputValue = Math.sin(
            this.environment.time * this.innerWeights.frequency +
                this.innerWeights.phase
        )

        return this.outputValue
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0
}
