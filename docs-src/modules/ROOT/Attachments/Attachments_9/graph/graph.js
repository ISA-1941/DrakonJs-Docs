main();
function BFS_queue(graph, start) {
    var i, neighbors, queue, result, vertex, visited;
    visited = [];
    queue = [start];
    result = [];
    while (true) {
        if (queue.length > 0) {
            vertex = queue.shift();
            if (!visited[vertex]) {
                visited[vertex] = true;
                result.push(vertex);
                neighbors = getNeighbors(graph, vertex);
                console.log('vertex ==> ', vertex, 'neighbors --> ', neighbors, 'stack.length ==> ', queue.length);
                for (i = 0; i < neighbors.length; i++) {
                    if (!visited[neighbors[i]] && !queue.includes(neighbors[i])) {
                        queue.push(neighbors[i]);
                    }
                }
                console.log('quueu ==> ', queue);
            }
        } else {
            break;
        }
    }
    console.log('result --> ', result);
    return result;
}
function DFS_stack(graph, start) {
    var i, neighbors, result, stack, vertex, visited;
    visited = [];
    stack = [start];
    result = [];
    while (true) {
        if (stack.length > 0) {
            vertex = stack.pop();
            if (!visited[vertex]) {
                visited[vertex] = true;
                result.push(vertex);
                neighbors = getNeighbors(graph, vertex);
                console.log('vertex ==> ', vertex, 'neighbors --> ', neighbors, 'stack.length ==> ', stack.length);
                for (i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited[neighbors[i]] && !stack.includes(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
                console.log('stack ==> ', stack);
            }
        } else {
            break;
        }
    }
    console.log('result --> ', result);
    return result;
}

function addEdgeMatrix(graph, from, to) {
    if (from >= 0 && from < graph.size && to >= 0 && to < graph.size) {
        graph.matrix[from][to] = 1;
    }
}

function backtrackFromNeighbor(context, neighbor, oldState) {
    context.visited[neighbor] = false;
    context.currentPath = oldState.path;
    context.totalDistance = oldState.distance;
    context.totalPrice = oldState.price;
}
function createGraphFromData() {
    var graph;
    graph = createGraphMatrix(7);
    addEdgeMatrix(graph, 0, 1, 10.45);
    addEdgeMatrix(graph, 0, 6, 13.57);
    addEdgeMatrix(graph, 1, 2, 18.83);
    addEdgeMatrix(graph, 1, 4, 14.23);
    addEdgeMatrix(graph, 2, 0, 43.67);
    addEdgeMatrix(graph, 2, 4, 27.93);
    addEdgeMatrix(graph, 3, 5, 47.33);
    addEdgeMatrix(graph, 4, 3, 29.27);
    addEdgeMatrix(graph, 5, 4, 57.69);
    addEdgeMatrix(graph, 6, 3, 33.31);
    return graph;
}
function createGraphMatrix(size) {
    var graph, i, j;
    graph = {};
    graph.size = size;
    graph.matrix = [];
    graph.size = size;
    for (i = 0; i < graph.size; i++) {
        graph.matrix[i] = [];
        for (j = 0; j < graph.size; j++) {
            graph.matrix[i][j] = 0;
        }
    }
    return graph;
}
function createSearchContext(graph) {
    return {
        graph: graph,
        allPaths: [],
        target: -1,
        visited: [],
        currentPath: '',
        totalDistance: 0,
        totalPrice: 0
    };
}
function findCheapestByPrice(paths) {
    var cheapest, i;
    if (paths.length === 0) {
        return null;
    }
    cheapest = paths[0];
    for (i = 1; i < paths.length; i++) {
        if (paths[i].price < cheapest.price) {
            cheapest = paths[i];
        }
    }
    return cheapest;
}
function findPathWithContext(current, context) {
    var i, moveData, neighbor, neighbors;
    neighbors = getNeighbors(context.graph, current);
    console.log('neighbors: ', neighbors, 'current: ', current);
    for (i = 0; i < neighbors.length; i++) {
        neighbor = neighbors[i];
        if (!context.visited[neighbor]) {
            moveData = prepareMoveToNeighbor(context, current, neighbor);
            if (neighbor === context.target) {
                handleFoundPath(context);
            } else {
                findPathWithContext(neighbor, context);
            }
            backtrackFromNeighbor(context, neighbor, moveData.oldState);
        }
    }
}
function findShortestByDistance(paths) {
    var i, shortest;
    if (paths.length === 0) {
        return null;
    }
    shortest = paths[0];
    for (i = 1; i < paths.length; i++) {
        if (paths[i].distance < shortest.distance) {
            shortest = paths[i];
        }
    }
    return shortest;
}
function getEdgeDistance(from, to) {
    var graphData, key1, key2;
    key1 = from + '-' + to;
    key2 = to + '-' + from;
    graphData = getGraphData();
    if (graphData.distanceMap[key1] !== undefined) {
        return graphData.distanceMap[key1];
    }
    if (graphData.distanceMap[key2] !== undefined) {
        return graphData.distanceMap[key2];
    }
    return 0;
}
function getEdgePrice(from, to) {
    var graphData, key1, key2;
    key1 = from + '-' + to;
    key2 = to + '-' + from;
    graphData = getGraphData();
    if (graphData.priceMap[key1] !== undefined) {
        return graphData.priceMap[key1];
    }
    if (graphData.priceMap[key2] !== undefined) {
        return graphData.priceMap[key2];
    }
    return 0;
}
function getGraphData() {
    return {
        distanceMap: {
            '0-1': 10.45,
            '0-6': 13.57,
            '1-2': 18.83,
            '1-4': 14.23,
            '2-0': 43.67,
            '2-4': 27.93,
            '3-5': 47.33,
            '4-3': 29.27,
            '5-4': 57.69,
            '6-3': 33.31
        },
        priceMap: {
            '0-1': 1.5,
            '0-6': 1.8,
            '1-2': 2,
            '1-4': 3,
            '2-0': 1.2,
            '2-4': 1.3,
            '3-5': 1,
            '4-3': 3.3,
            '5-4': 1,
            '6-3': 1.6
        }
    };
}
function getNeighbors(graph, vertex) {
    var i, neighbors;
    neighbors = [];
    for (i = 0; i < graph.size; i++) {
        if (graph.matrix[vertex][i] !== 0) {
            neighbors.push(i);
        }
    }
    return neighbors;
}
function handleFoundPath(context) {
    var pathInfo;
    pathInfo = {
        path: context.currentPath,
        vertices: context.currentPath.split('-').map(Number),
        distance: context.totalDistance,
        price: context.totalPrice
    };
    context.allPaths.push(pathInfo);
    console.log('Path Verticesи: ' + context.currentPath);
    console.log('  Distance: ' + context.totalDistance.toFixed(2) + ' км');
    console.log('  Price: ' + context.totalPrice.toFixed(2) + ' у.е.\n');
    return pathInfo;
}
function initPathSearch(graph, start, end) {
    var context;
    if (graph.size <= 0 || start < 0 || end < 0 || start >= graph.size || end >= graph.size) {
        console.log('Invalid settings');
        return [];
    }
    context = createSearchContext(graph);
    context = resetSearchContext(context, start, end);
    console.log('\n=== Поиск всех путей от ' + start + ' до ' + end + ' ===');
    findPathWithContext(start, context);
    return context.allPaths;
}
function main() {
    var cheapest, graph, i, j, paths_0_5, paths_1_6, paths_2_3, row, shortest;
    graph = createGraphFromData();
    console.log('МAdjacency matrix (distance)):');
    for (i = 0; i < graph.size; i++) {
        row = '';
        for (j = 0; j < graph.size; j++) {
            row = row + graph.matrix[i][j] + ' ';
        }
        console.log(row);
    }
    paths_0_5 = initPathSearch(graph, 0, 5);
    printAllPaths(paths_0_5, 'Path from 0 to 5');
    paths_1_6 = initPathSearch(graph, 1, 6);
    printAllPaths(paths_1_6, 'Path from 1 to 6');
    paths_2_3 = initPathSearch(graph, 2, 3);
    printAllPaths(paths_2_3, 'Path from 2 to 3');
    if (paths_0_5.length > 0) {
        shortest = findShortestByDistance(paths_0_5);
        cheapest = findCheapestByPrice(paths_0_5);
    }
    console.log('\n=== Path analysis from 0 to 5 ===');
    console.log('the shortest path: ' + shortest.path);
    console.log('  Distance: ' + shortest.distance.toFixed(2) + ' км');
    console.log('  Fare: ' + shortest.price.toFixed(2) + ' у.е.');
    console.log('Cheapest route: ' + cheapest.path);
    console.log('  Distance: ' + cheapest.distance.toFixed(2) + ' км');
    console.log('  Fareь: ' + cheapest.price.toFixed(2) + ' у.е.');
}
function prepareMoveToNeighbor(context, current, neighbor) {
    var edgeCost, edgeDistance, edgePrice, oldState;
    edgeDistance = getEdgeDistance(current, neighbor);
    edgePrice = getEdgePrice(current, neighbor);
    edgeCost = edgeDistance * edgePrice;
    oldState = {
        path: context.currentPath,
        distance: context.totalDistance,
        price: context.totalPrice
    };
    context.visited[neighbor] = true;
    context.currentPath = context.currentPath + '-' + neighbor;
    context.totalDistance = context.totalDistance + edgeDistance;
    context.totalPrice = context.totalPrice + edgeCost;
    return {
        oldState: oldState,
        edgeDistance: edgeDistance,
        edgePrice: edgePrice,
        edgeCost: edgeCost
    };
}
function printAllPaths(paths, title) {
    var i, path;
    if (paths.length === 0) {
        console.log('Путей не найдено');
        return;
    }
    console.log('\n=== ' + title + ': Найдено путей: ' + paths.length + ' ===');
    for (i = 0; i < paths.length; i++) {
        path = paths[i];
        console.log(i + 1 + '. ' + path.path);
        console.log('   Расстояние: ' + path.distance.toFixed(2) + ' км');
        console.log('   Стоимость: ' + path.price.toFixed(2) + ' у.е.');
    }
}
function resetSearchContext(context, start, end) {
    context.allPaths = [];
    context.target = end;
    context.visited = [];
    context.visited[start] = true;
    context.currentPath = ' ';
    context.totalDistance = 0;
    context.totalPrice = 0;
    return context;
}