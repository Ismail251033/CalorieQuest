/**
 * Header.jsx
 * Sticky top bar: app name + streak badge + install button + settings button.
 */

/**
 * @param {Object}   props
 * @param {number}   props.streak
 * @param {string}   props.theme           - "dark" | "light"
 * @param {Object}   props.t               - Translation map
 * @param {Function} props.onOpenSettings  - () => void
 * @param {Function} props.onInstall       - () => void
 * @param {boolean}  props.canInstall      - Show install button
 * @param {boolean}  props.installAnim     - Trigger pop animation
 * @param {string}   props.activeTab
 */
export default function Header({
  streak,
  theme,
  t,
  onOpenSettings,
  onInstall,
  canInstall,
  installAnim,
  activeTab,
}) {
  const gradientText = {
    background: "linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const tabLabel = activeTab === "history" ? t.history : t.dashboard;

  return (
    <div style={{
      padding: "18px 20px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: theme === "dark"
        ? "rgba(13,13,26,0.85)"
        : "rgba(240,240,248,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-color)",
    }}>
      {/* Left: App name + current tab */}
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, ...gradientText }}>
          {t.appName}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>
          {tabLabel}
        </div>
      </div>

      {/* Right: streak + install + settings */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

        {/* Streak badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: streak > 0
            ? "rgba(251,146,60,0.15)"
            : "var(--bg-card)",
          border: `1px solid ${streak > 0 ? "rgba(251,146,60,0.35)" : "var(--border-color)"}`,
          borderRadius: 20,
          padding: "6px 12px",
        }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: streak > 0 ? "#fb923c" : "var(--text-secondary)",
            fontFamily: "Outfit, sans-serif",
          }}>
            {streak}
          </span>
        </div>

        {/* Install button — visible when browser supports PWA install */}
        {canInstall && (
          <button
            onClick={onInstall}
            title={t.installApp}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.88)"; }}
            onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              background: "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(129,140,248,0.18))",
              border: "1px solid rgba(56,189,248,0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              transition: "transform 0.15s, box-shadow 0.15s",
              animation: installAnim ? "popIn 0.5s cubic-bezier(.34,1.56,.64,1)" : "none",
              boxShadow: "0 0 14px rgba(56,189,248,0.2)",
            }}
          >📲</button>
        )}

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title={t.settings}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(45deg) scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1)"; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "rotate(20deg) scale(0.92)"; }}
          onMouseUp={(e)   => { e.currentTarget.style.transform = "rotate(45deg) scale(1.08)"; }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1)",
          }}
        >⚙️</button>
      </div>
    </div>
  );
}
