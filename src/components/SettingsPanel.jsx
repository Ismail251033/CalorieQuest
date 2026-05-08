/**
 * SettingsPanel.jsx
 * Bottom-sheet settings panel (theme / language / daily goal).
 * Opens with a glassmorphism backdrop + slide-up animation.
 */
import React from 'react'
import { useState } from "react";
import { getGlassCard } from "../utils/theme";

/**
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose          - () => void
 * @param {Object}   props.data             - Full app state
 * @param {Function} props.onChangeTheme    - (theme: string) => void
 * @param {Function} props.onChangeLanguage - (lang: string) => void
 * @param {Function} props.onSaveGoal       - (goal: number) => void
 * @param {Object}   props.t                - Translation map
 */
export default function SettingsPanel({
  isOpen,
  onClose,
  data,
  onChangeTheme,
  onChangeLanguage,
  onSaveGoal,
  t,
}) {
  const [goalInput, setGoalInput] = useState(String(data.dailyGoal));
  const glass = getGlassCard();

  if (!isOpen) return null;

  function handleSave() {
    const parsed = Number(goalInput);
    if (parsed > 0) onSaveGoal(parsed);
    onClose();
  }

  const sectionLabel = {
    display: "block",
    fontSize: 12,
    color: "var(--text-secondary)",
    marginBottom: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.09em",
  };

  const toggleBtn = (active) => ({
    flex: 1,
    padding: "12px 0",
    borderRadius: 16,
    cursor: "pointer",
    fontFamily: "Outfit, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    border: active ? "2px solid var(--accent)" : "1px solid var(--border-color)",
    background: active ? "var(--glow)" : "var(--bg-card)",
    color: active ? "var(--accent)" : "var(--text-secondary)",
    transition: "all 0.25s",
  });

  const langBtn = (active) => ({
    flex: 1,
    padding: "12px 0",
    borderRadius: 16,
    cursor: "pointer",
    fontFamily: "Outfit, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    border: active ? "2px solid var(--accent2)" : "1px solid var(--border-color)",
    background: active ? "rgba(167,139,250,0.12)" : "var(--bg-card)",
    color: active ? "var(--accent2)" : "var(--text-secondary)",
    transition: "all 0.25s",
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 900,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...glass,
          width: "100%",
          maxWidth: 480,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: "none",
          padding: "28px 24px 44px",
          animation: "settingsFade 0.35s cubic-bezier(.34,1.56,.64,1)",
          background: data.theme === "dark"
            ? "rgba(18,18,42,0.98)"
            : "rgba(240,240,255,0.98)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>
            ⚙️ {t.settings}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "8px 14px",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: 18,
              transition: "all 0.2s",
              fontFamily: "Outfit, sans-serif",
            }}
          >✕</button>
        </div>

        {/* Theme */}
        <div style={{ marginBottom: 24 }}>
          <label style={sectionLabel}>🌙 {t.theme}</label>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onChangeTheme("dark")}
              style={toggleBtn(data.theme === "dark")}
            >🌙 {t.dark}</button>
            <button
              onClick={() => onChangeTheme("light")}
              style={toggleBtn(data.theme === "light")}
            >☀️ {t.light}</button>
          </div>
        </div>

        {/* Language */}
        <div style={{ marginBottom: 24 }}>
          <label style={sectionLabel}>🌍 {t.language}</label>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onChangeLanguage("fr")}
              style={langBtn(data.language === "fr")}
            >🇫🇷 Français</button>
            <button
              onClick={() => onChangeLanguage("en")}
              style={langBtn(data.language === "en")}
            >🇺🇸 English</button>
          </div>
        </div>

        {/* Daily Goal */}
        <div style={{ marginBottom: 28 }}>
          <label style={sectionLabel}>🎯 {t.dailyGoal} (kcal)</label>
          <input
            type="number"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder={String(data.dailyGoal)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: 16,
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontFamily: "Outfit, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e)  => { e.target.style.borderColor = "var(--accent)"; }}
            onBlur={(e)   => { e.target.style.borderColor = "var(--border-color)"; }}
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
          onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 18,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            color: "#fff",
            boxShadow: "0 8px 24px var(--glow)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >💾 {t.save}</button>
      </div>
    </div>
  );
}
