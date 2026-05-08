/**
 * ProgressBar.jsx
 * Animated horizontal progress bar with gradient fill.
 * Used for daily calorie progress and XP bar.
 */

/**
 * @param {Object}  props
 * @param {number}  props.percent       - 0 to 100
 * @param {"calories"|"xp"} [props.variant]  - Visual style
 * @param {number}  [props.height]      - Bar height in px (default 8)
 * @param {boolean} [props.shimmer]     - Enable shimmer animation (default true for xp)
 */
export default function ProgressBar({ percent, variant = "calories", height = 8, shimmer }) {
  const isOver  = variant === "calories" && percent >= 100;
  const isXp    = variant === "xp";
  const doShimmer = shimmer !== undefined ? shimmer : isXp;

  const fillBackground = isOver
    ? "var(--warning)"
    : isXp
      ? "linear-gradient(90deg, #818cf8, #a78bfa, #38bdf8)"
      : percent >= 100
        ? "var(--success)"
        : "linear-gradient(90deg, var(--accent), var(--accent2))";

  return (
    <div
      style={{
        height,
        background: "var(--border-color)",
        borderRadius: 99,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(percent, 100)}%`,
          borderRadius: 99,
          background: fillBackground,
          backgroundSize: doShimmer ? "200% 100%" : undefined,
          transition: "width 0.9s cubic-bezier(.34,1.56,.64,1)",
          boxShadow: isXp
            ? "0 0 8px rgba(129,140,248,0.5)"
            : percent >= 100
              ? "0 0 8px rgba(52,211,153,0.4)"
              : "none",
          animation: doShimmer ? "shimmer 2.5s linear infinite" : undefined,
        }}
      />
    </div>
  );
}
