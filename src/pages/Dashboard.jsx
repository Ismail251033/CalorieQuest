/**
 * Dashboard.jsx
 * Main view: calorie ring, XP bar, streak, meal input, meals list.
 * Receives all data and handlers as props — no direct state or storage access.
 */

import Card         from "../components/Card";
import CalorieRing  from "../components/CalorieRing";
import ProgressBar  from "../components/ProgressBar";
import MealInput    from "../components/MealInput";
import { getMotivationalMessage } from "../utils/translations";
import {
  getProgressPercent,
  getXpPercent,
  xpForNextLevel,
} from "../utils/calculations";

/**
 * @param {Object}   props
 * @param {Object}   props.data          - Full app state
 * @param {number}   props.todayCals     - Pre-computed today calories
 * @param {Array}    props.todayMeals    - Today's meal array
 * @param {boolean}  props.goalReached
 * @param {boolean}  props.overGoal
 * @param {boolean}  props.levelUpAnim
 * @param {Function} props.onAddMeal     - (name, calories) => void
 * @param {Function} props.onDeleteMeal  - (id) => void
 * @param {Object}   props.t             - Translation map
 * @param {string}   props.theme         - "dark" | "light"
 */
export default function Dashboard({
  data,
  todayCals,
  todayMeals,
  goalReached,
  overGoal,
  levelUpAnim,
  onAddMeal,
  onDeleteMeal,
  t,
  theme,
}) {
  const progress    = getProgressPercent(todayCals, data.dailyGoal);
  const remaining   = Math.max(data.dailyGoal - todayCals, 0);
  const xpPct       = getXpPercent(data.xp, data.level);
  const motivMsg    = getMotivationalMessage(data.language);

  const statCard = (label, value, color) => (
    <div style={{
      flex: 1,
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: "12px 8px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "Outfit, sans-serif" }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2, fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
        {label}
      </div>
    </div>
  );

  const gradientText = {
    background: "linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div style={{ padding: "20px 16px", animation: "fadeSlideUp 0.4s ease" }}>

      {/* Motivational banner */}
      <Card
        style={{
          marginBottom: 16,
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(167,139,250,0.08))",
          border: "1px solid rgba(129,140,248,0.2)",
          padding: "16px 20px",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>
          ✨ Motivation
        </div>
        <div style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.55, fontFamily: "Outfit, sans-serif" }}>
          {motivMsg}
        </div>
      </Card>

      {/* Calorie ring + stats row */}
      <Card
        glow
        style={{
          marginBottom: 16,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial background glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 220,
          height: 220,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${
            goalReached
              ? "rgba(52,211,153,0.1)"
              : overGoal
                ? "rgba(251,146,60,0.1)"
                : "rgba(129,140,248,0.08)"
          } 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }} />

        <CalorieRing
          value={todayCals}
          goal={data.dailyGoal}
          progress={progress}
          overGoal={overGoal}
          goalReached={goalReached}
          t={t}
        />

        {/* Stat pills */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {statCard(t.burned,    todayCals,       overGoal ? "var(--warning)" : "var(--accent)")}
          {statCard(t.goal,      data.dailyGoal,  "var(--text-secondary)")}
          {statCard(t.remaining, remaining,       "var(--success)")}
        </div>
      </Card>

      {/* XP / Level card */}
      <Card
        style={{
          marginBottom: 16,
          animation: levelUpAnim ? "levelUpBounce 0.65s ease" : undefined,
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "Outfit, sans-serif" }}>
              {t.level}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, fontFamily: "Outfit, sans-serif", ...gradientText }}>
              {data.level}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "Outfit, sans-serif" }}>
              {t.xp}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent2)", fontFamily: "Outfit, sans-serif" }}>
              {data.xp}{" "}
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                / {xpForNextLevel(data.level)}
              </span>
            </div>
          </div>
        </div>
        <ProgressBar percent={xpPct} variant="xp" shimmer />
      </Card>

      {/* Streak card */}
      <Card style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          background: "rgba(251,146,60,0.15)",
          border: "2px solid rgba(251,146,60,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          flexShrink: 0,
        }}>🔥</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "Outfit, sans-serif" }}>
            {t.streak}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fb923c", lineHeight: 1.1, fontFamily: "Outfit, sans-serif" }}>
            {data.streak}{" "}
            <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>
              {t.days}
            </span>
          </div>
        </div>
        {data.streak >= 3 && (
          <div style={{
            background: "rgba(251,146,60,0.15)",
            border: "1px solid rgba(251,146,60,0.3)",
            borderRadius: 12,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 700,
            color: "#fb923c",
            fontFamily: "Outfit, sans-serif",
          }}>
            {data.streak >= 7 ? "🏆 LEGEND" : "🔥 HOT"}
          </div>
        )}
      </Card>

      {/* Meal input */}
      <MealInput onAdd={onAddMeal} t={t} theme={theme} />

      {/* Meals list */}
      <Card>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: 14,
          fontFamily: "Outfit, sans-serif",
        }}>
          📋 {t.meals} ({todayMeals.length})
        </div>

        {todayMeals.length === 0 ? (
          <div style={{ textAlign: "center", padding: "28px 0", color: "var(--text-secondary)", fontSize: 14, fontFamily: "Outfit, sans-serif" }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>🥗</div>
            {t.noMeals}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {todayMeals.map((meal, i) => (
              <div
                key={meal.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: theme === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  padding: "11px 14px",
                  animation: "mealSlideIn 0.3s ease",
                  animationDelay: `${i * 0.05}s`,
                  animationFillMode: "backwards",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                  marginRight: 12,
                }}>🍴</div>

                {/* Name + calories */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "Outfit, sans-serif",
                  }}>
                    {meal.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, marginTop: 1, fontFamily: "Outfit, sans-serif" }}>
                    {meal.calories} kcal
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => onDeleteMeal(meal.id)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.88)"; }}
                  onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
                  title={t.delete}
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 10,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#ef4444",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
