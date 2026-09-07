import { graph, nodes } from "../data/graph";

// Euclidean distance heuristic
function heuristic(a, b) {
  const dx = nodes[a].x - nodes[b].x;
  const dy = nodes[a].y - nodes[b].y;

  return Math.sqrt(dx * dx + dy * dy);
}

// A*
export function astar(start, goal) {
  return search(start, goal, 1);
}

// Weighted A*
export function weightedAstar(start, goal, weight = 1.5) {
  return search(start, goal, weight);
}

// Common search function
function search(start, goal, weight) {

  const startTime = performance.now();

  const open = [start];
  const closed = new Set();

  const gScore = {};
  const fScore = {};
  const parent = {};

  // Initialize scores
  Object.keys(nodes).forEach((node) => {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  });

  gScore[start] = 0;

  fScore[start] =
    weight * heuristic(start, goal);

  let nodesVisited = 0;

  while (open.length > 0) {

    // Select node with lowest f-score
    open.sort((a, b) => {
      return fScore[a] - fScore[b];
    });

    const current = open.shift();

    if (closed.has(current)) {
      continue;
    }

    closed.add(current);
    nodesVisited++;

    // Destination reached
    if (current === goal) {

      const endTime = performance.now();

      // Reconstruct path
      const path = [];

      let temp = goal;

      while (temp) {
        path.unshift(temp);
        temp = parent[temp];
      }

      return {
        path: path,
        cost: gScore[goal],
        nodesVisited: nodesVisited,
        executionTime: endTime - startTime
      };
    }

    // Explore neighbors
    const neighbors = graph[current] || [];

    for (const edge of neighbors) {

      const neighbor = edge.to;

      if (closed.has(neighbor)) {
        continue;
      }

      const tentativeG =
        gScore[current] + edge.cost;

      // Better route found
      if (tentativeG < gScore[neighbor]) {

        parent[neighbor] = current;

        gScore[neighbor] = tentativeG;

        fScore[neighbor] =
          tentativeG +
          weight * heuristic(neighbor, goal);

        if (!open.includes(neighbor)) {
          open.push(neighbor);
        }
      }
    }
  }

  const endTime = performance.now();

  // No route
  return {
    path: [],
    cost: Infinity,
    nodesVisited: nodesVisited,
    executionTime: endTime - startTime
  };
}