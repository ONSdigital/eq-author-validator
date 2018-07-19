class DirectedGraph {
    constructor(name) {
        this.name = name;
        this.vertices = [];
        this.edges = [];
    }

    createVertex(vertex){
        /*
        # vertex should be an object containing a manditory property 'id' and a series of arbitary optional properties. 
        # **N0TE: optional properties should not be used within the class definition, doing this would make them manditory.
        #         They would exist to capture extra information on a vertex, if required by the developer for the application
        #         using this class.
        */

        this.vertices.push(vertex)
    }

    createEdge(edge){
        /*
        # edge should be an array of two integers, where the first int is the origin vertex and the second int is the destination
        # vertex.ac
        */

        this.edges.push(edge)
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }

}