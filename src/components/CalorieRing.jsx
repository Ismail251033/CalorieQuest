/**
 * CalorieRing.jsx
 * Animated SVG circular progress ring showing daily calorie intake.
 * Color adapts: normal → accent, goal reached → success, over → warning.
 */

/**
 * @param {Object}  props
 * @param {number}  props.value       - Calories consumed today
 * @param {number}  props.goal        - Daily calorie goal
 * @param {number}  props.progress    - 0–100 percentage
 * @param {boolean} props.overGoal
 * @param {boolean} props.goalReached
 * @param {Object}  props.t           - Translation map
 */
import React from 'react'
export default function CalorieRing({ value, goal, progress, overGoal, goalReached, t }) {
  const RADIUS = 70;
  const CX     = 90;
  const CY     = 90;
  const CIRC   = 2 * Math.PI * RADIUS;
  const dash   = (Math.min(progress, 100) / 100) * CIRC;

  const strokeGradient = goalReached
    ? "url(#successGrad)"
    : overGoal
      ? "url(#warnGrad)"
      : "url(#progressGrad)";

  const glowStroke = goalReached
    ? "rgba(52,211,153,0.2)"
    : overGoal
      ? "rgba(251,146,60,0.2)"
      : "rgba(129,140,248,0.12)";

  const centerColor = goalReached
    ? "var(--success)"
    : overGoal
      ? "var(--warning)"
      : "var(--text-primary)";

  const labelColor = goalReached
    ? "var(--success)"
    : overGoal
      ? "var(--warning)"
      : "var(--text-secondary)";

  const labelText = goalReached
    ? t.goalReached
    : overGoal
      ? t.goalOver
      : `${Math.round(progress)}%`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: 180, height: 180 }}>

        {/* Radial glow behind ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowStroke} 0%, transparent 70%)`,
          }} />
        </div>

        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          {/* Animated progress arc */}
          <circle
            cx={CX} cy={CY} r={RADIUS}
            fill="none"
            stroke={strokeGradient}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${CIRC}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ transition: "stroke-dasharray 1s cubic-bezier(.34,1.56,.64,1)" }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="warnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: centerColor, lineHeight: 1 }}>
            {value.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600, marginTop: 2 }}>
            kcal
          </div>
          {goalReached && (
            <div style={{ fontSize: 18, marginTop: 4 }}>🎉</div>
          )}
        </div>
      </div>

      {/* Label below ring */}
      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: labelColor }}>
        {labelText}
      </div>
    </div>
  );
}
