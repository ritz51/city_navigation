// 18 City Locations
export const nodes = {
  C1_A: { x: 70, y: 50 },
  C1_B: { x: 150, y: 80 },
  C1_C: { x: 110, y: 140 },

  C2_A: { x: 40, y: 240 },
  C2_B: { x: 110, y: 280 },
  C2_C: { x: 210, y: 240 },

  C3_A: { x: 70, y: 410 },
  C3_B: { x: 150, y: 450 },
  C3_C: { x: 260, y: 360 },

  C4_A: { x: 470, y: 140 },
  C4_B: { x: 590, y: 70 },
  C4_C: { x: 650, y: 180 },

  C5_A: { x: 430, y: 300 },
  C5_B: { x: 540, y: 340 },
  C5_C: { x: 630, y: 260 },

  C6_A: { x: 700, y: 410 },
  C6_B: { x: 820, y: 330 },
  C6_C: { x: 920, y: 430 }
};

// Roads with weights
export const graph = {
  C1_A: [{to:"C1_B",cost:2},{to:"C1_C",cost:4}],
  C1_B: [{to:"C1_A",cost:2},{to:"C1_C",cost:3},{to:"C4_A",cost:8}],
  C1_C: [{to:"C1_A",cost:4},{to:"C1_B",cost:3},{to:"C2_A",cost:6}],

  C2_A: [{to:"C1_C",cost:6},{to:"C2_B",cost:3}],
  C2_B: [{to:"C2_A",cost:3},{to:"C2_C",cost:2},{to:"C4_B",cost:10}],
  C2_C: [{to:"C2_B",cost:2},{to:"C3_B",cost:5}],

  C3_A: [{to:"C3_B",cost:3}],
  C3_B: [{to:"C3_A",cost:3},{to:"C3_C",cost:2},{to:"C2_C",cost:5}],
  C3_C: [{to:"C3_B",cost:2},{to:"C5_A",cost:7}],

  C4_A: [{to:"C1_B",cost:8},{to:"C4_B",cost:2}],
  C4_B: [{to:"C4_A",cost:2},{to:"C4_C",cost:3},{to:"C2_B",cost:10},{to:"C6_B",cost:9}],
  C4_C: [{to:"C4_B",cost:3},{to:"C5_A",cost:4}],

  C5_A: [{to:"C4_C",cost:4},{to:"C5_B",cost:2},{to:"C3_C",cost:7}],
  C5_B: [{to:"C5_A",cost:2},{to:"C5_C",cost:3},{to:"C6_A",cost:6}],
  C5_C: [{to:"C5_B",cost:3}],

  C6_A: [{to:"C5_B",cost:6},{to:"C6_B",cost:2}],
  C6_B: [{to:"C6_A",cost:2},{to:"C6_C",cost:2},{to:"C4_B",cost:9}],
  C6_C: [{to:"C6_B",cost:2}]
};