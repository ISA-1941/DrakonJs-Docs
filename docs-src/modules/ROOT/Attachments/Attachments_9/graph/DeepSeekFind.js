// ==================== Глобальные данные ====================

var distanceMap = {
    "0-1": 10.45, "0-6": 13.57, "1-2": 18.83, "1-4": 14.23,
    "2-0": 43.67, "2-4": 27.93, "3-5": 47.33, "4-3": 29.27,
    "5-4": 57.69, "6-3": 33.31
};

var priceMap = {
    "0-1": 1.50, "0-6": 1.80, "1-2": 2.00, "1-4": 3.00,
    "2-0": 1.20, "2-4": 1.30, "3-5": 1.00, "4-3": 3.30,
    "5-4": 1.00, "6-3": 1.60
};


// ==================== Модуль 1: Работа с графом ====================
function createGraphMatrix(size) {
    var graph = {};
    graph.size = size;
    graph.matrix = [];
    for (var i = 0; i < graph.size; i++) {
        graph.matrix[i] = [];
        for (var j = 0; j < graph.size; j++) {
            graph.matrix[i][j] = 0;
        }
    }
    return graph;
}

function addEdgeMatrix(graph, i, j, weight) {
    if (weight === undefined) weight = 1;
    graph.matrix[i][j] = weight;
    graph.matrix[j][i] = weight;
}

function getNeighbors(graph, vertex) {
    var neighbors = [];
    for (var i = 0; i < graph.size; i++) {
        if (graph.matrix[vertex][i] !== 0) {
            neighbors.push(i);
        }
    }
    return neighbors;
}

function createGraphFromData() {
    var graph = createGraphMatrix(7);
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

// Создание контекста поиска
function createSearchContext(graph) {
    return {
        graph: graph,        // Граф
        allPaths: [],        // Все найденные пути
        target: -1,          // Целевая вершина
        visited: [],         // Посещенные вершины
        currentPath: '',     // Текущий путь
        totalDistance: 0,    // Общее расстояние
        totalPrice: 0        // Общая стоимость
    };
}


// ==================== Модуль 2: Вспомогательные функции ====================
function getEdgePrice(from, to) {
    var key1 = from + "-" + to;
    var key2 = to + "-" + from;
    if (priceMap[key1] !== undefined) return priceMap[key1];
    if (priceMap[key2] !== undefined) return priceMap[key2];
    return 0;
}

function getEdgeDistance(from, to) {
    var key1 = from + "-" + to;
    var key2 = to + "-" + from;
    if (distanceMap[key1] !== undefined) return distanceMap[key1];
    if (distanceMap[key2] !== undefined) return distanceMap[key2];
    return 0;
} 

// Сброс контекста для нового поиска
function resetSearchContext(context, start, end) {
    context.allPaths = [];
    context.target = end;
    context.visited = [];
    context.currentPath = start.toString();
    context.totalDistance = 0;
    context.totalPrice = 0;
    
    // Отмечаем начальную вершину как посещенную
    context.visited[start] = true;
    
    return context;
}

// НОВАЯ ФУНКЦИЯ: Подготовка к переходу в соседнюю вершину
function prepareMoveToNeighbor(context, current, neighbor) {
    // Получаем данные о ребре
    var edgeDistance = getEdgeDistance(current, neighbor);
    var edgePrice = getEdgePrice(current, neighbor);
    var edgeCost = edgeDistance * edgePrice;
    
    // Сохраняем текущее состояние для backtracking
    var oldState = {
        path: context.currentPath,
        distance: context.totalDistance,
        price: context.totalPrice
    };
    
    // Обновляем контекст
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

// НОВАЯ ФУНКЦИЯ: Возврат после рекурсивного поиска (backtracking)
function backtrackFromNeighbor(context, neighbor, oldState) {
    context.visited[neighbor] = false;
    context.currentPath = oldState.path;
    context.totalDistance = oldState.distance;
    context.totalPrice = oldState.price;
}

// НОВАЯ ФУНКЦИЯ: Обработка найденного пути
function handleFoundPath(context) {
    var pathInfo = {
        path: context.currentPath,
        vertices: context.currentPath.split('-').map(Number),
        distance: context.totalDistance,
        price: context.totalPrice
    };
    
    context.allPaths.push(pathInfo);
    
    // Выводим информацию о найденном пути
    console.log("Вершины пути: " + context.currentPath);
    console.log("  Расстояние: " + context.totalDistance.toFixed(2) + " км");
    console.log("  Стоимость: " + context.totalPrice.toFixed(2) + " у.е.\n");
    
    return pathInfo;
}

// ОСНОВНАЯ ФУНКЦИЯ: теперь стала намного компактнее и читаемее
function findPathWithContext(current, context) {
    var neighbors = getNeighbors(context.graph, current);
    
    for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        
        // Пропускаем уже посещенные вершины
        if (context.visited[neighbor]) {
            continue;
        }
        
        // Подготавливаемся к переходу в соседнюю вершину
        var moveData = prepareMoveToNeighbor(context, current, neighbor);
        
        // Проверяем, достигли ли цели
        if (neighbor === context.target) {
            // Нашли путь - сохраняем его
            handleFoundPath(context);
        } else {
            // Рекурсивно идем дальше
            findPathWithContext(neighbor, context);
        }
        
        // Возвращаемся назад (backtracking)
        backtrackFromNeighbor(context, neighbor, moveData.oldState);
    }
}

// Инициализация поиска (точка входа)
function initPathSearch(graph, start, end) {
    // Проверка корректности параметров (как в Дракон-схеме)
    if (graph.size <= 0 || start < 0 || end < 0 || 
        start >= graph.size || end >= graph.size) {
        console.log("Неверные параметры");
        return [];
    }
    
    // Создаем и настраиваем контекст
    var context = createSearchContext(graph);
    context = resetSearchContext(context, start, end);
    
    console.log("\n=== Поиск всех путей от " + start + " до " + end + " ===");
    
    // Запускаем поиск
    findPathWithContext(start, context);
    
    return context.allPaths;
}

// ==================== Модуль 4: Вспомогательные функции ====================

// Функция для вывода всех путей
function printAllPaths(paths, title) {
    if (paths.length === 0) {
        console.log("Путей не найдено");
        return;
    }
    
    console.log("\n=== " + title + ": Найдено путей: " + paths.length + " ===");
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        console.log((i + 1) + ". " + path.path);
        console.log("   Расстояние: " + path.distance.toFixed(2) + " км");
        console.log("   Стоимость: " + path.price.toFixed(2) + " у.е.");
    }
}

// Поиск кратчайшего пути
function findShortestByDistance(paths) {
    if (paths.length === 0) return null;
    
    var shortest = paths[0];
    for (var i = 1; i < paths.length; i++) {
        if (paths[i].distance < shortest.distance) {
            shortest = paths[i];
        }
    }
    return shortest;
}

// Поиск самого дешевого пути
function findCheapestByPrice(paths) {
    if (paths.length === 0) return null;
    
    var cheapest = paths[0];
    for (var i = 1; i < paths.length; i++) {
        if (paths[i].price < cheapest.price) {
            cheapest = paths[i];
        }
    }
    return cheapest;
}

// ==================== Модуль 5: Основная программа ====================

function main() {
    // Создаем граф из данных

    var graph = createGraphFromData();
    
    // Выводим матрицу смежности
    console.log("Матрица смежности (расстояния):");
    for (var i = 0; i < graph.size; i++) {
        var row = '';
        for (var j = 0; j < graph.size; j++) {
            row += graph.matrix[i][j].toFixed(1) + ' ';
        }
        console.log(row);
    }
    
    // Поиск путей от 0 до 5
    var paths_0_5 = initPathSearch(graph, 0, 5);
    printAllPaths(paths_0_5, "Пути от 0 до 5");
    
    // Поиск путей от 1 до 6
    var paths_1_6 = initPathSearch(graph, 1, 6);
    printAllPaths(paths_1_6, "Пути от 1 до 6");
    
    // Поиск путей от 2 до 3
    var paths_2_3 = initPathSearch(graph, 2, 3);
    printAllPaths(paths_2_3, "Пути от 2 до 3");
    
    // Анализ для путей от 0 до 5
    if (paths_0_5.length > 0) {
        var shortest = findShortestByDistance(paths_0_5);
        var cheapest = findCheapestByPrice(paths_0_5);
        
        console.log("\n=== Анализ путей от 0 до 5 ===");
        console.log("Самый короткий путь: " + shortest.path);
        console.log("  Расстояние: " + shortest.distance.toFixed(2) + " км");
        console.log("  Стоимость: " + shortest.price.toFixed(2) + " у.е.");
        
        console.log("\nСамый дешевый путь: " + cheapest.path);
        console.log("  Расстояние: " + cheapest.distance.toFixed(2) + " км");
        console.log("  Стоимость: " + cheapest.price.toFixed(2) + " у.е.");
    }
}

// Запуск
main();