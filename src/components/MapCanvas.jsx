import { useEffect, useRef, useState } from "react";
import { nodes, roads } from "../data/graph";

function MapCanvas({
  path = [],
  start = "",
  goal = ""
}) {
  const canvasRef = useRef(null);

  const [carPosition, setCarPosition] = useState(null);

  // --------------------------------------------------
  // CAR ANIMATION
  // --------------------------------------------------

  useEffect(() => {
    if (path.length < 2) {
      setCarPosition(null);
      return;
    }

    let segment = 0;
    let progress = 0;
    let animationFrame;

    const speed = 0.012;

    function animate() {
      if (segment >= path.length - 1) {
        const finalNode = nodes[path[path.length - 1]];

        setCarPosition({
          x: finalNode.x,
          y: finalNode.y,
          angle: 0
        });

        return;
      }

      const from = nodes[path[segment]];
      const to = nodes[path[segment + 1]];

      // Smooth movement between two nodes
      const x =
        from.x + (to.x - from.x) * progress;

      const y =
        from.y + (to.y - from.y) * progress;

      // Calculate direction of car
      const angle =
        Math.atan2(
          to.y - from.y,
          to.x - from.x
        );

      setCarPosition({
        x,
        y,
        angle
      });

      progress += speed;

      if (progress >= 1) {
        progress = 0;
        segment++;
      }

      animationFrame =
        requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };

  }, [path]);


  // --------------------------------------------------
  // DRAW MAP
  // --------------------------------------------------

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Background
    ctx.fillStyle = "#F8FAFC";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    // --------------------------------------------------
    // DRAW ROADS
    // --------------------------------------------------

    roads.forEach(([from, to, cost]) => {

      const A = nodes[from];
      const B = nodes[to];

      const fromIndex = path.indexOf(from);
      const toIndex = path.indexOf(to);

      const isRoute =
        fromIndex !== -1 &&
        toIndex !== -1 &&
        Math.abs(fromIndex - toIndex) === 1;


      // Road
      ctx.beginPath();

      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);

      if (isRoute) {
        ctx.strokeStyle = "#2563EB";
        ctx.lineWidth = 6;
      } else {
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 3;
      }

      ctx.stroke();


      // --------------------------------------------------
      // ROAD COST
      // --------------------------------------------------

      const midX =
        (A.x + B.x) / 2;

      const midY =
        (A.y + B.y) / 2;

      // Small white background
      ctx.fillStyle = "#FFFFFF";

      ctx.beginPath();

      ctx.arc(
        midX,
        midY - 3,
        10,
        0,
        Math.PI * 2
      );

      ctx.fill();


      // Cost
      ctx.fillStyle = "#64748B";

      ctx.font = "11px Arial";

      ctx.textAlign = "center";

      ctx.fillText(
        cost,
        midX,
        midY + 1
      );

    });


    // --------------------------------------------------
    // DRAW LOCATIONS
    // --------------------------------------------------

    Object.entries(nodes).forEach(
      ([name, position]) => {

        let color = "#475569";

        // Start
        if (name === start) {
          color = "#16A34A";
        }

        // Destination
        else if (name === goal) {
          color = "#DC2626";
        }

        // Route nodes
        else if (path.includes(name)) {
          color = "#2563EB";
        }


        // Node circle
        ctx.beginPath();

        ctx.arc(
          position.x,
          position.y,
          11,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = color;

        ctx.fill();


        // White border
        ctx.strokeStyle = "#FFFFFF";

        ctx.lineWidth = 3;

        ctx.stroke();


        // Location name
        ctx.fillStyle = "#0F172A";

        ctx.font =
          "bold 12px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
          name,
          position.x,
          position.y - 18
        );

      }
    );


    // --------------------------------------------------
    // START LABEL
    // --------------------------------------------------

    if (start && nodes[start]) {

      const p = nodes[start];

      ctx.fillStyle = "#16A34A";

      ctx.font =
        "bold 11px Arial";

      ctx.fillText(
        "START",
        p.x,
        p.y + 29
      );
    }


    // --------------------------------------------------
    // DESTINATION LABEL
    // --------------------------------------------------

    if (goal && nodes[goal]) {

      const p = nodes[goal];

      ctx.fillStyle = "#DC2626";

      ctx.font =
        "bold 11px Arial";

      ctx.fillText(
        "DESTINATION",
        p.x,
        p.y + 29
      );
    }


    // --------------------------------------------------
    // DRAW MOVING CAR
    // --------------------------------------------------

    if (carPosition) {

      ctx.save();

      ctx.translate(
        carPosition.x,
        carPosition.y
      );

      ctx.rotate(
        carPosition.angle
      );


      // Car shadow
      ctx.fillStyle =
        "rgba(0,0,0,0.18)";

      ctx.beginPath();

      ctx.ellipse(
        0,
        7,
        18,
        5,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();


      // Car body
      ctx.fillStyle = "#F97316";

      ctx.beginPath();

      ctx.roundRect(
        -16,
        -8,
        32,
        15,
        5
      );

      ctx.fill();


      // Car roof
      ctx.fillStyle = "#EA580C";

      ctx.beginPath();

      ctx.roundRect(
        -9,
        -15,
        18,
        10,
        4
      );

      ctx.fill();


      // Windows
      ctx.fillStyle = "#DBEAFE";

      ctx.fillRect(
        -7,
        -13,
        6,
        6
      );

      ctx.fillRect(
        2,
        -13,
        6,
        6
      );


      // Wheels
      ctx.fillStyle = "#111827";

      ctx.beginPath();

      ctx.arc(
        -10,
        8,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.beginPath();

      ctx.arc(
        10,
        8,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();


      ctx.restore();
    }

  }, [
    path,
    start,
    goal,
    carPosition
  ]);


  return (
    <div className="map-wrapper">

      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "16px",
          background: "#F8FAFC",
          border: "1px solid #E2E8F0"
        }}
      />

    </div>
  );
}

export default MapCanvas;