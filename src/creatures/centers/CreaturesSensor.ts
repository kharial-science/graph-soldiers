import Environment from "../../environment/Environment/Environment"
import EnvironmentEdge from "../../environment/Environment/EnvironmentEdge"
import Center, { CenterID } from "../Center"
import Creature from "../Creature"

export default class CrystalSensor extends Center {
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
    public _outputValue: number = 0
    public get outputValue(): number {
        return this._outputValue
    }
    public set outputValue(value: number) {
        this.outputValue = value
        this.lastOutputUpdate = this.environment.time
    }

    public calculateOutput = (): number => {
        if (this.lastOutputUpdate === this.environment.time) {
            return this.outputValue
        }

        const creaturesNumber = this.creature.localization.creatures.length
        this.outputValue = creaturesNumber

        return this.outputValue
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0
}
