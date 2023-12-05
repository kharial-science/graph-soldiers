import Environment from "../../../environment/Environment/Environment"
import Center, { CenterID, CenterInputWeights } from "../../Center"
import Creature from "../../Creature"

export default class TimeSensor extends Center {
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

    public innerWeights = {
        frequency: 1,
        phase: 0,
    }
    public innerWeightsFactors = {
        frequency: 1,
        phase: 1,
    }

    public hasOutput = true
    public lastOutputUpdate: number = 0
    public outputValue: number = 0
    public calculateOutput = (): number => {
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

    public activate = () => {}
}
