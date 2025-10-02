"use client";
import React from "react";

type Props = {
  /** progress dalam 0..100 (boleh 0..1 juga; akan dideteksi otomatis) */
  value?: number | null | undefined;
  size?: number;      // px
  stroke?: number;    // px
  trackColor?: string;
  barColor?: string;
  label?: React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export default function ProgressCircle({
  value,
  size = 64,
  stroke = 8,
  trackColor = "rgba(255,255,255,0.15)",
  barColor = "var(--ut-gold, #f5b700)",
  label,
}: Props) {
  // Normalisasi angka → 0..100
  let v = Number(value);
  if (!Number.isFinite(v)) v = 0;
  // kalau input 0..1, anggap persen:
  if (v > 0 && v <= 1) v = v * 100;
  v = clamp(v, 0, 100);

  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r; // circumference
  const offset = C * (1 - v / 100);

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={barColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset .4s ease",
            // penting: selalu string & finite
            strokeDasharray: `${C} ${C}`,
            strokeDashoffset: String(offset),
          }}
        />
      </svg>
      {label !== undefined ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 12,
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
