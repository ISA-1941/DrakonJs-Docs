// =========================================================
// DIJKSTRA'S ALGORITHM - FUNCTION DECLARATIONS
// For DRAKON diagram generation
// =========================================================

// =========================================================
// FUNCTION 1: initializeDistances
// Creates and initializes the distance array
// =========================================================
function initializeDistances(vertices, startVertex) {
    // Create empty distances object
    const distances = {};
    
    // Set all distances to infinity initially
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        distances[vertex] = Infinity;
    }
    
    // Distance to start vertex is 0
    distances[startVertex] = 0;
    
    return distances;
}

// =========================================================
// FUNCTION 2: initializeVisited
// Creates and initializes the visited array (all zeros)
// =========================================================
function initializeVisited(vertices) {
    const visited = {};
    
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        visited[vertex] = false;  // 0 in classical description
    }
    
    return visited;
}

// =========================================================
// FUNCTION 3: initializePrevious
// Creates and initializes the previous array (all null)
// =========================================================
function initializePrevious(vertices) {
    const previous = {};
    
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        previous[vertex] = null;
    }
    
    return previous;
}

// =========================================================
// FUNCTION 4: findMinDistanceVertex
// Finds unvisited vertex with minimum distance
// =========================================================
function findMinDistanceVertex(distances, visited) {
    let minVertex = null;
    let minDistance = Infinity;
    
    // Get all vertices from distances object
    const vertices = Object.keys(distances);
    
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        
        // Check if vertex is unvisited and has smaller distance
        if (!visited[vertex] && distances[vertex] < minDistance) {
            minDistance = distances[vertex];
            minVertex = vertex;
        }
    }
    
    return minVertex;
}

// =========================================================
// FUNCTION 5: relaxEdges
// Updates distances to neighbors through current vertex
// =========================================================
function relaxEdges(graph, currentVertex, distances, previous) {
    // Get all neighbors of current vertex
    const neighbors = Object.keys(graph[currentVertex]);
    
    for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        
        // Get edge weight
        const weight = graph[currentVertex][neighbor];
        
        // Calculate new potential distance
        const newDistance = distances[currentVertex] + weight;
        
        // If new path is shorter, update
        if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentVertex;
        }
    }
    
    return { distances, previous };
}

// =========================================================
// FUNCTION 6: markVertexVisited
// Marks a vertex as visited (sets a[v] = 1)
// =========================================================
function markVertexVisited(visited, vertex) {
    visited[vertex] = true;  // 1 in classical description
    return visited;
}

// =========================================================
// FUNCTION 7: allVerticesVisited
// Checks if all vertices are visited
// =========================================================
function allVerticesVisited(visited, vertices) {
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        if (!visited[vertex]) {
            return false;  // Found unvisited vertex
        }
    }
    return true;  // All vertices are visited
}

// =========================================================
// FUNCTION 8: getVerticesList
// Extracts vertices list from graph
// =========================================================
function getVerticesList(graph) {
    return Object.keys(graph);
}

// =========================================================
// FUNCTION 9: dijkstra
// Main algorithm function that uses all the above functions
// =========================================================
function dijkstra(graph, startVertex) {
    // Get list of all vertices
    const vertices = getVerticesList(graph);
    
    // Step 1: Initialize all data structures
    const distances = initializeDistances(vertices, startVertex);
    const visited = initializeVisited(vertices);
    const previous = initializePrevious(vertices);
    
    // Step 2: Main loop - continue until all vertices are visited
    while (true) {
        // Step 3: Find unvisited vertex with minimum distance
        const currentVertex = findMinDistanceVertex(distances, visited);
        
        // Step 4: If no vertex found, exit loop
        if (currentVertex === null) {
            break;
        }
        
        // Step 5: Mark current vertex as visited (a[v] = 1)
        markVertexVisited(visited, currentVertex);
        
        // Step 6: Relax all edges from current vertex
        relaxEdges(graph, currentVertex, distances, previous);
        
        // Step 7: Check if we should continue
        if (allVerticesVisited(visited, vertices)) {
            break;
        }
    }
    
    // Step 8: Return results
    return {
        distances: distances,
        previous: previous
    };
}

// =========================================================
// FUNCTION 10: reconstructPath
// Builds path from start to target using previous array
// =========================================================
function reconstructPath(previous, startVertex, targetVertex) {
    const path = [];
    let current = targetVertex;
    
    // Follow previous pointers back to start
    while (current !== null) {
        path.unshift(current);  // Add to beginning of array
        current = previous[current];
    }
    
    // Check if path actually starts at startVertex
    if (path[0] !== startVertex) {
        return [];  // No path exists
    }
    
    return path;
}

// =========================================================
// FUNCTION 11: printResults
// Displays the algorithm results in a readable format
// =========================================================
function printResults(distances, previous, startVertex) {
    console.log("\n" + "=".repeat(60));
    console.log("DIJKSTRA'S ALGORITHM - SHORTEST PATHS FROM VERTEX " + startVertex);
    console.log("=".repeat(60));
    
    console.log("\n📊 SHORTEST DISTANCES:");
    console.log("-".repeat(40));
    
    const vertices = Object.keys(distances).sort();
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        const distance = distances[vertex];
        const distStr = distance === Infinity ? "∞" : distance.toFixed(2);
        console.log("   From " + startVertex + " to " + vertex + ": " + distStr);
    }
    
    console.log("\n🗺️  SHORTEST PATHS:");
    console.log("-".repeat(40));
    
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        if (vertex !== startVertex && distances[vertex] !== Infinity) {
            const path = reconstructPath(previous, startVertex, vertex);
            console.log("   To " + vertex + ": " + path.join(" → ") + 
                       " (distance: " + distances[vertex].toFixed(2) + ")");
        }
    }
}

// =========================================================
// FUNCTION 12: runDijkstraExample
// Main entry point for the example
// =========================================================
function runDijkstraExample() {
    // Define the graph
    const graph = {
Deikstra
    };
    
    const startVertex = "0";
    
    // Run Dijkstra's algorithm
    const result = dijkstra(graph, startVertex);
    
    // Print results
    printResults(result.distances, result.previous, startVertex);
    
    return result;
}

// =========================================================
// FUNCTION 13: demonstrateStepByStep
// Shows step-by-step execution for educational purposes
// =========================================================
function demonstrateStepByStep(graph, startVertex) {
    const vertices = getVerticesList(graph);
    const distances = initializeDistances(vertices, startVertex);
    const visited = initializeVisited(vertices);
    const previous = initializePrevious(vertices);
    const steps = [];
    
    let stepCount = 0;
    
    console.log("\n" + "=".repeat(60));
    console.log("STEP-BY-STEP EXECUTION");
    console.log("=".repeat(60));
    
    while (true) {
        // Record current state
        stepCount++;
        console.log("\n📌 Step " + stepCount + ":");
        
        const currentVertex = findMinDistanceVertex(distances, visited);
        
        if (currentVertex === null) {
            console.log("   No more vertices to process. Algorithm finished.");
            break;
        }
        
        console.log("   Current vertex: " + currentVertex);
        console.log("   Current distances:");
        
        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            const dist = distances[v];
            const distStr = dist === Infinity ? "∞" : dist.toFixed(2);
            const visitedMark = visited[v] ? " [✓]" : " [ ]";
            console.log("     " + v + ": " + distStr + visitedMark);
        }
        
        // Mark as visited
        markVertexVisited(visited, currentVertex);
        
        // Relax edges
        relaxEdges(graph, currentVertex, distances, previous);
    }
    
    console.log("\n✅ Final distances:");
    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        console.log("   " + v + ": " + distances[v].toFixed(2));
    }
}

// =========================================================
// Execute the example
// =========================================================
runDijkstraExample();

// Uncomment to see step-by-step execution
// demonstrateStepByStep(graph, "0");