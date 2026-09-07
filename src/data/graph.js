// All locations and their positions on the map
export const nodes = {
  C1_A: { x: 80, y: 70 },
  C1_B: { x: 180, y: 50 },
  C1_C: { x: 280, y: 100 },

  C2_A: { x: 70, y: 200 },
  C2_B: { x: 180, y: 230 },
  C2_C: { x: 300, y: 190 },

  C3_A: { x: 80, y: 350 },
  C3_B: { x: 190, y: 380 },
  C3_C: { x: 310, y: 330 },

  C4_A: { x: 470, y: 90 },
  C4_B: { x: 590, y: 60 },
  C4_C: { x: 700, y: 120 },

  C5_A: { x: 450, y: 230 },
  C5_B: { x: 570, y: 260 },
  C5_C: { x: 700, y: 210 },

  C6_A: { x: 450, y: 390 },
  C6_B: { x: 590, y: 360 },
  C6_C: { x: 720, y: 410 }
};


// Roads
// [starting point, ending point, cost]

const roads = [

  // City 1
  ["C1_A", "C1_B", 3],
  ["C1_B", "C1_C", 4],
  ["C1_A", "C1_C", 9],

  // City 2
  ["C2_A", "C2_B", 2],
  ["C2_B", "C2_C", 5],
  ["C2_A", "C2_C", 8],

  // City 3
  ["C3_A", "C3_B", 3],
  ["C3_B", "C3_C", 4],

  // City 4
  ["C4_A", "C4_B", 3],
  ["C4_B", "C4_C", 7],
  ["C4_A", "C4_C", 12],

  // City 5
  ["C5_A", "C5_B", 2],
  ["C5_B", "C5_C", 3],
  ["C5_A", "C5_C", 8],

  // City 6
  ["C6_A", "C6_B", 2],
  ["C6_B", "C6_C", 3],

  // Between cities
  ["C1_A", "C2_A", 6],
  ["C1_B", "C2_B", 10],
  ["C1_C", "C2_C", 8],

  ["C2_A", "C3_A", 7],
  ["C2_B", "C3_B", 8],
  ["C2_C", "C3_C", 6],

  ["C1_C", "C4_A", 10],
  ["C2_C", "C4_A", 13],
  ["C2_B", "C4_B", 14],

  ["C3_C", "C5_A", 7],

  ["C4_A", "C5_A", 6],
  ["C4_B", "C5_B", 5],
  ["C4_C", "C5_C", 4],

  ["C5_A", "C6_A", 11],
  ["C5_B", "C6_B", 6],
  ["C5_C", "C6_C", 12],

  ["C4_B", "C6_B", 16]
];


// Automatically create the graph
export const graph = {};


// Create empty arrays
Object.keys(nodes).forEach((node) => {
  graph[node] = [];
});


// Add roads in both directions
roads.forEach(([from, to, cost]) => {

  graph[from].push({
    to: to,
    cost: cost
  });

  graph[to].push({
    to: from,
    cost: cost
  });

});


// Export roads for MapCanvas
export { roads };