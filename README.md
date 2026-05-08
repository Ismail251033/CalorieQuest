# 🎯 Calorie Quest

Premium mobile-first calorie tracking app with gamification.
link: caloriequest-git-main-ismail251033s-projects.vercel.app

## 📂 Project Structure

```
/src
  /components
    BottomNav.jsx      – Fixed bottom tab bar
    CalorieRing.jsx    – Animated SVG progress ring
    Card.jsx           – Reusable glass card container
    Confetti.jsx       – Goal-reached particle burst
    Header.jsx         – Sticky top bar (streak / install / settings)
    MealInput.jsx      – Add meal form
    ProgressBar.jsx    – Animated progress bar (calories & XP)
    SettingsPanel.jsx  – Bottom-sheet settings modal
    Toast.jsx          – Slide-up notification
  /pages
    Dashboard.jsx      – Main view (ring, XP, streak, meals)
    History.jsx        – Last 14 days history
  /utils
    calculations.js    – Pure math: calories, XP, streak, dates
    storage.js         – localStorage read/write via single APP_KEY
    theme.js           – CSS variable injection + shared styles
    translations.js    – FR / EN translation maps
  App.jsx              – Root component, all state & handlers
  main.jsx             – React entry point
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📦 Data Storage

Single localStorage key: `calorieQuestData`

```json
{
  "dailyGoal": 2000,
  "meals": { "2025-01-15": [{ "id": 1, "name": "Lunch", "calories": 600 }] },
  "streak": 3,
  "lastCompletedDate": "2025-01-15",
  "xp": 200,
  "level": 2,
  "theme": "dark",
  "language": "fr"
}
```

## 🎮 Gamification Rules

| Event              | Reward          |
|--------------------|-----------------|
| Reach daily goal   | +100 XP + streak |
| Level up           | Every `level × 500` XP |
| Streak ≥ 3 days    | HOT badge 🔥    |
| Streak ≥ 7 days    | LEGEND badge 🏆 |

## 🌍 Languages

- 🇫🇷 French (default)
- 🇺🇸 English

## 📲 PWA Install

Served via HTTPS + manifest.json → browser shows native install prompt.
Add icons at `/public/icons/icon-192.png` and `/public/icons/icon-512.png`.
