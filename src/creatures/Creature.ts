import Center from "./Center"

export default class Creature {
    centers: Center[]

    public get outputCenters(): Center[] {
        return this.centers.filter((center) => center.hasOutput)
    }
}
