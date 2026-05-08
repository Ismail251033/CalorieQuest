/**
 * theme.js
 * CSS variable injection for dark / light themes.
 * Applies values directly to document.documentElement.
 */

const DARK_VARS = {
  "--bg-primary":    "#0d0d1a",
  "--bg-secondary":  "#12122a",
  "--bg-card":       "rgba(255,255,255,0.04)",
  "--bg-card-hover": "rgba(255,255,255,0.07)",
  "--border-color":  "rgba(255,255,255,0.08)",
  "--text-primary":  "#f0f0ff",
  "--text-secondary":"rgba(240,240,255,0.55)",
  "--accent":        "#818cf8",
  "--accent2":       "#a78bfa",
  "--accent3":       "#38bdf8",
  "--success":       "#34d399",
  "--warning":       "#fb923c",
  "--danger":        "#ef4444",
  "--glow":          "rgba(129,140,248,0.25)",
};

const LIGHT_VARS = {
  "--bg-primary":    "#f0f0f8",
  "--bg-secondary":  "#e8e8f5",
  "--bg-card":       "rgba(255,255,255,0.75)",
  "--bg-card-hover": "rgba(255,255,255,0.95)",
  "--border-color":  "rgba(100,100,160,0.12)",
  "--text-primary":  "#1a1a2e",
  "--text-secondary":"rgba(26,26,46,0.55)",
  "--accent":        "#6366f1",
  "--accent2":       "#8b5cf6",
  "--accent3":       "#0ea5e9",
  "--success":       "#10b981",
  "--warning":       "#f97316",
  "--danger":        "#ef4444",
  "--glow":          "rgba(99,102,241,0.2)",
};

/**
 * Injects CSS variables into the document root for the given theme.
 * @param {"dark"|"light"} theme
 */
export function applyTheme(theme) {
  const vars = theme === "light" ? LIGHT_VARS : DARK_VARS;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Returns the shared glassCard style object.
 * Kept here so all components reference the same source of truth.
 * @returns {Object}
 */
export function getGlassCard() {
  return {
    background:          "var(--bg-card)",
    backdropFilter:      "blur(20px)",
    WebkitBackdropFilter:"blur(20px)",
    border:              "1px solid var(--border-color)",
    borderRadius:        24,
    padding:             "20px",
  };
}

/**
 * Returns the shared gradient text style object.
 * @returns {Object}
 */
export function getGradientText() {
  return {
    background:             "linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))",
    WebkitBackgroundClip:   "text",
    WebkitTextFillColor:    "transparent",
    backgroundClip:         "text",
  };
}

/** Global CSS string: animations + font + reset */
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { font-family: 'Outfit', sans-serif; }
  html, body, #root {
    background: var(--bg-primary, #0d0d1a);
    min-height: 100vh;
    font-family: 'Outfit', sans-serif;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }

  @keyframes confettiFall {
    0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes settingsFade {
    from { opacity: 0; transform: translateY(16px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes popIn {
    0%   { transform: scale(0.85); opacity: 0; }
    60%  { transform: scale(1.06); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 20px var(--glow), 0 0 40px transparent; }
    50%     { box-shadow: 0 0 30px var(--glow), 0 0 60px var(--glow);  }
  }
  @keyframes levelUpBounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.15) rotate(-2deg); }
    60%  { transform: scale(0.95) rotate(1deg);  }
    100% { transform: scale(1)    rotate(0deg);  }
  }
  @keyframes mealSlideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes shimmer {
    0%   { background-position:  200% 0; }
    100% { background-position: -200% 0; }
  }
`;
