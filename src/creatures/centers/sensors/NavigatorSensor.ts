import Environment from "../../environment/Environment/Environment"
import EnvironmentEdge from "../../environment/Environment/EnvironmentEdge"
import random from "../../utils/random"
import Center, { CenterID, CenterInputWeights } from "../Center"
import Creature from "../Creature"

export default class NavigatorSensor extends Center {
    public readonly type = "sensor"

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
        creatureWeight: {},
        dustWeight: {},
        powderWeight: {},
        crystalWeight: {},
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

    public hasOutput = false
    public lastOutputUpdate = 0
    public outputValue = 0
    public calculateOutput: () => number = () => {
        return 0
    }

    public energyConsumptionPerTimeUnit = 1
    public energyConsumptionPerActivation = 0

    /**
     * The navigator sensor will use its inputs and weights to sort possible destinations.
     * It will choose the destination that the creature will go to once the NavigatorActivator is activated.
     * It should only be asked a destination when the creature is in a vertex.
     */
    public activate = (): EnvironmentEdge[] => {
        const creatureWeight = this.inputsWeights.creatureWeight
        const dustWeight = this.inputsWeights.dustWeight
        const powderWeight = this.inputsWeights.powderWeight
        const crystalWeight = this.inputsWeights.crystalWeight

        const creatureWeightedSum = Object.entries(creatureWeight).reduce(
            (sum, [centerID, weight]) => {
                const center = this.creature.centers[centerID]
                return sum + center.calculateOutput() * weight
            },
            0
        )
        const dustWeightedSum = Object.entries(dustWeight).reduce(
            (sum, [centerID, weight]) => {
                const center = this.creature.centers[centerID]
                return sum + center.calculateOutput() * weight
            },
            0
        )
        const powderWeightedSum = Object.entries(powderWeight).reduce(
            (sum, [centerID, weight]) => {
                const center = this.creature.centers[centerID]
                return sum + center.calculateOutput() * weight
            },
            0
        )
        const crystalWeightedSum = Object.entries(crystalWeight).reduce(
            (sum, [centerID, weight]) => {
                const center = this.creature.centers[centerID]
                return sum + center.calculateOutput() * weight
            },
            0
        )

        const creatureLocalization = this.creature.localization
        if (creatureLocalization instanceof EnvironmentEdge) {
            return []
        }

        const possibleDestinations = creatureLocalization.neighborsSource

        return possibleDestinations
            .map((v) => this.environment.vertices[v])
            .sort((v1, v2) => {
                const v1CreatureWeightedSum =
                    v1.creatures.length * creatureWeightedSum
                const v1DustWeightedSum = v1.spice.dust * dustWeightedSum
                const v1PowderWeightedSum = v1.spice.powder * powderWeightedSum
                const v1CrystalWeightedSum =
                    v1.spice.crystal * crystalWeightedSum
                const v1WeightedSum =
                    v1CreatureWeightedSum +
                    v1DustWeightedSum +
                    v1PowderWeightedSum +
                    v1CrystalWeightedSum

                const v2CreatureWeightedSum =
                    v2.creatures.length * creatureWeightedSum
                const v2DustWeightedSum = v2.spice.dust * dustWeightedSum
                const v2PowderWeightedSum = v2.spice.powder * powderWeightedSum
                const v2CrystalWeightedSum =
                    v2.spice.crystal * crystalWeightedSum
                const v2WeightedSum =
                    v2CreatureWeightedSum +
                    v2DustWeightedSum +
                    v2PowderWeightedSum +
                    v2CrystalWeightedSum

                return v2WeightedSum - v1WeightedSum
            })
    }
}

// The navigator sensor will use its inputs and weights to sort possible destinations
// among the ones that are visible to the creature. It will choose the destination
// that the creature will go to once the NavigatorActivator is activated.
