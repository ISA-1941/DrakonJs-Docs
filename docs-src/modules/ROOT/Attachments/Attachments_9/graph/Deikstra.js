// =========================================================
// DIJKSTRA'S ALGORITHM
// Graph with 6 vertices (0-5)
// =========================================================

// Graph definition with weighted edges
const graph = {
    0: { 1: 48.3, 2: 40.7, 5: 25.4 },
    1: { 0: 48.3, 2: 37.5, 3: 29.8 },
    2: { 0: 40.7, 1: 37.5, 3: 34.9, 5: 29.8 },
    3: { 1: 29.8, 2: 34.9, 4: 25.4 },
    4: { 3: 25.4, 5: 34.9 },
    5: { 0: 25.4, 2: 29.8, 4: 34.9 }
};

// =========================================================
// DRAKON-generated Dijkstra's algorithm
// =========================================================
function dijkstra(graph, startVertex) {
    // INITIALIZATION
    const distances = {};
    const visited = {};
    const previous = {};
    
    // Set initial distances to infinity
    for (let vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    }
    distances[startVertex] = 0;
    
    // MAIN LOOP
    while (true) {
        // FIND VERTEX WITH MINIMUM DISTANCE
        let currentVertex = null;
        let minDistance = Infinity;
        
        for (let vertex in graph) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                currentVertex = vertex;
            }
        }
        
        // EXIT CONDITION: no more vertices to process
        if (currentVertex === null) {
            break;
        }
        
        // MARK AS VISITED
        visited[currentVertex] = true;
        
        // RELAX EDGES - check all neighbors
        for (let neighbor in graph[currentVertex]) {
            // Get edge weight
            const weight = graph[currentVertex][neighbor];
            
            // Calculate new potential distance
            const newDistance = distances[currentVertex] + weight;
            
            // Update if we found a shorter path
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = currentVertex;
            }
        }
    }
    
    // RETURN RESULTS
    return {
        distances: distances,
        previous: previous
    };
}

// =========================================================
// Helper function to reconstruct and display paths
// =========================================================
function getPath(previous, targetVertex) {
    const path = [];
    let current = targetVertex;
    
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    
    return path;
}

// =========================================================
// DEMONSTRATION: Find shortest paths from vertex 0
// =========================================================
console.log("=".repeat(60));
console.log("DIJKSTRA'S ALGORITHM - SHORTEST PATHS FROM VERTEX 0");
console.log("=".repeat(60));

const result = dijkstra(graph, '0');

console.log("\n📊 SHORTEST DISTANCES:");
console.log("-".repeat(40));
for (let vertex in result.distances) {
    console.log(`   From 0 to ${vertex}: ${result.distances[vertex].toFixed(2)}`);
}

console.log("\n🗺️  SHORTEST PATHS:");
console.log("-".repeat(40));
for (let vertex in result.previous) {
    if (vertex !== '0') {
        const path = getPath(result.previous, vertex);
        console.log(`   To ${vertex}: ${path.join(' → ')} (distance: ${result.distances[vertex].toFixed(2)})`);
    }
}

console.log("\n📋 DETAILED PATHS:");
console.log("-".repeat(40));
console.log("0 → 0: start vertex (distance: 0.00)");

// Path to vertex 1
console.log(`0 → 1: 0 → ${result.previous['1'] === '0' ? '1' : '...'} (distance: ${result.distances['1'].toFixed(2)})`);

// Path to vertex 2  
const path2 = getPath(result.previous, '2');
console.log(`0 → 2: ${path2.join(' → ')} (distance: ${result.distances['2'].toFixed(2)})`);

// Path to vertex 3
const path3 = getPath(result.previous, '3');
console.log(`0 → 3: ${path3.join(' → ')} (distance: ${result.distances['3'].toFixed(2)})`);

// Path to vertex 4
const path4 = getPath(result.previous, '4');
console.log(`0 → 4: ${path4.join(' → ')} (distance: ${result.distances['4'].toFixed(2)})`);

// Path to vertex 5
const path5 = getPath(result.previous, '5');
console.log(`0 → 5: ${path5.join(' → ')} (distance: ${result.distances['5'].toFixed(2)})`);

// =========================================================
// STEP-BY-STEP EXECUTION (for educational purposes)
// =========================================================
console.log("\n" + "=".repeat(60));
console.log("STEP-BY-STEP EXECUTION");
console.log("=".repeat(60));

function dijkstraWithSteps(graph, startVertex) {
    const distances = {};
    const visited = {};
    const previous = {};
    const steps = [];
    
    for (let vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    }
    distances[startVertex] = 0;
    
    let step = 1;
    
    while (true) {
        // Record current state
        steps.push({
            step: step++,
            visited: {...visited},
            distances: {...distances},
            current: null
        });
        
        let currentVertex = null;
        let minDistance = Infinity;
        
        for (let vertex in graph) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                currentVertex = vertex;
            }
        }
        
        if (currentVertex === null) break;
        
        // Update last step with current vertex
        steps[steps.length - 1].current = currentVertex;
        
        visited[currentVertex] = true;
        
        for (let neighbor in graph[currentVertex]) {
            const weight = graph[currentVertex][neighbor];
            const newDistance = distances[currentVertex] + weight;
            
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = currentVertex;
            }
        }
    }
    
    return { distances, previous, steps };
}

// Run step-by-step from vertex 0
const stepResult = dijkstraWithSteps(graph, '0');

stepResult.steps.forEach(s => {
    console.log(`\n📌 Step ${s.step}: Current vertex = ${s.current}`);
    console.log("   Distances:", Object.entries(s.distances)
        .map(([v, d]) => `${v}:${d === Infinity ? '∞' : d.toFixed(2)}`)
        .join(', '));
    console.log("   Visited:", Object.keys(s.visited).filter(v => s.visited[v]).join(', ') || 'none');
});