/**
 * Card.jsx
 * Reusable glassmorphism card container.
 * All cards in the app are built on this base.
 */

import { getGlassCard } from "../utils/theme";

/**
 * @param {Object}  props
 * @param {React.ReactNode} props.children
 * @param {Object}  [props.style]        - Additional inline styles
 * @param {string}  [props.animation]    - CSS animation string e.g. "fadeSlideUp 0.4s ease"
 * @param {boolean} [props.glow]         - Enable pulsing glow animation
 * @param {string}  [props.className]
 * @param {Function}[props.onClick]
 */
import React from 'react'
export default function Card({ children, style = {}, animation, glow, className, onClick }) {
  const base = getGlassCard();

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...base,
        ...(animation ? { animation } : {}),
        ...(glow ? { animation: "glowPulse 3s ease-in-out infinite" } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
