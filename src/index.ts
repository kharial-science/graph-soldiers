import Environment from "./environment/Environment/Environment"
import Graph from "./environment/Graph/Graph"

const graph = Graph.generateRandomGraph(10, 0.6)
const environment = Environment.createEnvironmentFromGraph(graph)

console.log(graph.vertices)
console.log(environment.edges)
