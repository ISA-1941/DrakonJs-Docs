main();
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
function addEdgeMatrix(graph, from, to) {
    // Проверка границ, чтобы не выйти за пределы массива
    if (from >= 0 && from < graph.size && to >= 0 && to < graph.size) {
        // Устанавливаем 1 в строке 'from' и столбце 'to'
        graph.matrix[from][to] = 1;
        
        // Если бы граф был НЕориентированным, мы бы добавили и обратную связь:
        // graph.matrix[to][from] = 1;
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
    graph = createGraphMatrix(6);
    addEdgeMatrix(graph, 0, 1);
    addEdgeMatrix(graph, 0, 3);
    addEdgeMatrix(graph, 1, 2);
    addEdgeMatrix(graph, 1, 3);
    addEdgeMatrix(graph, 1, 4);
    addEdgeMatrix(graph, 2, 5);
    addEdgeMatrix(graph, 3, 5);
    addEdgeMatrix(graph, 4, 0);
    addEdgeMatrix(graph, 4, 3);
    addEdgeMatrix(graph, 5, 4);
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
        console.log('\n=== Graph Traversal Demonstrations ===');
    
    // Выполняем DFS обход, начиная с вершины 0
    console.log('\n--- Depth-First Search (DFS) from vertex 0 ---');
    const dfsResult = DFS_stack(graph, 0);
    console.log('DFS traversal order:', dfsResult.join(' → '));
    
    // Выполняем BFS обход, начиная с вершины 0
    console.log('\n--- Breadth-First Search (BFS) from vertex 0 ---');
    const bfsResult = BFS_queue(graph, 0);
    console.log('BFS traversal order:', bfsResult.join(' → '));
    
    // Дополнительно: демонстрация обхода с другой стартовой вершины
    console.log('\n--- DFS from vertex 3 ---');
    const dfsFrom3 = DFS_stack(graph, 3);
    console.log('DFS traversal order from vertex 3:', dfsFrom3.join(' → '));
    
    console.log('\n--- BFS from vertex 3 ---');
    const bfsFrom3 = BFS_queue(graph, 3);
    console.log('BFS traversal order from vertex 3:', bfsFrom3.join(' → '));
}