import { useState } from "react";
import MapCanvas from "./components/MapCanvas";
import { astar, weightedAstar } from "./algorithms/astar";
import "./index.css";

function App() {

  const locations = [
    "C1_A", "C1_B", "C1_C",
    "C2_A", "C2_B", "C2_C",
    "C3_A", "C3_B", "C3_C",
    "C4_A", "C4_B", "C4_C",
    "C5_A", "C5_B", "C5_C",
    "C6_A", "C6_B", "C6_C"
  ];

  const [algorithm, setAlgorithm] = useState("A*");
  const [start, setStart] = useState("C1_A");
  const [goal, setGoal] = useState("C6_C");
  const [weight, setWeight] = useState(1.5);

  const [path, setPath] = useState([]);

  const [result, setResult] = useState(null);

  // -----------------------------------------
  // FIND ROUTE
  // -----------------------------------------

  const findRoute = () => {

    let data;

    if (algorithm === "A*") {

      data = astar(start, goal);

    } else {

      data = weightedAstar(
        start,
        goal,
        Number(weight)
      );

    }

    setPath(data.path);

    setResult(data);
  };


  // -----------------------------------------
  // RESET
  // -----------------------------------------

  const reset = () => {

    setAlgorithm("A*");

    setStart("C1_A");

    setGoal("C6_C");

    setWeight(1.5);

    setPath([]);

    setResult(null);
  };


  return (

    <div className="container">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="sidebar">

        <h1>City Navigation</h1>

        <p className="subtitle">
          Route Optimization System
        </p>


        {/* Algorithm */}

        <label>
          Algorithm
        </label>

        <select
          value={algorithm}
          onChange={(e) =>
            setAlgorithm(e.target.value)
          }
        >

          <option value="A*">
            A*
          </option>

          <option value="Weighted A*">
            Weighted A*
          </option>

        </select>


        {/* Start */}

        <label>
          Start Location
        </label>

        <select
          value={start}
          onChange={(e) =>
            setStart(e.target.value)
          }
        >

          {locations.map((location) => (

            <option
              key={location}
              value={location}
            >
              {location}
            </option>

          ))}

        </select>


        {/* Destination */}

        <label>
          Destination
        </label>

        <select
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
        >

          {locations.map((location) => (

            <option
              key={location}
              value={location}
            >
              {location}
            </option>

          ))}

        </select>


        {/* Weight */}

        {algorithm === "Weighted A*" && (

          <>
            <label>
              Heuristic Weight
            </label>

            <input
              type="number"
              min="1"
              step="0.1"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />
          </>

        )}


        {/* Buttons */}

        <button
          className="findButton"
          onClick={findRoute}
        >
          Find Route
        </button>


        <button
          className="resetButton"
          onClick={reset}
        >
          Reset
        </button>


        {/* Legend */}

        <div className="legend">

          <h3>Map Legend</h3>

          <p>
            <span className="greenDot"></span>
            Start
          </p>

          <p>
            <span className="redDot"></span>
            Destination
          </p>

          <p>
            <span className="blueLine"></span>
            Selected Route
          </p>

          <p>
            🚗 Moving Vehicle
          </p>

        </div>

      </aside>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="main">

        <header className="header">

          <div>

            <h2>
              Interactive City Map
            </h2>

            <p>
              A* Route Optimization & Navigation
            </p>

          </div>

          <div className="status">

            {result
              ? "Route Found"
              : "Ready"
            }

          </div>

        </header>


        {/* =====================================
            STAT CARDS
        ===================================== */}

        <div className="stats">

          <div className="card">

            <h2>6</h2>

            <p>
              Cities
            </p>

          </div>


          <div className="card">

            <h2>18</h2>

            <p>
              Locations
            </p>

          </div>


          <div className="card">

            <h2>32</h2>

            <p>
              Roads
            </p>

          </div>


          <div className="card">

            <h2>2</h2>

            <p>
              Algorithms
            </p>

          </div>

        </div>


        {/* =====================================
            MAP
        ===================================== */}

        <div className="mapBox">

          <MapCanvas
            path={path}
            start={start}
            goal={goal}
          />

        </div>


        {/* =====================================
            ROUTE DETAILS
        ===================================== */}

        <div className="routePanel">

          <h3>
            Route Details
          </h3>


          {!result && (

            <p className="empty">
              Select a start location and
              destination, then click
              <b> Find Route</b>.
            </p>

          )}


          {result && result.path.length > 0 && (

            <>

              <div className="routePath">

                {result.path.map(
                  (node, index) => (

                    <span key={node}>

                      <span className="routeNode">
                        {node}
                      </span>

                      {index <
                        result.path.length - 1 && (
                        <span className="arrow">
                          →
                        </span>
                      )}

                    </span>

                  )
                )}

              </div>


              <div className="routeStats">

                <div>

                  <span>
                    Algorithm
                  </span>

                  <strong>
                    {algorithm}
                  </strong>

                </div>


                <div>

                  <span>
                    Total Cost
                  </span>

                  <strong>
                    {result.cost.toFixed(2)}
                  </strong>

                </div>


                <div>

                  <span>
                    Nodes Visited
                  </span>

                  <strong>
                    {result.nodesVisited}
                  </strong>

                </div>


                <div>

                  <span>
                    Execution Time
                  </span>

                  <strong>
                    {result.executionTime.toFixed(3)}
                    {" "}ms
                  </strong>

                </div>

              </div>

            </>

          )}


          {result && result.path.length === 0 && (

            <p className="noRoute">
              No route found between these
              locations.
            </p>

          )}

        </div>

      </main>

    </div>

  );
}

export default App;