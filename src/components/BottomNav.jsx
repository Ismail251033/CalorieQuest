/**
 * BottomNav.jsx
 * Fixed bottom navigation bar with two tabs: Dashboard and History.
 */

/**
 * @param {Object}   props
 * @param {string}   props.activeTab   - "dashboard" | "history"
 * @param {Function} props.onTabChange - (tab: string) => void
 * @param {Object}   props.t           - Translation map
 * @param {string}   props.theme       - "dark" | "light"
 */
export default function BottomNav({ activeTab, onTabChange, t, theme }) {
  const TABS = [
    { id: "dashboard", icon: "🏠", label: t.dashboard },
    { id: "history",   icon: "📊", label: t.history   },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: theme === "dark"
        ? "rgba(13,13,26,0.92)"
        : "rgba(240,240,248,0.92)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderTop: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 16px 18px",
      zIndex: 100,
    }}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.93)"; }}
            onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 16,
              background: isActive
                ? "linear-gradient(135deg, rgba(129,140,248,0.2), rgba(167,139,250,0.14))"
                : "transparent",
              border: isActive
                ? "1px solid rgba(129,140,248,0.3)"
                : "1px solid transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              transition: "all 0.25s",
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              fontFamily: "Outfit, sans-serif",
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
