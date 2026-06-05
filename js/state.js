// ============================================================
// MathSci Academy — State Engine
// All progress is persisted in localStorage under 'mathsci_v1'
// ============================================================

const STATE_KEY = 'mathsci_v1';

const DEFAULT_STATE = {
  version: 1,
  profile: {
    name: 'Learner',
    joined: null,
    avatar: 0,           // index into AVATARS array
    streak: 0,
    lastActiveDate: null,
    totalTimeMinutes: 0,
    sessionStart: null
  },
  xp: 0,
  level: 1,
  badges: [],            // array of badge ids earned
  lessons: {},           // { lessonId: { completed, completedAt, timeSpentMin, attempts } }
  exams: {},             // { examId: { attempts: [{score,pct,passed,date,answers}], bestPct, passed } }
  weakTopics: {},        // { topicTag: { wrong, total } }
  dailyXP: {},           // { 'YYYY-MM-DD': xp }
  settings: {
    soundEnabled: true,
    notificationsEnabled: false,
    darkMode: true
  }
};

// XP thresholds per level
const LEVEL_XP = [0,200,500,900,1400,2000,2700,3500,4400,5400,6500,8000,10000,12500,15000];
const LEVEL_TITLES = ['Novice','Explorer','Apprentice','Learner','Student','Thinker','Analyst','Scholar','Practitioner','Expert','Specialist','Advanced','Master','Grand Master','Mathematics Scientist'];

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const saved = JSON.parse(raw);
    // deep merge with defaults to handle new fields
    return deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), saved);
  } catch(e) {
    console.warn('State load error, resetting:', e);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch(e) {
    console.error('State save error:', e);
  }
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function resetState() {
  const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
  fresh.profile.joined = new Date().toISOString();
  saveState(fresh);
  return fresh;
}

// ---- XP & Levelling ----
function getLevel(xp) {
  for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP[i]) return i + 1;
  }
  return 1;
}

function getLevelProgress(xp) {
  const lvl = getLevel(xp);
  const current = LEVEL_XP[lvl - 1] || 0;
  const next = LEVEL_XP[lvl] || LEVEL_XP[LEVEL_XP.length - 1];
  const pct = Math.min(100, Math.round(((xp - current) / (next - current)) * 100));
  return { lvl, title: LEVEL_TITLES[lvl - 1] || 'Mathematics Scientist', current, next, pct, xpInLevel: xp - current, xpNeeded: next - current };
}

function addXP(state, amount, reason) {
  const before = getLevel(state.xp);
  state.xp += amount;
  const after = getLevel(state.xp);
  // track daily XP
  const today = todayStr();
  state.dailyXP[today] = (state.dailyXP[today] || 0) + amount;
  return { levelUp: after > before, newLevel: after, gained: amount, reason };
}

// ---- Streak ----
function todayStr() {
  return new Date().toISOString().slice(0,10);
}

function updateStreak(state) {
  const today = todayStr();
  const last = state.profile.lastActiveDate;
  if (last === today) return; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (last === yesterday) {
    state.profile.streak += 1;
  } else if (last !== today) {
    state.profile.streak = 1;
  }
  state.profile.lastActiveDate = today;
}

// ---- Weak Topics ----
function recordAnswer(state, topicTag, correct) {
  if (!state.weakTopics[topicTag]) state.weakTopics[topicTag] = { wrong: 0, total: 0 };
  state.weakTopics[topicTag].total++;
  if (!correct) state.weakTopics[topicTag].wrong++;
}

function getWeakTopics(state, topN = 5) {
  return Object.entries(state.weakTopics)
    .filter(([,v]) => v.total >= 2)
    .map(([tag, v]) => ({ tag, wrongRate: v.wrong / v.total, wrong: v.wrong, total: v.total }))
    .sort((a,b) => b.wrongRate - a.wrongRate)
    .slice(0, topN);
}

// ---- Badges ----
const BADGE_DEFS = [
  { id:'first_lesson',   icon:'🎯', name:'First Step',        desc:'Complete your first lesson',          xp:50  },
  { id:'streak_3',       icon:'🔥', name:'On Fire',           desc:'3-day learning streak',               xp:100 },
  { id:'streak_7',       icon:'⚡', name:'Week Warrior',      desc:'7-day learning streak',               xp:250 },
  { id:'streak_30',      icon:'💎', name:'Diamond Habit',     desc:'30-day learning streak',              xp:1000},
  { id:'first_pass',     icon:'✅', name:'First Pass',        desc:'Pass your first exam',                xp:200 },
  { id:'perfect_exam',   icon:'💯', name:'Perfect Score',     desc:'Score 100% on any exam',              xp:500 },
  { id:'stage1_done',    icon:'🥉', name:'Foundations Built', desc:'Complete all Stage 1 lessons',        xp:300 },
  { id:'stage2_done',    icon:'🥈', name:'Pre-Calc Pro',      desc:'Complete all Stage 2 lessons',        xp:400 },
  { id:'stage3_done',    icon:'🥇', name:'Calculus Champion', desc:'Complete all Stage 3 lessons',        xp:500 },
  { id:'stage4_done',    icon:'🏆', name:'Data Master',       desc:'Complete all Stage 4 lessons',        xp:600 },
  { id:'stage5_done',    icon:'🎓', name:'Grand Scholar',     desc:'Complete all Stage 5 lessons',        xp:1000},
  { id:'all_stages',     icon:'🌟', name:'Mathematics Scientist','desc':'Complete the full curriculum',   xp:2000},
  { id:'night_owl',      icon:'🦉', name:'Night Owl',         desc:'Study after 10pm',                    xp:75  },
  { id:'speed_reader',   icon:'⚡', name:'Speed Reader',      desc:'Complete a lesson in under 5 min',    xp:50  },
  { id:'comeback_kid',   icon:'💪', name:'Comeback Kid',      desc:'Retake and pass an exam you failed',  xp:150 },
  { id:'xp_500',         icon:'⭐', name:'Rising Star',       desc:'Earn 500 XP',                         xp:0   },
  { id:'xp_1000',        icon:'🌠', name:'Star Learner',      desc:'Earn 1000 XP',                        xp:0   },
  { id:'xp_5000',        icon:'🌌', name:'Galaxy Brain',      desc:'Earn 5000 XP',                        xp:0   },
];

function checkBadges(state, context = {}) {
  const earned = [];
  const has = id => state.badges.includes(id);

  if (!has('first_lesson') && Object.keys(state.lessons).length >= 1)
    earned.push('first_lesson');
  if (!has('streak_3') && state.profile.streak >= 3)  earned.push('streak_3');
  if (!has('streak_7') && state.profile.streak >= 7)  earned.push('streak_7');
  if (!has('streak_30') && state.profile.streak >= 30) earned.push('streak_30');
  if (!has('first_pass') && Object.values(state.exams).some(e => e.passed))
    earned.push('first_pass');
  if (!has('perfect_exam') && context.examScore === 100) earned.push('perfect_exam');
  if (!has('xp_500') && state.xp >= 500)   earned.push('xp_500');
  if (!has('xp_1000') && state.xp >= 1000) earned.push('xp_1000');
  if (!has('xp_5000') && state.xp >= 5000) earned.push('xp_5000');

  // stage completions — check if all non-exam lessons done
  const stagePrefix = ['W1L','W2L','W3L','W4L','W5L'];
  const stageBadge = ['stage1_done','stage2_done','stage3_done','stage4_done','stage5_done'];
  stagePrefix.forEach((prefix, i) => {
    const totalLessons = 7;
    const done = Object.keys(state.lessons).filter(k => k.startsWith(prefix) && state.lessons[k].completed).length;
    if (!has(stageBadge[i]) && done >= totalLessons) earned.push(stageBadge[i]);
  });

  if (!has('all_stages') && stageBadge.every(b => state.badges.includes(b) || earned.includes(b)))
    earned.push('all_stages');

  const hour = new Date().getHours();
  if (!has('night_owl') && hour >= 22) earned.push('night_owl');
  if (!has('comeback_kid') && context.wasRetake && context.passed) earned.push('comeback_kid');

  earned.forEach(id => {
    if (!state.badges.includes(id)) state.badges.push(id);
    const def = BADGE_DEFS.find(b => b.id === id);
    if (def && def.xp > 0) addXP(state, def.xp, 'Badge: ' + def.name);
  });

  return earned;
}

// Export globals
window.MSState = { loadState, saveState, resetState, addXP, getLevelProgress, getLevel, updateStreak, recordAnswer, getWeakTopics, checkBadges, BADGE_DEFS, LEVEL_TITLES, todayStr };
