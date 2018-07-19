# Directed Graph.js

**Directed Graph.js** is a JavaScript class adaptation of the _Directed Graph_ data structure.

>A directed graph is graph, i.e., a set of objects (called vertices or nodes) that are connected together, where all the edges are directed from one vertex to another.
>
>_Source: https://mathinsight.org/definition/directed_graph_

Formally, a Directed Graph is defined as *D = (E,V)*, where *V* is the set of vertices (nodes), and *E* is the set of edges, which are ordered pairs, (A, B), describing a path from vertex A to vertex B.

## Constructor

The class constructor requires a single argument, the desired name of the graph, and consists of three properties: **name**, **vertices**, and **edges**.

```JavaScript
constructor(name) {
        this.name = name;
        this.vertices = [];
        this.edges = [];
    }
```

`this.name` is a string, where the value is the name of the graph passed in as an argument to the constructor.

`this.vertices` is an array, where each index is an object that describes a vertex on the graph. You add a vertex to the array via the `createVertex` method. The object's properties are defined as:

| Property       | Required     | Value Type   | Notes |
| ------------- |:-------------:| :-------:|------:|
| id     | yes | INT | Used to identify a vertex in the graph. |
| Arbitrary     | No     | Arbitrary | You may add a series of arbitrarily named properties, of arbitrary types, as required by your program. |

`this.edges` is an array, where each index is an array of two integers that describe an edge on the graph. You add an edge to the array by calling the `createEdge` method. The array *must* adhear to the following schema: 
`[idOfOriginVertex, idOfDestinationVertex]`.

## Class Methods

### addVertex

Adds a new vertex to the graph.

It takes in a single object, which describes the vertex, and is defined as:

```JavaScript
{
   id: INT
}
```

You may add a number of arbitrary properties of arbitrary types as required by your program. For example:

```JavaScript
{
   id: 1,
   surveyQuestion: 'What is your name?',
   answerType: 'Yes/No'
}
```

### addEdge

Adds a new edge to the graph.

It takes in a single array, which describes an edge, and is defined as:

```JavaScript
const edge1 = [INT, INT];
```

The first index *must* be the **id** of the origin vertex, and the second index *must* be the **id** of the destination vertex. For example:

```JavaScript
const edge1 = [1,2];
```

### getVertices

Returns all vertices in the graph.

### getEdges

Returns all edges in the graph.
