/**
 * Confetti.jsx
 * Particle burst overlay displayed when daily goal is reached.
 * Renders 32 particles with random positions, sizes, colors and fall timing.
 */

const COLORS = ["#a78bfa", "#818cf8", "#38bdf8", "#34d399", "#fb923c", "#f472b6"];

/**
 * @param {Object}  props
 * @param {boolean} props.active - Show confetti when true
 */
import React from 'react'
export default function Confetti({ active }) {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 36 }, (_, i) => {
        const color   = COLORS[i % COLORS.length];
        const left    = (i * 2.8) % 100;
        const delay   = (i * 0.07) % 0.9;
        const size    = 6 + (i % 3) * 3;
        const rounded = i % 2 === 0;
        const dur     = 1.4 + (i % 5) * 0.18;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "-12px",
              width: size,
              height: size,
              borderRadius: rounded ? "50%" : "3px",
              background: color,
              animation: `confettiFall ${dur}s ${delay}s ease-in forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
