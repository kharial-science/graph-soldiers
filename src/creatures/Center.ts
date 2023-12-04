import Environment from "../environment/Environment/Environment"
import random from "../utils/random"
import Creature from "./Creature"

/**
 * A center is a node in the neural network of a creature.
 * It can be a sensor, a neuron, an activator, a reproductor, a genotype, a vacuole or an energy processor.
 * It can have inputs and outputs.
 * It can calculate its output based on its inputs.
 * It can evolve its input weights and can create new connections.
 */
export default abstract class Center {
    /**
     * The id of the center.
     * Should be unique among the centers of a creature.
     */
    public abstract id: CenterID
    /**
     * The type of the center.
     */
    public abstract readonly type: CenterType

    constructor(
        protected creature: Creature,
        protected environment: Environment
    ) {
        this.creature = creature
        this.environment = environment
    }

    /**
     * Whether the center has an input.
     */
    public abstract hasInput: boolean
    /**
     * The inputs of the center.
     * The keys are the names of the inputs.
     * The values are the weights of the inputs.
     * The weights are the values of the connections between the centers.
     */
    public abstract inputsWeights: CenterInputWeights

    /**
     * The last time unit when the inputs of the center were updated.
     */
    public lastInputsUpdate: number
    /**
     * The values of the inputs of the center.
     * The keys are the names of the inputs.
     * The values are the values of the inputs.
     */
    private _inputsValues: CenterInputValues
    public get inputsValues(): CenterInputValues {
        if (this.lastInputsUpdate === this.environment.time) {
            return
        }

        Object.entries(this.inputsWeights).forEach(
            ([inputName, inputWeights]) => {
                Object.entries(inputWeights).forEach(([centerID, weight]) => {
                    this._inputsValues[inputName][centerID] =
                        this.creature.centers[inputName].calculateOutput() *
                        weight
                })
            }
        )

        this.lastInputsUpdate = this.environment.time
    }

    /**
     * Evolve the input weights of the center and create new connections.
     * The method should be implemented for each center type.
     */
    public abstract evolveInputWeights: (
        weightFactor: number,
        newConnectionFactor: number
    ) => void

    /**
     * The inner weights of the center.
     * The keys are the names of the inner weights.
     * The values are the values of the inner weights.
     */
    public innerWeights: {
        [weightName: string]: number
    }
    /**
     * The factors of the inner weights of the center.
     * The keys are the names of the inner weights.
     * The values are the factors of the inner weights, the factors are used to evolve the inner weights.
     * The less the factor is, the less the inner weight will be evolved.
     */
    public innerWeightsFactors: {
        [weightName: string]: number
    }

    /**
     * Evolve the inner weights of the center.
     * The method should be implemented for each center type.
     */
    public evolveInnerWeights = (weightFactor: number) => {
        Object.entries(this.innerWeights).forEach(([weightName]) => {
            this.innerWeights[weightName] +=
                weightFactor * this.innerWeightsFactors[weightName] * random()
        })
    }

    /**
     * Whether the center has an output.
     */
    public abstract hasOutput: boolean
    /**
     * The last time unit when the output of the center was updated.
     */
    public lastOutputUpdate: number
    /**
     * The output of the center.
     */
    public abstract outputValue: number
    /**
     * The output of the center.
     * The value is the output of the center.
     * The method should be implemented for each center type.
     */
    public abstract calculateOutput: () => number

    /**
     * The energy consumption of the center.
     */
    public abstract energyConsumptionPerTimeUnit: number
    /**
     * The energy consumption of the center per activation.
     */
    public abstract energyConsumptionPerActivation: number

    /**
     * Activate the center.
     * The method should be implemented for each center type that can be activated.
     * Whereas the output serves for other centers calculation, activation is used to make the center do something.
     */
    public abstract activate: () => any
}

export type CenterID = `center-${string}`

export type CenterType =
    | "sensor"
    | "neuron"
    | "activator"
    | "reproductor"
    | "genotype"
    | "vacuole"
    | "processor"
    | "feromone-producer"

export type CenterInputWeights = {
    [inputName: string]: { [outputCenter in CenterID]: number }
}

export type CenterInputValues = {
    [inputName: string]: { [outputCenter in CenterID]: number }
}
