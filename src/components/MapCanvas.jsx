import { useEffect, useRef } from "react";
import { nodes, graph } from "../data/graph";

export default function MapCanvas({
  path = [],
  start = "",
  goal = ""
}) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 1000, 500);

    // Background
    ctx.fillStyle = "#F8FBFF";
    ctx.fillRect(0, 0, 1000, 500);

    // Draw roads from graph
    ctx.strokeStyle = "#B9C6D8";
    ctx.lineWidth = 2;

    Object.keys(graph).forEach((from) => {
      graph[from].forEach((edge) => {
        const A = nodes[from];
        const B = nodes[edge.to];

        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      });
    });

    // Highlight shortest path
    if (path.length > 1) {
      ctx.strokeStyle = "#2563EB";
      ctx.lineWidth = 5;

      for (let i = 0; i < path.length - 1; i++) {
        const A = nodes[path[i]];
        const B = nodes[path[i + 1]];

        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }
    }

    // Draw cities
    Object.keys(nodes).forEach((name) => {
      const { x, y } = nodes[name];

      let color = "#1F2937";

      if (name === start) color = "#16A34A";
      else if (name === goal) color = "#DC2626";
      else if (path.includes(name)) color = "#2563EB";

      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();

      ctx.fillStyle = "#111827";
      ctx.font = "14px Arial";
      ctx.fillText(name, x - 18, y - 18);
    });

  }, [path, start, goal]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{
        width: "100%",
        height: "430px",
        border: "3px solid #D8E0EA",
        borderRadius: "16px",
        background: "#F8FBFF"
      }}
    />
  );
}