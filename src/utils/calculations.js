/**
 * calculations.js
 * Pure functions for calorie math, XP, streaks, and progress.
 * No side effects. No imports from other app modules.
 */

/**
 * Returns today's date key in YYYY-MM-DD format (local time).
 * @returns {string}
 */
export function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns yesterday's date key in YYYY-MM-DD format.
 * @returns {string}
 */
export function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Sums all meal calories for today.
 * @param {Object} data - Full app state
 * @returns {number}
 */
export function getTodayCalories(data) {
  const key = getTodayKey();
  const meals = data.meals[key] || [];
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

/**
 * Returns the total calories for a specific date key.
 * @param {Object} data - Full app state
 * @param {string} dateKey - YYYY-MM-DD
 * @returns {number}
 */
export function getCaloriesForDay(data, dateKey) {
  const meals = data.meals[dateKey] || [];
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

/**
 * Returns the XP required to reach the next level.
 * Formula: level * 500
 * @param {number} level
 * @returns {number}
 */
export function xpForNextLevel(level) {
  return level * 500;
}

/**
 * Returns the progress percentage toward the daily goal (capped at 100).
 * @param {number} calories
 * @param {number} goal
 * @returns {number} 0–100
 */
export function getProgressPercent(calories, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.min((calories / goal) * 100, 100);
}

/**
 * Returns the XP progress percentage toward the next level (capped at 100).
 * @param {number} xp
 * @param {number} level
 * @returns {number} 0–100
 */
export function getXpPercent(xp, level) {
  const needed = xpForNextLevel(level);
  return Math.min((xp / needed) * 100, 100);
}

/**
 * Checks if today's goal was reached and updates streak / XP / level accordingly.
 * Is idempotent: will not double-count if called multiple times on the same day.
 *
 * @param {Object} data - Full app state
 * @returns {Object} Updated app state (or original if no change needed)
 */
export function checkAndUpdateStreak(data) {
  const today = getTodayKey();
  const todayCals = getTodayCalories(data);

  // Goal not reached, or already counted for today
  if (todayCals < data.dailyGoal || data.lastCompletedDate === today) {
    return data;
  }

  const yesterday = getYesterdayKey();
  const newStreak = data.lastCompletedDate === yesterday ? data.streak + 1 : 1;

  let newXp = data.xp + 100;
  let newLevel = data.level;

  // Level up if XP threshold crossed (can cascade multiple levels)
  while (newXp >= xpForNextLevel(newLevel)) {
    newXp -= xpForNextLevel(newLevel);
    newLevel += 1;
  }

  return {
    ...data,
    streak: newStreak,
    lastCompletedDate: today,
    xp: newXp,
    level: newLevel,
  };
}

/**
 * Returns sorted history day keys (excluding today), most recent first.
 * Only includes days that have at least one meal logged.
 * @param {Object} data - Full app state
 * @param {number} limit - Max number of days to return (default 14)
 * @returns {string[]} Array of date keys
 */
export function getHistoryDays(data, limit = 14) {
  const today = getTodayKey();
  return Object.keys(data.meals)
    .filter((k) => k !== today && (data.meals[k] || []).length > 0)
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, limit);
}

/**
 * Returns a human-readable date label for a YYYY-MM-DD key.
 * @param {string} dateKey
 * @param {string} lang - 'fr' | 'en'
 * @returns {string}
 */
export function formatDateLabel(dateKey, lang) {
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  return new Date(dateKey + "T12:00:00").toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
