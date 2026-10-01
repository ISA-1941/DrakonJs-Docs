main();
function allVerticesVisited(visited, vertices) {
    var i, vertex;
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        if (!visited[vertex]) {
            return false;
        }
    }
    return true;
}
function demonstrateStepByStep(graph, startVertex) {
    var currentVertex, dist, distStr, distances, i, previous, stepCount, steps, v, vertices, visited, visitedMark;
    vertices = getVerticesList(graph);
    distances = initializeDistances(vertices, startVertex);
    visited = initializeVisited(vertices);
    previous = initializePrevious(vertices);
    steps = [];
    stepCount = 0;
    console.log('\n' + '='.repeat(60));
    console.log('STEP-BY-STEP EXECUTION');
    console.log('='.repeat(60));
    while (true) {
        if (true) {
            currentVertex = findMinDistanceVertex(distances, visited);
            if (currentVertex === null) {
                console.log('   No more vertices to process. Algorithm finished.');
                console.log('\n\u2705 Final distances:');
                for (i = 0; i < vertices.length; i++) {
                    v = vertices[i];
                    console.log('   ' + v + ': ' + distances[v].toFixed(2));
                }
                return;
            } else {
                stepCount = stepCount + 1;
                console.log('\n\uD83D\uDCCC Step ' + stepCount + ':');
                console.log('   Current vertex: ' + currentVertex);
                console.log('   Current distances:');
                for (i = 0; i < vertices.length; i++) {
                    v = vertices[i];
                    dist = distances[v];
                    distStr = dist === Infinity ? '\u221E' : dist.toFixed(2);
                    visitedMark = visited[v] ? ' [\u2713]' : ' [ ]';
                    console.log('     ' + v + ': ' + distStr + visitedMark);
                }
                markVertexVisited(visited, currentVertex);
                relaxEdges(graph, currentVertex, distances, previous);
            }
        } else {
            break;
        }
    }
}
function dijkstra(graph, startVertex) {
    var currentVertex, distances, previous, vertices, visited;
    vertices = getVerticesList(graph);
    distances = initializeDistances(vertices, startVertex);
    visited = initializeVisited(vertices);
    previous = initializePrevious(vertices);
    currentVertex = findMinDistanceVertex(distances, visited);
    while (true) {
        if (currentVertex !== null) {
            markVertexVisited(visited, currentVertex);
            relaxEdges(graph, currentVertex, distances, previous);
            currentVertex = findMinDistanceVertex(distances, visited);
        } else {
            break;
        }
    }
    return {
        distances: distances,
        previous: previous
    };
}
function findMinDistanceVertex(distances, visited) {
    var i, minDistance, minVertex, vertex, vertices;
    minVertex = null;
    minDistance = Infinity;
    vertices = Object.keys(distances);
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        if (!visited[vertex] && distances[vertex] < minDistance) {
            minDistance = distances[vertex];
            minVertex = vertex;
        }
    }
    return minVertex;
}
function getVerticesList(graph) {
    return Object.keys(graph);
}
function initializeDistances(vertices, startVertex) {
    var distances, i, vertex;
    distances = {};
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        distances[vertex] = Infinity;
    }
    distances[startVertex] = 0;
    return distances;
}
function initializePrevious(vertices) {
    var i, previous, vertex;
    previous = {};
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        previous[vertex] = null;
    }
    return previous;
}
function initializeVisited(vertices) {
    var i, vertex, visited;
    visited = {};
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        visited[vertex] = false;
    }
    return visited;
}
function main() {
    var graph, result, startVertex;
/*
    graph = {
        0: {
            1: 48.3,
            3: 40.7,
            5: 25.4
        },
        1: {
            0: 48.3,
            2: 37.5,
            3: 29.8
        },
        2: {
            0: 40.7,
            1: 37.5,
            3: 34.9,
            5: 29.8
        },
        3: {
            1: 29.8,
            2: 34.9,
            4: 25.4
        },
        4: {
            3: 25.4,
            5: 34.9
        },
        5: {
            0: 25.4,
            2: 29.8,
            4: 34.9
        }
    };
    */
   graph = {
    0: { 1: 48.3, 2: 40.7, 5: 25.4 },
    1: { 0: 48.3, 2: 37.5, 3: 29.8 },
    2: { 0: 40.7, 1: 37.5, 3: 34.9, 5: 29.8 },
    3: { 1: 29.8, 2: 34.9, 4: 25.4 },
    4: { 3: 25.4, 5: 34.9 },
    5: { 0: 25.4, 2: 29.8, 4: 34.9 }
};

    startVertex = '0';
    result = dijkstra(graph, startVertex);
    printResults(result.distances, result.previous, startVertex);
}
function markVertexVisited(visited, vertex) {
    visited[vertex] = true;
    return visited;
}
function printResults(distances, previous, startVertex) {
    var distStr, distance, i, path, vertex, vertices;
    console.log('\n' + '='.repeat(60));
    console.log('DIJKSTRA\'S ALGORITHM - SHORTEST PATHS FROM VERTEX ' + startVertex);
    console.log('='.repeat(60));
    console.log('\n\uD83D\uDCCA SHORTEST DISTANCES:');
    console.log('-'.repeat(40));
    vertices = Object.keys(distances).sort();
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        distance = distances[vertex];
        distStr = distance === Infinity ? '\u221E' : distance.toFixed(2);
        console.log('   From ' + startVertex + ' to ' + vertex + ': ' + distStr);
    }
    console.log('\n\uD83D\uDDFA️  SHORTEST PATHS:');
    console.log('-'.repeat(40));
    for (i = 0; i < vertices.length; i++) {
        vertex = vertices[i];
        if (vertex !== startVertex && distances[vertex] !== Infinity) {
            path = reconstructPath(previous, startVertex, vertex);
            console.log('   To ' + vertex + ': ' + path.join(' \u2192 ') + ' (distance: ' + distances[vertex].toFixed(2) + ')');
        }
    }
}
function reconstructPath(previous, startVertex, targetVertex) {
    var current, path;
    path = [];
    current = targetVertex;
    while (true) {
        if (current !== null) {
            path.unshift(current);
            current = previous[current];
        } else {
            break;
        }
    }
    if (path[0] !== startVertex) {
        return [];
    }
    return path;
}
function relaxEdges(graph, currentVertex, distances, previous) {
    var i, neighbor, neighbors, newDistance, weight;
    neighbors = Object.keys(graph[currentVertex]);
    for (i = 0; i < neighbors.length; i++) {
        neighbor = neighbors[i];
        weight = graph[currentVertex][neighbor];
        newDistance = distances[currentVertex] + weight;
        if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentVertex;
        }
    }
    return {
        distances,
        previous
    };
}