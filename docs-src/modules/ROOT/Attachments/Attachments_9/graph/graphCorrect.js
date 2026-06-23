function createGraphMatrix(size) {
    var i, j, matrix;
    matrix = [];
    for (i = 0; i < size; i++) {
        matrix[i] = [];
        for (j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
    return {
        matrix: matrix,
        size: size
    };
}

function addEdgeMatrix(graph, i, j, weight = 1) {
    graph.matrix[i][j] = weight;
    graph.matrix[j][i] = weight;
}

function main() {
    var graph, i, j, row;
    graph = createGraphMatrix(7);
    addEdgeMatrix(graph, 0, 1);
    addEdgeMatrix(graph, 1, 2);
    addEdgeMatrix(graph, 0, 3);
    addEdgeMatrix(graph, 3, 4);
    addEdgeMatrix(graph, 3, 5);
    addEdgeMatrix(graph, 5, 4);
    addEdgeMatrix(graph, 5, 6);
    
    console.log('Graph (Adjacency Matrix) created successfully:');
    console.log('Matrix representation (7x7):');
    for (i = 0; i < graph.size; i++) {
        row = '';
        for (j = 0; j < graph.size; j++) {
            row += graph.matrix[i][j] + ' ';
        }
        console.log(`V${i}: ${row}`);
    }
}

// Вызов main() после объявления всех функций
main();