/**
 * translations.js
 * All UI strings for FR and EN.
 */

const TRANSLATIONS = {
  fr: {
    appName: "Calorie Quest",
    dashboard: "Tableau de bord",
    history: "Historique",
    today: "Aujourd'hui",
    calories: "Calories",
    goal: "Objectif",
    streak: "Série",
    level: "Niveau",
    xp: "XP",
    days: "jours",
    points: "Points",
    addMeal: "Ajouter un repas",
    mealName: "Nom du repas",
    mealCal: "Calories",
    add: "Ajouter",
    meals: "Repas",
    noMeals: "Aucun repas aujourd'hui",
    delete: "Supprimer",
    remaining: "Restant",
    burned: "Consommé",
    calToday: "kcal aujourd'hui",
    goalReached: "Objectif atteint ! 🎉",
    goalOver: "Objectif dépassé",
    under: "Sous l'objectif",
    levelUp: "Niveau supérieur !",
    settings: "Paramètres",
    theme: "Thème",
    dark: "Sombre",
    light: "Clair",
    language: "Langue",
    dailyGoal: "Objectif journalier",
    save: "Enregistrer",
    noHistory: "Aucun historique disponible",
    complete: "Complété",
    incomplete: "Incomplet",
    installApp: "Installer l'app",
    installSuccess: "✅ App installée !",
    installGuide: "📲 Ouvre dans Chrome pour installer",
    motivational: [
      "Chaque calorie compte. Tu es sur la bonne voie ! 💪",
      "La régularité bat la perfection. Continue comme ça ! 🔥",
      "Ton corps te remerciera demain ! ✨",
      "Un jour à la fois. Tu gères ! 🎯",
      "La discipline crée la liberté. Keep going! 🚀",
      "Aujourd'hui est une nouvelle chance. Saisis-la ! 🌟",
      "Petit à petit, l'oiseau fait son nid. 🐦",
    ],
  },
  en: {
    appName: "Calorie Quest",
    dashboard: "Dashboard",
    history: "History",
    today: "Today",
    calories: "Calories",
    goal: "Goal",
    streak: "Streak",
    level: "Level",
    xp: "XP",
    days: "days",
    points: "Points",
    addMeal: "Add a Meal",
    mealName: "Meal name",
    mealCal: "Calories",
    add: "Add",
    meals: "Meals",
    noMeals: "No meals logged today",
    delete: "Delete",
    remaining: "Remaining",
    burned: "Consumed",
    calToday: "kcal today",
    goalReached: "Goal reached! 🎉",
    goalOver: "Goal exceeded",
    under: "Under goal",
    levelUp: "Level Up!",
    settings: "Settings",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    language: "Language",
    dailyGoal: "Daily Goal",
    save: "Save",
    noHistory: "No history available yet",
    complete: "Complete",
    incomplete: "Incomplete",
    installApp: "Install app",
    installSuccess: "✅ App installed!",
    installGuide: "📲 Open in Chrome to install",
    motivational: [
      "Every calorie counts. You're on track! 💪",
      "Consistency beats perfection. Keep it up! 🔥",
      "Your body will thank you tomorrow! ✨",
      "One day at a time. You've got this! 🎯",
      "Discipline creates freedom. Keep going! 🚀",
      "Today is a new chance. Seize it! 🌟",
      "Small steps lead to big results. 🐦",
    ],
  },
};

export function getTranslations(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS["fr"];
}

export function getMotivationalMessage(lang) {
  const t = getTranslations(lang);
  const msgs = t.motivational;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export const SUPPORTED_LANGUAGES = ["fr", "en"];
export default TRANSLATIONS;
