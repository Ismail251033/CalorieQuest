/**
 * App.jsx
 * Root component. Owns all global state, side effects, and event handlers.
 * Composes Header, pages, SettingsPanel, Toast, Confetti, BottomNav.
 */

import { useState, useEffect, useRef, useCallback } from "react";

// Utils
import { getData, saveData }               from "./utils/storage";
import { applyTheme, GLOBAL_CSS }          from "./utils/theme";
import { getTranslations }                 from "./utils/translations";
import {
  getTodayKey,
  getTodayCalories,
  getHistoryDays,
  checkAndUpdateStreak,
} from "./utils/calculations";

// Components
import Header        from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import Confetti      from "./components/Confetti";
import Toast         from "./components/Toast";
import BottomNav     from "./components/BottomNav";

// Pages
import Dashboard from "./pages/Dashboard";
import History   from "./pages/History";

export default function App() {
  // ─── Global State ─────────────────────────────────────────────────────────
  const [data,          setData]          = useState(getData);
  const [tab,           setTab]           = useState("dashboard");
  const [settingsOpen,  setSettingsOpen]  = useState(false);
  const [showConfetti,  setShowConfetti]  = useState(false);
  const [toast,         setToast]         = useState(null);
  const [levelUpAnim,   setLevelUpAnim]   = useState(false);

  // PWA install
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled,   setIsInstalled]   = useState(false);
  const [installAnim,   setInstallAnim]   = useState(false);

  // Refs to detect transitions (avoid spurious effects on re-renders)
  const prevGoalReached = useRef(false);
  const prevLevel       = useRef(data.level);

  // ─── Derived values ───────────────────────────────────────────────────────
  const lang        = data.language || "fr";
  const theme       = data.theme    || "dark";
  const t           = getTranslations(lang);
  const todayKey    = getTodayKey();
  const todayCals   = getTodayCalories(data);
  const todayMeals  = data.meals[todayKey] || [];
  const goalReached = todayCals >= data.dailyGoal;
  const overGoal    = todayCals >  data.dailyGoal;
  const historyDays = getHistoryDays(data);

  // ─── Side Effects ─────────────────────────────────────────────────────────

  /** Persist every data change to localStorage */
  useEffect(() => {
    saveData(data);
  }, [data]);

  /** Apply CSS variables whenever theme changes */
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  /** Confetti + toast when goal is first reached */
  useEffect(() => {
    if (goalReached && !prevGoalReached.current) {
      setShowConfetti(true);
      showToast(t.goalReached);
      setTimeout(() => setShowConfetti(false), 2800);
    }
    prevGoalReached.current = goalReached;
  }, [goalReached]);          // eslint-disable-line react-hooks/exhaustive-deps

  /** Level-up bounce + toast */
  useEffect(() => {
    if (data.level > prevLevel.current) {
      setLevelUpAnim(true);
      showToast(`${t.levelUp} ${t.level} ${data.level} 🚀`);
      setTimeout(() => setLevelUpAnim(false), 1200);
    }
    prevLevel.current = data.level;
  }, [data.level]);           // eslint-disable-line react-hooks/exhaustive-deps

  /** PWA install prompt capture */
  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // Already running as installed PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }, []);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  function handleAddMeal(name, calories) {
    const meal     = { id: Date.now(), name, calories };
    const dayMeals = [...(data.meals[todayKey] || []), meal];
    let updated    = { ...data, meals: { ...data.meals, [todayKey]: dayMeals } };
    updated        = checkAndUpdateStreak(updated);
    setData(updated);
  }

  function handleDeleteMeal(id) {
    const filtered = (data.meals[todayKey] || []).filter((m) => m.id !== id);
    setData({ ...data, meals: { ...data.meals, [todayKey]: filtered } });
  }

  function handleChangeTheme(newTheme) {
    setData((d) => ({ ...d, theme: newTheme }));
  }

  function handleChangeLanguage(newLang) {
    setData((d) => ({ ...d, language: newLang }));
  }

  function handleSaveGoal(goal) {
    setData((d) => ({ ...d, dailyGoal: goal }));
    showToast("✅ " + t.save);
  }

  async function handleInstall() {
    if (!installPrompt) {
      showToast(t.installGuide);
      return;
    }
    setInstallAnim(true);
    setTimeout(() => setInstallAnim(false), 600);
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setInstallPrompt(null);
      showToast(t.installSuccess);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Global CSS: animations, font, resets */}
      <style>{GLOBAL_CSS}</style>

      {/* Overlays */}
      <Confetti active={showConfetti} />
      <Toast    message={toast} theme={theme} />

      {/* Settings bottom-sheet */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        data={data}
        onChangeTheme={handleChangeTheme}
        onChangeLanguage={handleChangeLanguage}
        onSaveGoal={handleSaveGoal}
        t={t}
      />

      {/* App shell */}
      <div style={{
        minHeight: "100vh",
        background: theme === "dark"
          ? `radial-gradient(ellipse at 20% 0%,   rgba(99,102,241,0.15) 0%, transparent 55%),
             radial-gradient(ellipse at 80% 100%, rgba(167,139,250,0.12) 0%, transparent 55%),
             var(--bg-primary)`
          : `radial-gradient(ellipse at 20% 0%,   rgba(99,102,241,0.07) 0%, transparent 55%),
             radial-gradient(ellipse at 80% 100%, rgba(167,139,250,0.05) 0%, transparent 55%),
             var(--bg-primary)`,
        fontFamily: "Outfit, sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        paddingBottom: 90,
      }}>

        {/* Sticky header */}
        <Header
          streak={data.streak}
          theme={theme}
          t={t}
          onOpenSettings={() => setSettingsOpen(true)}
          onInstall={handleInstall}
          canInstall={!isInstalled}
          installAnim={installAnim}
          activeTab={tab}
        />

        {/* Page content */}
        {tab === "dashboard" && (
          <Dashboard
            data={data}
            todayCals={todayCals}
            todayMeals={todayMeals}
            goalReached={goalReached}
            overGoal={overGoal}
            levelUpAnim={levelUpAnim}
            onAddMeal={handleAddMeal}
            onDeleteMeal={handleDeleteMeal}
            t={t}
            theme={theme}
          />
        )}

        {tab === "history" && (
          <History
            data={data}
            historyDays={historyDays}
            t={t}
          />
        )}

        {/* Bottom navigation */}
        <BottomNav
          activeTab={tab}
          onTabChange={setTab}
          t={t}
          theme={theme}
        />
      </div>
    </>
  );
}
