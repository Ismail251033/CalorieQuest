/**
 * Toast.jsx
 * Floating notification that slides up from the bottom of the screen.
 * Disappears automatically (controlled by parent via `message` prop).
 */

/**
 * @param {Object}      props
 * @param {string|null} props.message  - Text to show. Null = hidden.
 * @param {string}      props.theme    - "dark" | "light"
 */
import React from 'react'
export default function Toast({ message, theme }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 96,
        left: "50%",
        transform: "translateX(-50%)",
        background: theme === "dark"
          ? "rgba(28,28,58,0.97)"
          : "rgba(240,240,255,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        padding: "12px 26px",
        borderRadius: 50,
        fontFamily: "Outfit, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        zIndex: 998,
        animation: "toastIn 0.3s cubic-bezier(.34,1.56,.64,1)",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}
