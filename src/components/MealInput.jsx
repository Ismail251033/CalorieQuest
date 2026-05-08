/**
 * MealInput.jsx
 * Form to add a new meal (name + calories).
 * Handles its own local input state; calls onAdd(name, calories) on submit.
 */
import React from 'react'
import { useState } from "react";
import Card from "./Card";

/**
 * @param {Object}   props
 * @param {Function} props.onAdd   - (name: string, calories: number) => void
 * @param {Object}   props.t       - Translation map
 * @param {string}   props.theme   - "dark" | "light"
 */
export default function MealInput({ onAdd, t, theme }) {
  const [name, setName]     = useState("");
  const [cal,  setCal]      = useState("");
  const [anim, setAnim]     = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [calFocus,  setCalFocus]  = useState(false);

  const inputBg = theme === "dark"
    ? "rgba(255,255,255,0.04)"
    : "rgba(0,0,0,0.04)";

  const baseInput = {
    padding: "13px 16px",
    borderRadius: 14,
    border: "1px solid var(--border-color)",
    background: inputBg,
    color: "var(--text-primary)",
    fontFamily: "Outfit, sans-serif",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
  };

  function handleSubmit() {
    const calories = Number(cal);
    if (!name.trim() || !cal || isNaN(calories) || calories <= 0) return;
    setAnim(true);
    setTimeout(() => setAnim(false), 400);
    onAdd(name.trim(), calories);
    setName("");
    setCal("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 15,
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: 14,
      }}>
        🍽 {t.addMeal}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Meal name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          placeholder={t.mealName}
          style={{
            ...baseInput,
            borderColor: nameFocus ? "var(--accent)" : "var(--border-color)",
          }}
        />

        {/* Calories + Add button */}
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="number"
            value={cal}
            onChange={(e) => setCal(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setCalFocus(true)}
            onBlur={() => setCalFocus(false)}
            placeholder={`${t.mealCal} (kcal)`}
            style={{
              ...baseInput,
              flex: 1,
              borderColor: calFocus ? "var(--accent)" : "var(--border-color)",
            }}
          />

          <button
            onClick={handleSubmit}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.91)"; }}
            onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
            style={{
              padding: "0 22px",
              borderRadius: 14,
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              border: "none",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              cursor: "pointer",
              boxShadow: "0 6px 20px var(--glow)",
              transition: "transform 0.15s, box-shadow 0.15s",
              animation: anim ? "popIn 0.4s cubic-bezier(.34,1.56,.64,1)" : "none",
              flexShrink: 0,
            }}
          >+</button>
        </div>
      </div>
    </Card>
  );
}
