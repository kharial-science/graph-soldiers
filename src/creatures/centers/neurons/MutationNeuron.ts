import Environment from "../../../environment/Environment/Environment"
import Center, { CenterID, CenterInputWeights } from "../../Center"
import Creature from "../../Creature"
import random from "../../../utils/random"

/**
 * The mutation neuron is a neuron that produces an output
 * used in the cell life cycle. It is used to compute the mutation
 * of the creature's descendants given some inputs.
 * If no mutation neuron is present in the creature, the creature
 * will mutate with weights of 1 everywhere.
 */
export default class MutationNeuron extends Center {
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

    public innerWeights = {}
    public innerWeightsFactors = {}

    public hasOutput = false
    public lastOutputUpdate: number = 0
    public outputValue: number = 0
    public calculateOutput = () => {
        return 0
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0

    /**
     * Returns a sum of the inputs weighted by their weights.
     * @returns {number} The activation of the neuron.
     */
    public activate = (): number => {
        let activation = 0

        Object.entries(this.inputsWeights).forEach(([, inputWeights]) =>
            Object.entries(inputWeights).forEach(([centerID, centerWeight]) => {
                const center = this.creature.centers[centerID]
                activation += center.calculateOutput() * centerWeight
            })
        )

        return activation
    }
}
