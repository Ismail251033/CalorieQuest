/**
 * storage.js
 * All localStorage read/write logic.
 * Uses a single key: "calorieQuestData"
 */

export const APP_KEY = "calorieQuestData";

/**
 * Returns the default application state.
 * Used for first launch and as a merge base.
 */
export function getDefaultData() {
  return {
    dailyGoal: 2000,
    meals: {},
    streak: 0,
    lastCompletedDate: null,
    xp: 0,
    level: 1,
    theme: "dark",
    language: "fr",
  };
}

/**
 * Reads and parses app data from localStorage.
 * Merges with defaults to handle schema evolution.
 * @returns {Object} App data
 */
export function getData() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    return { ...getDefaultData(), ...parsed };
  } catch (e) {
    console.warn("[CalorieQuest] Failed to read storage:", e);
    return getDefaultData();
  }
}

/**
 * Serializes and saves app data to localStorage.
 * @param {Object} data - Full app state
 */
export function saveData(data) {
  try {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("[CalorieQuest] Failed to save storage:", e);
  }
}

/**
 * Clears all app data from localStorage.
 * Used for reset / dev purposes.
 */
export function clearData() {
  try {
    localStorage.removeItem(APP_KEY);
  } catch (e) {
    console.warn("[CalorieQuest] Failed to clear storage:", e);
  }
}
