# Directed Graph.js

**Directed Graph.js** is a JavaScript class adaptation of the _Directed Graph_ data structure.

>A directed graph is graph, i.e., a set of objects (called vertices or nodes) that are connected together, where all the edges are directed from one vertex to another. 
>_Source: https://mathinsight.org/definition/directed_graph_

Formally, a Directed Graph is defined as *D = (E,V)*, where *V* is the set of verticies (nodes), and *E* is the set of edges, which are ordered pairs, (A, B), describing a path from vertex A to vertex B.

## Constructor

The class constructor requires a single argument, the desired name of the graph, and consists of three properties: **name**, **verticies**, and **edges**.

```JavaScript
constructor(name) {
        this.name = name;
        this.verticies = [];
        this.edges = [];
    }
```

`this.name` is a string, where the value is the name of the graph passed in as an argument to the constructor.

`this.verticies` is an array, where each index is an object that describes a vertex on the graph. You add a vertex to the array via the `createVertex` class method.

`this.edges` is an array, where each index is an array of two integers that describe an edge on the graph. You add an edge to the array by calling the `createEdge` class method.

## Class Method


### createVertex

### createEdge

### getVerticies

### getEdges