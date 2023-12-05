import Environment from "../../environment/Environment/Environment"
import EnvironmentVertex from "../../environment/Environment/EnvironmentVertex"
import random from "../../utils/random"
import Center, { CenterID, CenterInputWeights } from "../Center"
import Creature from "../Creature"

export default class NavigatorActivator extends Center {
    public readonly type = "activator" as const

    constructor(
        public id: CenterID,
        creature: Creature,
        environment: Environment
    ) {
        super(creature, environment)
        this.id = id
    }

    public hasInput = true
    public inputsWeights: CenterInputWeights = {
        activate: {},
    }
    public evolveInputWeights = (
        weightFactor: number,
        newConnectionFactor: number
    ) => {
        const newConnectionWeightFactor = 1
        const newConnectionWeight = 1

        Object.entries(this.inputsWeights).forEach(
            ([inputName, inputWeights]) => {
                /* Si nouvelle connexion doit être faite */
                if (Math.random() < newConnectionFactor) {
                    const outputCenters = this.creature.outputCenters
                    const centerID =
                        outputCenters[
                            Math.floor(Math.random() * outputCenters.length)
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
        activationThreshold: 1,
    }
    public evolveInnerWeights = (weightFactor: number) => {
        Object.entries(this.innerWeights).forEach(([weightName]) => {
            this.innerWeights[weightName] +=
                weightFactor * this.innerWeightsFactors[weightName] * random()
        })
    }

    public hasOutput = false
    public outputsWeights = {}
    public outputValue = 0
    public calculateOutput = () => {
        return 0
    }

    public energyConsumptionPerTimeUnit = 0
    public energyConsumptionPerActivation = 10

    /**
     * Makes the creature travel to the vertex indicated by the navigator sensor
     * if the inputs are high enough.
     *
     * @param destinations The destinations of the creature. They are sorted by the navigator sensor.
     * If no navigator sensor is present, the destinations are supposed to be sorted randomly.
     */
    public activate = (destinations: EnvironmentVertex[]) => {
        /* Retrieve the activation input */
        const activateInput = this.inputsValues.activate
        const activateInputSum = Object.values(activateInput).reduce(
            (sum, value) => sum + value,
            0
        )

        /* If the activation input is high enough, activate the navigator sensor */
        if (activateInputSum > this.innerWeights.activationThreshold) {
            this.creature.navigateTo(destinations[0])
        }
    }
}
