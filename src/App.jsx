import { useState } from "react";
import MapCanvas from "./components/MapCanvas";
import { astar, weightedAstar } from "./algorithms/astar";
import "./index.css";

function App() {
  const locations = [
    "C1_A","C1_B","C1_C",
    "C2_A","C2_B","C2_C",
    "C3_A","C3_B","C3_C",
    "C4_A","C4_B","C4_C",
    "C5_A","C5_B","C5_C",
    "C6_A","C6_B","C6_C"
  ];

  const [algorithm, setAlgorithm] = useState("A*");
  const [start, setStart] = useState("C1_A");
  const [goal, setGoal] = useState("C6_C");
  const [weight, setWeight] = useState(1.5);

  const [path, setPath] = useState([]);
  const [route, setRoute] = useState("Select Start & Destination");

  const findRoute = () => {
    const result =
      algorithm === "A*"
        ? astar(start, goal)
        : weightedAstar(start, goal, Number(weight));

    setPath(result.path);

    setRoute(
      `Algorithm: ${algorithm}
Path: ${result.path.join(" → ")}
Cost: ${result.cost}`
    );
  };

  const reset = () => {
    setAlgorithm("A*");
    setStart("C1_A");
    setGoal("C6_C");
    setWeight(1.5);
    setPath([]);
    setRoute("Select Start & Destination");
  };

  return (
    <div className="container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h1>City Navigation</h1>

        <label>Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option>A*</option>
          <option>Weighted A*</option>
        </select>

        <label>Start</label>
        <select
          value={start}
          onChange={(e) => setStart(e.target.value)}
        >
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label>Destination</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label>Heuristic Weight</label>
        <input
          type="number"
          step="0.1"
          min="1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button onClick={findRoute}>Find Route</button>

        <button className="reset" onClick={reset}>
          Reset
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">

        <div className="stats">
          <div className="card">
            <h2>6</h2>
            <p>Cities</p>
          </div>

          <div className="card">
            <h2>18</h2>
            <p>Locations</p>
          </div>

          <div className="card">
            <h2>2</h2>
            <p>Algorithms</p>
          </div>
        </div>

        <div className="mapBox">
          <h2>Interactive City Map</h2>

          <MapCanvas
            path={path}
            start={start}
            goal={goal}
          />
        </div>

        <div className="routePanel">
          <h3>Route Details</h3>
          <pre>{route}</pre>
        </div>

      </main>
    </div>
  );
}

export default App;