function createGraphMatrix(size) {
    var graph, i, j;
    graph = {};
    graph.size = size;
    graph.matrix = [];
    for (i = 0; i < graph.size; i++) {
        graph.matrix[i] = [];
        for (j = 0; j < graph.size; j++) {
            graph.matrix[i][j] = 0;
        }
    }
    return graph;
}

function addEdgeMatrix(graph, from, to) {
    if (from >= 0 && from < graph.size && to >= 0 && to < graph.size) {
        graph.matrix[from][to] = 1;
    }
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

function main() {
    var graph, i, j, row;
    graph = createGraphFromData();
    
    console.log('МAdjacency matrix (distance):');
    for (i = 0; i < graph.size; i++) {
        row = '';
        for (j = 0; j < graph.size; j++) {
            row = row + graph.matrix[i][j] + ' ';
        }
        console.log(row);
    }
}

main();



/*
function DFS_stack(graph, start) {
    // Инициализация структур данных
    var visited = [];           // Отметки о посещении
    var stack = [start];        // Стек для обхода (LIFO)
    var result = [];            // Результат обхода
    
    // Пока стек не пуст
    while (stack.length > 0) {
        // Берем вершину из стека
        var vertex = stack.pop();
        
        // Если вершина еще не посещена
        if (!visited[vertex]) {
            // Отмечаем как посещенную
            visited[vertex] = true;
            result.push(vertex);
            
            // Получаем всех соседей
            var neighbors = getNeighbors(graph, vertex);
            
            // Добавляем соседей в стек (в обратном порядке)
            var i = neighbors.length - 1;
            while (i >= 0) {
                stack.push(neighbors[i]);
                i = i - 1;
            }
        }
    }
    
    return result;
}
*/
