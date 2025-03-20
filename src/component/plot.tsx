"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { data } from "../data/data.json";

const D3CanvasChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Set up the x and y scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.porePressure) as [number, number])
      .range([50, width - 50]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.tvdss) as [number, number])
      .range([50, height - 50]);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw title
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Pore Pressure Prediction - Well H-D-500", width / 2, 30);

    // Draw axes
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width - 50, height - 50);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, height - 50);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";

    // X-axis label
    ctx.fillText("Pressure (psi)", width / 2, height - 20);

    // Y-axis label (rotated)
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("TVDSS (m)", 0, 0);
    ctx.restore();

    // Draw data points as a line
    ctx.strokeStyle = "olive";
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = xScale(d.porePressure);
      const y = yScale(d.tvdss);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} width={500} height={800} style={{ border: "1px solid black" }} />;
};

export default D3CanvasChart;
