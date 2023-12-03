import Center, { CenterID, CenterInputWeights } from "../Center"
import Creature from "../Creature"
import random from "../../utils/random"
import Environment from "../../environment/Environment/Environment"

export default class TanhNeuron extends Center {
    public readonly type = "neuron" as const

    constructor(
        public id: CenterID,
        creature: Creature,
        environment: Environment
    ) {
        super(creature, environment)
        this.id = id
    }

    public inputsWeights: CenterInputWeights = {
        main: {},
    }
    public hasInput = true
    public evolveInputWeights = (
        weightFactor: number,
        newConnectionFactor: number
    ) => {
        const newConnectionWeightFactor = 1
        const newConnectionWeight = 1

        Object.entries(this.inputsWeights).forEach(
            ([inputName, inputWeights]) => {
                /* Si nouvelle connexion doit être faite */
                if (random() < newConnectionFactor) {
                    const outputCenters = this.creature.outputCenters
                    const centerID =
                        outputCenters[
                            Math.floor(random() * outputCenters.length)
                        ].id
                    this.inputsWeights[inputName][centerID] =
                        newConnectionWeightFactor *
                        newConnectionWeight *
                        random()
                }

                /* Update des poids des connexions existantes */
                Object.entries(inputWeights).forEach(([centerID]) => {
                    this.inputsWeights[inputName][centerID] +=
                        weightFactor * random()
                })
            }
        )
    }

    public innerWeights = {
        bias: 0,
        gain: 1,
    }
    public innerWeightsFactors = {
        bias: 1,
        gain: 1,
    }

    public hasOutput = true
    public lastOutputUpdate: number = 0
    public outputValue: number = 0
    public calculateOutput = (): number => {
        if (this.lastOutputUpdate === this.environment.time) {
            return this.outputValue
        }

        const linearInput = Object.entries(this.inputsValues.main).reduce(
            (sum, [key, value]) => {
                return sum + value * this.innerWeights[key]
            },
            0
        )

        const weightedInput =
            linearInput * this.innerWeights.gain + this.innerWeights.bias

        const outputValue = Math.tanh(weightedInput)
        this.outputValue = outputValue
        this.lastOutputUpdate = this.environment.time

        return outputValue
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0
}
