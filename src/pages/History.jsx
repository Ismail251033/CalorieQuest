/**
 * History.jsx
 * Shows the last 14 days of logged meals with progress bars.
 * Each day shows date, meal count, total calories and completion status.
 */

import Card        from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import { getCaloriesForDay, getProgressPercent, formatDateLabel } from "../utils/calculations";

/**
 * @param {Object} props
 * @param {Object} props.data        - Full app state
 * @param {Array}  props.historyDays - Sorted date key array (from calculations)
 * @param {Object} props.t           - Translation map
 */
export default function History({ data, historyDays, t }) {
  return (
    <div style={{ padding: "20px 16px", animation: "fadeSlideUp 0.4s ease" }}>
      <div style={{
        fontSize: 16,
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: 16,
        fontFamily: "Outfit, sans-serif",
      }}>
        📅 {t.history}
      </div>

      {historyDays.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "52px 24px" }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>📊</div>
          <div style={{ color: "var(--text-secondary)", fontSize: 14, fontFamily: "Outfit, sans-serif" }}>
            {t.noHistory}
          </div>
        </Card>
      ) : (
        historyDays.map((day, i) => {
          const meals    = data.meals[day] || [];
          const cals     = getCaloriesForDay(data, day);
          const pct      = getProgressPercent(cals, data.dailyGoal);
          const over     = cals > data.dailyGoal;
          const complete = cals >= data.dailyGoal;
          const label    = formatDateLabel(day, data.language);

          return (
            <Card
              key={day}
              style={{
                marginBottom: 10,
                animation: "mealSlideIn 0.32s ease",
                animationDelay: `${i * 0.06}s`,
                animationFillMode: "backwards",
              }}
            >
              {/* Top row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "Outfit, sans-serif",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontFamily: "Outfit, sans-serif",
                    marginTop: 2,
                  }}>
                    {meals.length} {t.meals}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: "Outfit, sans-serif",
                    color: over
                      ? "var(--warning)"
                      : complete
                        ? "var(--success)"
                        : "var(--accent)",
                  }}>
                    {cals.toLocaleString()}
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500, marginLeft: 3 }}>
                      kcal
                    </span>
                  </div>
                  <div style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: "2px 8px",
                    marginTop: 3,
                    background: complete
                      ? "rgba(52,211,153,0.15)"
                      : "rgba(129,140,248,0.1)",
                    color: complete ? "var(--success)" : "var(--text-secondary)",
                    fontFamily: "Outfit, sans-serif",
                  }}>
                    {complete ? `✅ ${t.complete}` : `⏳ ${t.incomplete}`}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <ProgressBar
                percent={pct}
                variant={over ? "calories" : complete ? "xp" : "calories"}
                height={5}
              />
            </Card>
          );
        })
      )}
    </div>
  );
}
