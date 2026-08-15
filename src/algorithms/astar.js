import { graph, nodes } from "../data/graph";

function heuristic(a, b) {
  const dx = nodes[a].x - nodes[b].x;
  const dy = nodes[a].y - nodes[b].y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function astar(start, goal) {
  return weightedAstar(start, goal, 1.0);
}

export function weightedAstar(start, goal, weight = 1) {
  const open = [start];
  const closed = new Set();

  const gScore = {};
  const fScore = {};
  const parent = {};

  Object.keys(nodes).forEach((n) => {
    gScore[n] = Infinity;
    fScore[n] = Infinity;
  });

  gScore[start] = 0;
  fScore[start] = heuristic(start, goal);

  while (open.length > 0) {
  
    open.sort((a, b) => fScore[a] - fScore[b]);
    const current = open.shift();

    if (current === goal) {
      const path = [];
      let temp = goal;

      while (temp) {
        path.unshift(temp);
        temp = parent[temp];
      }

      return {
        path,
        cost: gScore[goal]
      };
    }

    closed.add(current);

    for (const edge of graph[current]) {
      const neighbor = edge.to;

      if (closed.has(neighbor)) continue;

      const tentative = gScore[current] + edge.cost;

      if (tentative < gScore[neighbor]) {
        parent[neighbor] = current;
        gScore[neighbor] = tentative;
        fScore[neighbor] =
          tentative + weight * heuristic(neighbor, goal);

        if (!open.includes(neighbor))
          open.push(neighbor);
      }
    }
  }

  return {
    path: [],
    cost: -1
  };
}