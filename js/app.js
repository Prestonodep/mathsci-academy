// ============================================================
// MathSci Academy — App Engine
// ============================================================

const AVATARS = ['🦁','🦊','🐺','🦅','🐉','🌟','⚡','🔥'];

let STATE;
let currentScreen  = 'dashboard';
let activeExamId   = null;
let examAnswers    = {};
let examRevealed   = {};
let timerInterval  = null;
let timeLeft       = 0;

// ─── INIT ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  STATE = MSState.loadState();
  if (!STATE.profile.joined) {
    STATE.profile.joined = new Date().toISOString();
    MSState.saveState(STATE);
    document.getElementById('onboarding-overlay').style.display = 'flex';
  } else {
    boot();
  }
});

function boot() {
  MSState.updateStreak(STATE);
  STATE.profile.sessionStart = Date.now();
  MSState.saveState(STATE);
  buildSidebar();
  renderSidebarFooter();
  goScreen('dashboard');
}

// ─── ONBOARDING ──────────────────────────────────────────
function completeOnboarding() {
  const name = (document.getElementById('onboard-name').value || '').trim() || 'Learner';
  STATE.profile.name = name;
  const sel = document.querySelector('#onboarding-overlay .avatar-chip.selected');
  STATE.profile.avatar = sel ? parseInt(sel.dataset.idx) : 0;
  MSState.saveState(STATE);
  document.getElementById('onboarding-overlay').style.display = 'none';
  boot();
}

function selectAvatar(el, idx) {
  el.closest('.avatar-row').querySelectorAll('.avatar-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// ─── SCREEN MANAGER ──────────────────────────────────────
function goScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('visible'));
  const el = document.getElementById('screen-' + name);
  if (el) { el.classList.add('visible'); currentScreen = name; }

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-screen="${name}"]`);
  if (nav) nav.classList.add('active');

  document.querySelector('.main-content').scrollTop = 0;

  // render screen content
  const hooks = {
    dashboard:    renderDashboard,
    analytics:    renderAnalytics,
    badges:       renderBadges,
    certificates: renderCerts,
    settings:     renderSettings,
  };
  if (hooks[name]) hooks[name]();

  // update badge count
  const bc = document.getElementById('nav-badge-count');
  if (bc) bc.textContent = STATE.badges.length;
}

// alias so inline onclick="showScreen(...)" still works
function showScreen(name) { goScreen(name); }

// ─── SIDEBAR ─────────────────────────────────────────────
function buildSidebar() {
  const tree = document.getElementById('stage-tree');
  if (!tree) return;

  let html = '';
  CURRICULUM.stages.forEach((stage, si) => {
    const mods = getStageModules(stage.id);
    html += `
      <div class="stage-group" id="sg-${stage.id}">
        <button class="stage-group-header" onclick="toggleStageGroup('${stage.id}')">
          <span class="stage-dot" style="background:${stage.color}"></span>
          <span>Stage ${si+1}</span>
          <span style="color:var(--muted);font-size:10px;margin-left:2px">· ${stage.name}</span>
          <span class="stage-arrow">▶</span>
        </button>
        <div class="stage-children">
          <button class="stage-child-btn" id="sco-${stage.id}" onclick="showStageOverview('${stage.id}')">
            <span class="check"></span>Overview
          </button>
          ${mods.map(mod => {
            const done = STATE.lessons[mod.id]?.completed || STATE.exams[mod.id]?.passed;
            return `<button class="stage-child-btn${done?' done':''}" id="scb-${mod.id}"
              onclick="${mod.isExam ? `showExam('${mod.id}')` : `showLesson('${mod.id}')`}">
              <span class="check"></span>${mod.isExam ? '⬡ ' : ''}${mod.title}
            </button>`;
          }).join('')}
        </div>
      </div>`;
  });

  tree.innerHTML = html;
  toggleStageGroup('S1'); // open Stage 1 by default
}

function toggleStageGroup(id) {
  document.getElementById('sg-' + id)?.classList.toggle('open');
}

function setActiveChild(id) {
  document.querySelectorAll('.stage-child-btn, .stage-group-header').forEach(b => b.classList.remove('active'));
  (document.getElementById('scb-' + id) || document.getElementById('sco-' + id))?.classList.add('active');
}

function refreshSidebarMarks() {
  document.querySelectorAll('.stage-child-btn[id^="scb-"]').forEach(btn => {
    const id = btn.id.replace('scb-', '');
    const done = STATE.lessons[id]?.completed || STATE.exams[id]?.passed;
    btn.classList.toggle('done', !!done);
  });
}

// ─── SIDEBAR FOOTER ──────────────────────────────────────
function renderSidebarFooter() {
  const lp = MSState.getLevelProgress(STATE.xp);
  const el = document.getElementById('sidebar-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="streak-row">
      <span class="streak-flame">🔥</span>
      <span class="streak-num">${STATE.profile.streak}</span>
      <span style="font-size:11px">day streak</span>
    </div>
    <div class="xp-bar-row">
      <span>Level ${lp.lvl}</span>
      <span>${STATE.xp.toLocaleString()} XP</span>
    </div>
    <div class="xp-bar-track">
      <div class="xp-bar-fill" style="width:${lp.pct}%"></div>
    </div>
    <div class="level-row">
      <span class="level-title">${lp.title}</span>
      <span class="level-num">${lp.xpNeeded - lp.xpInLevel} to next</span>
    </div>`;
}

// ─── DASHBOARD ───────────────────────────────────────────
function renderDashboard() {
  const totalLessons = Object.values(STATE.lessons).filter(l => l.completed).length;
  const totalExams   = Object.values(STATE.exams).filter(e => e.passed).length;

  // Stats
  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s2)">${totalLessons}</div><div class="stat-chip-label">Lessons done</div></div>
    <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s1)">${totalExams}</div><div class="stat-chip-label">Exams passed</div></div>
    <div class="stat-chip"><div class="stat-chip-num" style="color:var(--warn)">${STATE.xp.toLocaleString()}</div><div class="stat-chip-label">Total XP</div></div>
    <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s3)">${STATE.badges.length}</div><div class="stat-chip-label">Badges earned</div></div>`;

  // Stage cards
  let stageHTML = '';
  CURRICULUM.stages.forEach((s, i) => {
    const mods  = getStageModules(s.id);
    const total = mods.filter(m => !m.isExam).length;
    const done  = mods.filter(m => !m.isExam && STATE.lessons[m.id]?.completed).length;
    const pct   = Math.round((done / total) * 100);
    stageHTML += `
      <div class="stage-card" data-stage="${i+1}" onclick="showStageOverview('${s.id}')">
        <div class="sc-tag" style="color:${s.color}">Stage ${i+1}</div>
        <div class="sc-title">${s.name}</div>
        <div class="sc-meta">${s.weeks} · ${s.meta}</div>
        <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${s.color}"></div></div>
        <div class="sc-prog-label">${done}/${total} lessons · ${pct}%</div>
      </div>`;
  });
  document.getElementById('dash-stage-grid').innerHTML = stageHTML;

  // 7-day activity chart
  const days = [];
  let maxXP = 1;
  for (let i = 6; i >= 0; i--) {
    const d  = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    const xp = STATE.dailyXP[d] || 0;
    days.push({ d, xp });
    maxXP = Math.max(maxXP, xp);
  }
  let chartHTML = '<div style="display:flex;gap:6px;align-items:flex-end;height:60px">';
  days.forEach(({ d, xp }) => {
    const h     = Math.max(4, Math.round((xp / maxXP) * 56));
    const today = d === MSState.todayStr();
    const label = new Date(d + 'T12:00').toLocaleDateString('en', { weekday:'short' }).slice(0,2);
    chartHTML += `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="width:100%;height:${h}px;background:${today?'var(--s2)':'var(--surf3)'};border-radius:3px 3px 0 0" title="${xp} XP on ${d}"></div>
        <span style="font-size:9px;color:var(--muted)">${label}</span>
      </div>`;
  });
  chartHTML += '</div>';
  document.getElementById('dash-activity').innerHTML = chartHTML;

  // Weak topics
  const weak   = MSState.getWeakTopics(STATE, 5);
  const weakEl = document.getElementById('dash-weak');
  weakEl.innerHTML = weak.length === 0
    ? '<div style="font-size:12px;color:var(--muted)">Complete exams to see your weak areas here.</div>'
    : weak.map(w => `
        <div class="weak-topic-row">
          <span style="min-width:130px;color:var(--text);font-size:12px">${w.tag.replace(/-/g,' ')}</span>
          <div class="weak-bar-track"><div class="weak-bar-fill" style="width:${Math.round(w.wrongRate*100)}%"></div></div>
          <span class="weak-pct">${Math.round(w.wrongRate*100)}%</span>
        </div>`).join('');

  // Greeting
  const hour   = new Date().getHours();
  const greet  = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const av     = AVATARS[STATE.profile.avatar] || '🦁';
  document.getElementById('dash-greeting').innerHTML = `${av} ${greet}, ${STATE.profile.name}`;
}

// ─── STAGE OVERVIEW ──────────────────────────────────────
function showStageOverview(stageId) {
  const stage = CURRICULUM.stages.find(s => s.id === stageId);
  const mods  = getStageModules(stageId);

  let html = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px">
      <div style="width:52px;height:52px;border-radius:13px;background:${stage.color}22;color:${stage.color};display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:22px;font-weight:800">${stage.num}</div>
      <div>
        <div class="page-title" style="margin-bottom:2px">${stage.name}</div>
        <div style="font-size:12.5px;color:var(--muted)">${stage.weeks} · ${stage.meta}</div>
      </div>
    </div>
    <div class="module-list">`;

  mods.forEach(mod => {
    const done     = STATE.lessons[mod.id]?.completed;
    const examData = STATE.exams[mod.id];
    const examPass = examData?.passed;
    const examBest = examData?.bestPct;

    let badge, badgeClass;
    if (mod.isExam) {
      badgeClass = examPass ? 'badge-done' : 'badge-exam';
      badge = examPass ? `Passed · ${examBest}%` : examData?.attempts?.length ? `Best: ${examBest}%` : 'Take exam';
    } else {
      badgeClass = done ? 'badge-done' : 'badge-new';
      badge = done ? 'Done ✓' : 'Start';
    }

    html += `
      <div class="module-row" onclick="${mod.isExam ? `showExam('${mod.id}')` : `showLesson('${mod.id}')`}">
        <div class="module-icon">${mod.icon || '📖'}</div>
        <div class="module-info">
          <div class="module-title">${mod.title}</div>
          <div class="module-meta">${mod.meta}</div>
        </div>
        <span class="module-badge ${badgeClass}">${badge}</span>
      </div>`;
  });

  html += '</div>';
  document.getElementById('stage-overview-content').innerHTML = html;
  setActiveChild('sco-' + stageId);
  goScreen('stage-overview');
}

// ─── LESSON RENDERER ─────────────────────────────────────
function showLesson(lessonId) {
  const data = CURRICULUM.lessons[lessonId];
  if (!data) { showLessonPlaceholder(lessonId); return; }
  const stage = CURRICULUM.stages.find(s => s.id === data.stageId);
  const mods  = getStageModules(data.stageId);
  const idx   = mods.findIndex(m => m.id === lessonId);
  const next  = idx < mods.length - 1 ? mods[idx + 1] : null;
  const prev  = idx > 0 ? mods[idx - 1] : null;
  const alreadyDone = !!STATE.lessons[lessonId]?.completed;

  let body = data.sections.map(sec => renderSection(sec, stage)).join('');

  document.getElementById('lesson-content').innerHTML = `
    <div class="lesson-breadcrumb">
      <span class="crumb" onclick="goScreen('dashboard')">Home</span> ›
      <span class="crumb" onclick="showStageOverview('${data.stageId}')">${stage.name}</span> ›
      <span style="color:var(--text)">Week ${data.week}</span>
    </div>
    <div style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.05em;background:${stage.color}18;color:${stage.color};margin-bottom:10px">Week ${data.week} · ${stage.name}</div>
    <div class="lesson-title-h">${data.title}</div>
    <div class="lesson-meta-row">
      <span>⏱ ${data.readMin} min read</span>
      <span>⭐ ${data.xp} XP</span>
      <span>📚 ${stage.name}</span>
    </div>
    ${body}
    <div class="lesson-nav-bar">
      <button class="btn-ghost" onclick="${prev ? (prev.isExam ? `showExam('${prev.id}')` : `showLesson('${prev.id}')`) : `showStageOverview('${data.stageId}')`}">
        ← ${prev ? prev.title : 'Stage overview'}
      </button>
      <button class="btn-primary" id="complete-btn" onclick="completeLesson('${lessonId}')">
        ${alreadyDone ? 'Completed ✓ — Continue →' : 'Mark complete & continue →'}
      </button>
    </div>`;

  setActiveChild(lessonId);
  goScreen('lesson');

  if (!STATE.lessons[lessonId]) STATE.lessons[lessonId] = {};
  STATE.lessons[lessonId].startedAt = STATE.lessons[lessonId].startedAt || new Date().toISOString();
  MSState.saveState(STATE);
}

function renderSection(sec, stage) {
  switch (sec.type) {
    case 'intro':   return `<p class="ls-p" style="font-size:14.5px;color:var(--text)">${sec.text}</p>`;
    case 'h2':      return `<div class="ls-h2">${sec.text}</div>`;
    case 'h3':      return `<div class="ls-h3">${sec.text}</div>`;
    case 'p':       return `<p class="ls-p">${sec.text}</p>`;
    case 'formula': return `<div class="formula-box">${sec.text}</div>`;
    case 'note':    return `<div class="callout callout-note"><div class="callout-label">📌 Note</div>${sec.text}</div>`;
    case 'science': return `<div class="callout callout-science"><div class="callout-label">🔬 Science Connection</div>${sec.text}</div>`;
    case 'tip':     return `<div class="callout callout-tip"><div class="callout-label">💡 Tip</div>${sec.text}</div>`;
    case 'visual':
      return sec.kind === 'number-line' ? renderNumberLine(sec.range) : '';
    case 'worked':
      return `<div class="worked-block">
        <div class="worked-label">${sec.label}</div>
        ${sec.steps.map((s, i) => `
          <div class="worked-step">
            <div class="step-n">${i + 1}</div>
            <div><span class="mono">${s[0]}</span>${s[1] ? `<span class="aside"> — ${s[1]}</span>` : ''}</div>
          </div>`).join('')}
      </div>`;
    case 'table':
      return `<table class="data-table">
        ${sec.rows.map((row, ri) =>
          `<tr>${row.map(c => ri === 0 ? `<th>${c}</th>` : `<td>${c}</td>`).join('')}</tr>`
        ).join('')}
      </table>`;
    case 'keypoints':
      return `<div class="key-points-block">
        <div class="key-points-title">Key takeaways</div>
        ${sec.points.map(p => `<div class="key-point">${p}</div>`).join('')}
      </div>`;
    default: return '';
  }
}

function renderNumberLine(range) {
  const [min, max] = range;
  const count = max - min + 1;
  const w = 560, h = 80, pad = 40;
  const step = (w - pad * 2) / (count - 1);
  let svg = `<svg viewBox="0 0 ${w} ${h}" style="width:100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="${pad}" y1="${h/2}" x2="${w-pad}" y2="${h/2}" stroke="#3a3f4e" stroke-width="1.5"/>
    <polygon points="${w-pad},${h/2-4} ${w-pad+10},${h/2} ${w-pad},${h/2+4}" fill="#3a3f4e"/>
    <polygon points="${pad},${h/2-4} ${pad-10},${h/2} ${pad},${h/2+4}" fill="#3a3f4e"/>`;
  for (let i = 0; i < count; i++) {
    const n = min + i;
    const x = pad + i * step;
    const col = n < 0 ? '#f87171' : n === 0 ? '#6ee7b7' : '#818cf8';
    svg += `<line x1="${x}" y1="${h/2-6}" x2="${x}" y2="${h/2+6}" stroke="${col}" stroke-width="1.5"/>
      <text x="${x}" y="${h/2+22}" fill="${col}" font-size="11" text-anchor="middle" font-family="DM Mono,monospace">${n}</text>`;
    if (n === 0) svg += `<circle cx="${x}" cy="${h/2}" r="5" fill="none" stroke="#6ee7b7" stroke-width="1.5"/>`;
  }
  return `<div class="number-line-svg">${svg}</svg></div>`;
}

function showLessonPlaceholder(id) {
  const mods = getAllModules();
  const mod  = mods.find(m => m.id === id);
  document.getElementById('lesson-content').innerHTML = `
    <div class="lesson-title-h">${mod?.title || id}</div>
    <p class="ls-p" style="margin-top:16px;color:var(--muted)">Full content for this lesson is being prepared. Explore the lessons already available.</p>
    <button class="btn-ghost" style="margin-top:20px" onclick="goScreen('dashboard')">← Back to dashboard</button>`;
  goScreen('lesson');
}

function completeLesson(lessonId) {
  const data = CURRICULUM.lessons[lessonId];
  if (!data) return;
  const alreadyDone = !!STATE.lessons[lessonId]?.completed;

  if (!STATE.lessons[lessonId]) STATE.lessons[lessonId] = {};
  STATE.lessons[lessonId].completed   = true;
  STATE.lessons[lessonId].completedAt = new Date().toISOString();
  STATE.lessons[lessonId].attempts    = (STATE.lessons[lessonId].attempts || 0) + 1;

  if (!alreadyDone) {
    const res = MSState.addXP(STATE, data.xp, 'Lesson: ' + data.title);
    showXPPop(data.xp);
    showToast('xp', '⭐', `+${data.xp} XP`, data.title + ' complete!');
    if (res.levelUp) showToast('level', '⬆️', `Level ${res.newLevel}!`, MSState.LEVEL_TITLES[res.newLevel - 1]);
  }

  const newBadges = MSState.checkBadges(STATE, {});
  newBadges.forEach(bid => {
    const def = MSState.BADGE_DEFS.find(b => b.id === bid);
    if (def) showToast('badge', def.icon, def.name, def.desc);
  });

  MSState.saveState(STATE);
  refreshSidebarMarks();
  renderSidebarFooter();

  // Advance to next module
  const mods = getStageModules(data.stageId);
  const next = mods[mods.findIndex(m => m.id === lessonId) + 1];
  if (next) setTimeout(() => next.isExam ? showExam(next.id) : showLesson(next.id), 300);
}

// ─── EXAM ENGINE ─────────────────────────────────────────
function showExam(examId) {
  const ex = CURRICULUM.exams[examId];
  if (!ex) { alert('Exam not available yet.'); return; }

  activeExamId = examId;
  examAnswers  = {};
  examRevealed = {};
  timeLeft     = ex.duration;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const el = document.getElementById('timer-val');
    if (el) el.textContent = fmtTime(timeLeft);
    if (timeLeft <= 300) document.getElementById('timer-chip')?.classList.add('warning');
    if (timeLeft <= 0) { clearInterval(timerInterval); submitExam(); }
  }, 1000);

  const ex2 = CURRICULUM.exams[activeExamId];
  const qdots = ex2.questions.map((_,i) =>
    `<div class="q-dot" id="qdot-${i}" onclick="scrollToQ(${i})">${i+1}</div>`).join('');

  const questions = ex2.questions.map((q, i) => `
    <div class="question-card" id="qcard-${i}">
      <div class="q-label">Question ${i+1} of ${ex2.questions.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="options-list">
        ${q.opts.map((o, j) => `
          <button class="option-btn" id="opt-${i}-${j}" onclick="selectOpt(${i},${j})">
            <span class="opt-letter">${'ABCD'[j]}</span>${o}
          </button>`).join('')}
      </div>
      <div class="explanation-box" id="exp-${i}"><strong>Explanation:</strong> ${q.exp}</div>
    </div>`).join('');

  document.getElementById('exam-content').innerHTML = `
    <div class="lesson-breadcrumb">
      <span class="crumb" onclick="confirmExitExam()">← Exit exam</span>
    </div>
    <div class="page-title">${ex2.title}</div>
    <div style="font-size:12.5px;color:var(--muted);margin-bottom:20px">${ex2.questions.length} questions · Pass mark: ${ex2.passPct}% · ${Math.round(ex2.duration/60)} min</div>
    <div class="exam-timer-bar">
      <div class="timer-chip" id="timer-chip">⏱ <span id="timer-val">${fmtTime(timeLeft)}</span></div>
      <span class="exam-progress-pill" id="exam-prog">0 / ${ex2.questions.length} answered</span>
    </div>
    <div class="q-nav-dots">${qdots}</div>
    ${questions}
    <div class="exam-footer">
      <span style="font-size:12px;color:var(--muted)">Answer all questions before submitting</span>
      <button class="btn-primary" onclick="submitExam()">Submit exam →</button>
    </div>`;

  setActiveChild(examId);
  goScreen('exam');
}

function fmtTime(s) {
  return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
}

function selectOpt(qi, oi) {
  if (examRevealed[qi]) return;
  const ex = CURRICULUM.exams[activeExamId];
  ex.questions[qi].opts.forEach((_, j) =>
    document.getElementById(`opt-${qi}-${j}`)?.classList.remove('selected'));
  examAnswers[qi] = oi;
  document.getElementById(`opt-${qi}-${oi}`)?.classList.add('selected');
  document.getElementById(`qcard-${qi}`)?.classList.add('answered');
  document.getElementById(`qdot-${qi}`)?.classList.add('answered');
  const prog = document.getElementById('exam-prog');
  if (prog) prog.textContent = `${Object.keys(examAnswers).length} / ${ex.questions.length} answered`;
}

function scrollToQ(i) {
  document.getElementById(`qcard-${i}`)?.scrollIntoView({ behavior:'smooth', block:'center' });
}

function confirmExitExam() {
  if (confirm('Exit the exam? Progress will be lost.')) {
    clearInterval(timerInterval);
    goScreen('dashboard');
  }
}

function submitExam() {
  clearInterval(timerInterval);
  const ex = CURRICULUM.exams[activeExamId];
  let score = 0;

  ex.questions.forEach((q, i) => {
    const chosen  = examAnswers[i];
    const correct = q.ans;
    examRevealed[i] = true;

    if (chosen !== undefined) {
      if (chosen === correct) {
        score++;
        document.getElementById(`opt-${i}-${chosen}`)?.classList.replace('selected', 'correct');
        q.tags?.forEach(t => MSState.recordAnswer(STATE, t, true));
      } else {
        document.getElementById(`opt-${i}-${chosen}`)?.classList.replace('selected', 'wrong');
        document.getElementById(`opt-${i}-${correct}`)?.classList.add('revealed-correct');
        q.tags?.forEach(t => MSState.recordAnswer(STATE, t, false));
      }
    } else {
      document.getElementById(`opt-${i}-${correct}`)?.classList.add('revealed-correct');
      q.tags?.forEach(t => MSState.recordAnswer(STATE, t, false));
    }
    document.getElementById(`exp-${i}`)?.classList.add('show');
  });

  const total   = ex.questions.length;
  const pct     = Math.round((score / total) * 100);
  const passed  = pct >= ex.passPct;
  const wasRetake = (STATE.exams[activeExamId]?.attempts?.length || 0) > 0;

  if (!STATE.exams[activeExamId]) STATE.exams[activeExamId] = { attempts:[], bestPct:0, passed:false };
  STATE.exams[activeExamId].attempts.push({ score, total, pct, passed, date: new Date().toISOString(), answers:{...examAnswers} });
  STATE.exams[activeExamId].bestPct  = Math.max(STATE.exams[activeExamId].bestPct || 0, pct);
  if (passed) STATE.exams[activeExamId].passed = true;

  if (passed) {
    const xpGain = Math.round(300 * pct / 100);
    MSState.addXP(STATE, xpGain, 'Exam: ' + ex.title);
    showXPPop(xpGain);
    showToast('xp', '🎓', `Exam passed! +${xpGain} XP`, `Score: ${pct}%`);
  }

  MSState.checkBadges(STATE, { examScore:pct, wasRetake, passed }).forEach(bid => {
    const def = MSState.BADGE_DEFS.find(b => b.id === bid);
    if (def) showToast('badge', def.icon, def.name, def.desc);
  });

  MSState.saveState(STATE);
  refreshSidebarMarks();
  renderSidebarFooter();

  setTimeout(() => showResults(score, total, pct, passed, ex), 700);
}

function showResults(score, total, pct, passed, ex) {
  const unanswered = total - Object.keys(examAnswers).length;
  const allAttempts = STATE.exams[activeExamId]?.attempts || [];

  const reviewHTML = ex.questions.map((q, i) => {
    const chosen  = examAnswers[i];
    const correct = q.ans;
    const ok      = chosen === correct;
    return `<div class="q-review-item">
      <span class="q-review-icon" style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓':'✗'}</span>
      <div>
        <div class="q-review-main">Q${i+1}: ${q.q.length > 90 ? q.q.slice(0,90)+'…' : q.q}</div>
        <div class="q-review-detail">
          Your answer: ${chosen!==undefined ? q.opts[chosen] : 'Not answered'} ·
          Correct: <span style="color:var(--green)">${q.opts[correct]}</span>
        </div>
        <div style="font-size:11px;color:#b4f0da;margin-top:3px;line-height:1.5">${q.exp}</div>
      </div>
    </div>`;
  }).join('');

  document.getElementById('results-content').innerHTML = `
    <div class="results-hero">
      <div class="score-ring${passed?'':' fail'}">
        <div class="score-num">${pct}%</div>
        <div class="score-sub">score</div>
      </div>
      <div class="result-title">${passed ? '🎉 Congratulations!' : 'Keep going!'}</div>
      <div class="result-sub">${passed ? 'You passed! Certificate unlocked.' : `Need ${ex.passPct}% to pass. You scored ${pct}%.`}</div>
      <span class="result-chip ${passed?'chip-pass':'chip-fail'}">${passed?'✓ Passed':'✗ Not passed — retake available'}</span>
    </div>
    <div class="breakdown-card">
      <div class="breakdown-row"><span style="color:var(--muted)">Correct</span><span class="breakdown-val" style="color:var(--green)">${score} / ${total}</span></div>
      <div class="breakdown-row"><span style="color:var(--muted)">Incorrect</span><span class="breakdown-val" style="color:var(--red)">${Object.keys(examAnswers).length - score}</span></div>
      <div class="breakdown-row"><span style="color:var(--muted)">Unanswered</span><span class="breakdown-val" style="color:var(--muted)">${unanswered}</span></div>
      <div class="breakdown-row"><span style="color:var(--muted)">Score</span><span class="breakdown-val">${pct}%</span></div>
      <div class="breakdown-row"><span style="color:var(--muted)">Best score</span><span class="breakdown-val" style="color:var(--s2)">${STATE.exams[activeExamId].bestPct}%</span></div>
      <div class="breakdown-row"><span style="color:var(--muted)">Attempts</span><span class="breakdown-val">${allAttempts.length}</span></div>
    </div>
    <div class="section-label" style="margin-bottom:10px">Full question review & explanations</div>
    <div class="q-review-list">${reviewHTML}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px">
      <button class="btn-ghost" onclick="showExam('${activeExamId}')">Retake exam</button>
      <button class="btn-primary" onclick="goScreen('dashboard')">Back to dashboard</button>
      <button class="btn-ghost" onclick="showStageOverview('${ex.stage}')">Review stage</button>
    </div>`;

  goScreen('results');
}

// ─── ANALYTICS ───────────────────────────────────────────
function renderAnalytics() {
  const lp           = MSState.getLevelProgress(STATE.xp);
  const weak         = MSState.getWeakTopics(STATE, 10);
  const totalLessons = Object.keys(CURRICULUM.lessons).length;
  const doneLessons  = Object.values(STATE.lessons).filter(l => l.completed).length;
  const examPasses   = Object.values(STATE.exams).filter(e => e.passed).length;
  const examAttempts = Object.values(STATE.exams).reduce((a, e) => a + (e.attempts?.length||0), 0);

  const weakHTML = weak.length === 0
    ? '<p style="color:var(--muted);font-size:13px">No exam data yet.</p>'
    : weak.map(w => `
        <div class="weak-topic-row">
          <span style="min-width:160px;color:var(--text)">${w.tag.replace(/-/g,' ')}</span>
          <div class="weak-bar-track"><div class="weak-bar-fill" style="width:${Math.round(w.wrongRate*100)}%"></div></div>
          <span class="weak-pct">${Math.round(w.wrongRate*100)}% wrong (${w.wrong}/${w.total})</span>
        </div>`).join('');

  let examHistHTML = '';
  Object.entries(STATE.exams).forEach(([eid, edata]) => {
    const ex = CURRICULUM.exams[eid];
    if (!ex || !edata.attempts?.length) return;
    examHistHTML += `
      <div style="margin-bottom:20px">
        <div style="font-size:13px;font-weight:500;margin-bottom:8px">${ex.title}</div>
        <div style="display:flex;gap:6px;align-items:flex-end;height:60px">
          ${edata.attempts.map(a => {
            const h   = Math.max(4, Math.round(a.pct * 0.56));
            const col = a.passed ? 'var(--green)' : a.pct >= 60 ? 'var(--warn)' : 'var(--red)';
            const dt  = new Date(a.date).toLocaleDateString('en',{month:'short',day:'numeric'});
            return `<div title="${a.pct}% on ${dt}" style="width:28px;height:${h}px;background:${col};border-radius:3px 3px 0 0"></div>`;
          }).join('')}
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:5px">Best: ${edata.bestPct}% · ${edata.attempts.length} attempt(s) · ${edata.passed?'✓ Passed':'Not passed'}</div>
      </div>`;
  });

  document.getElementById('analytics-content').innerHTML = `
    <div class="stats-grid" style="margin-bottom:24px">
      <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s2)">${doneLessons}/${totalLessons}</div><div class="stat-chip-label">Lessons complete</div></div>
      <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s1)">${examPasses}</div><div class="stat-chip-label">Exams passed</div></div>
      <div class="stat-chip"><div class="stat-chip-num" style="color:var(--warn)">${examAttempts}</div><div class="stat-chip-label">Exam attempts</div></div>
      <div class="stat-chip"><div class="stat-chip-num" style="color:var(--s3)">${STATE.profile.streak}</div><div class="stat-chip-label">Day streak</div></div>
    </div>
    <div class="section-label">XP & level progress</div>
    <div class="card card-pad" style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div><div style="font-size:18px;font-weight:700;font-family:'Syne',sans-serif">${lp.title}</div><div style="font-size:12px;color:var(--muted)">Level ${lp.lvl}</div></div>
        <div style="font-family:'DM Mono',monospace;font-size:22px;color:var(--s2)">${STATE.xp.toLocaleString()} XP</div>
      </div>
      <div class="xp-bar-row"><span>Level ${lp.lvl}</span><span>${lp.xpInLevel} / ${lp.xpNeeded} XP</span></div>
      <div class="xp-bar-track" style="height:6px"><div class="xp-bar-fill" style="width:${lp.pct}%"></div></div>
    </div>
    <div class="section-label">Weak topics (from exam answers)</div>
    <div class="card card-pad" style="margin-bottom:20px">${weakHTML}</div>
    <div class="section-label">Exam history</div>
    <div class="card card-pad">${examHistHTML || '<p style="font-size:12.5px;color:var(--muted)">No exam attempts yet.</p>'}</div>`;
}

// ─── BADGES ──────────────────────────────────────────────
function renderBadges() {
  document.getElementById('badges-content').innerHTML =
    `<div class="badge-grid">` +
    MSState.BADGE_DEFS.map(b => `
      <div class="badge-card${STATE.badges.includes(b.id)?' earned':''}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
        ${b.xp > 0 ? `<div class="badge-xp">+${b.xp} XP</div>` : ''}
      </div>`).join('') +
    `</div>`;
}

// ─── CERTIFICATES ────────────────────────────────────────
function renderCerts() {
  const defs = [
    { stage:'S1', name:'Foundations of Mathematics',    desc:'Stage 1 · 8 weeks', icon:'🥉' },
    { stage:'S2', name:'Pre-Calculus & Trigonometry',   desc:'Stage 2 · 10 weeks', icon:'🥈' },
    { stage:'S3', name:'Calculus for Science',          desc:'Stage 3 · 12 weeks', icon:'🥇' },
    { stage:'S4', name:'Linear Algebra & Statistics',   desc:'Stage 4 · 12 weeks', icon:'🏆' },
    { stage:'S5', name:'Advanced Mathematics Mastery',  desc:'Stage 5 · 16 weeks', icon:'🎓' },
    { stage:'ALL',name:'Mathematics Scientist — Full Mastery', desc:'All 5 stages complete', icon:'🌟' },
  ];
  const allPass = ['S1','S2','S3','S4','S5'].every(id => STATE.exams[id]?.passed);
  document.getElementById('certs-content').innerHTML = defs.map(d => {
    const earned = d.stage === 'ALL' ? allPass : !!STATE.exams[d.stage]?.passed;
    return `<div class="cert-card">
      <div class="cert-icon">${d.icon}</div>
      <div class="cert-info">
        <div class="cert-name">${d.name}</div>
        <div class="cert-meta">${d.desc} · Pass exam ≥ 75%</div>
      </div>
      <button class="cert-action${earned?' earned':''}" ${earned?`onclick="downloadCert('${d.name}')"`:'disabled'}>${earned?'Download':'Locked'}</button>
    </div>`;
  }).join('');
}

function downloadCert(name) {
  const c = document.createElement('canvas');
  c.width = 1000; c.height = 700;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0b0e14'; ctx.fillRect(0,0,1000,700);
  ctx.strokeStyle = '#6ee7b7'; ctx.lineWidth = 4; ctx.strokeRect(20,20,960,660);
  ctx.strokeStyle = '#818cf8'; ctx.lineWidth = 1; ctx.strokeRect(30,30,940,640);
  ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 42px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('MathSci Academy', 500, 100);
  ctx.fillStyle = '#7a7f8e'; ctx.font = '18px sans-serif';
  ctx.fillText('Certificate of Achievement', 500, 138);
  ctx.fillStyle = '#e8eaf0'; ctx.font = '20px sans-serif';
  ctx.fillText('This certifies that', 500, 220);
  ctx.fillStyle = '#818cf8'; ctx.font = 'bold 34px sans-serif';
  ctx.fillText(STATE.profile.name, 500, 275);
  ctx.fillStyle = '#e8eaf0'; ctx.font = '20px sans-serif';
  ctx.fillText('has successfully completed', 500, 328);
  ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 26px sans-serif';
  ctx.fillText(name, 500, 385);
  ctx.fillStyle = '#7a7f8e'; ctx.font = '15px sans-serif';
  ctx.fillText(`Issued: ${new Date().toLocaleDateString('en',{year:'numeric',month:'long',day:'numeric'})}`, 500, 450);
  ctx.fillText(`Total XP at issue: ${STATE.xp.toLocaleString()}`, 500, 475);
  ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 16px sans-serif';
  ctx.fillText('mathsci.academy', 500, 650);
  const a = document.createElement('a');
  a.download = `cert-${name.replace(/\s+/g,'-').toLowerCase()}.png`;
  a.href = c.toDataURL('image/png'); a.click();
}

// ─── SETTINGS ────────────────────────────────────────────
function renderSettings() {
  document.getElementById('settings-name').value = STATE.profile.name;
  document.getElementById('toggle-sound').checked = STATE.settings.soundEnabled;
  const avRow = document.getElementById('settings-avatars');
  if (avRow) avRow.innerHTML = AVATARS.map((a,i) =>
    `<div class="avatar-chip${STATE.profile.avatar===i?' selected':''}" onclick="setAvatar(this,${i})">${a}</div>`).join('');
}

function setAvatar(el, idx) {
  document.querySelectorAll('#settings-avatars .avatar-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  STATE.profile.avatar = idx;
  MSState.saveState(STATE);
}

function saveSettings() {
  const n = document.getElementById('settings-name')?.value?.trim();
  if (n) STATE.profile.name = n;
  STATE.settings.soundEnabled = document.getElementById('toggle-sound')?.checked;
  MSState.saveState(STATE);
  showToast('xp','💾','Settings saved','');
}

function confirmReset() {
  if (confirm('Reset ALL progress? This cannot be undone.')) {
    if (confirm('Last chance — all XP, lessons, and exams will be deleted permanently.')) {
      STATE = MSState.resetState();
      location.reload();
    }
  }
}

// ─── GAMIFICATION ────────────────────────────────────────
function showToast(type, icon, title, sub) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icon}</span><div class="toast-body"><div class="toast-title">${title}</div>${sub?`<div class="toast-sub">${sub}</div>`:''}</div>`;
  container.appendChild(el);
  setTimeout(() => { el.classList.add('hide'); setTimeout(() => el.remove(), 350); }, 3500);
}

function showXPPop(amount) {
  const el = document.createElement('div');
  el.className = 'xp-pop';
  el.textContent = '+' + amount + ' XP';
  el.style.left = (20 + Math.random() * 60) + '%';
  el.style.top  = '40%';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}

// ─── MODULE DATA ─────────────────────────────────────────
const STAGE_MODULES = {
  S1:[
    { id:'W1L1', title:'Numbers & the Number Line', meta:'Integers, fractions, absolute value', icon:'🔢' },
    { id:'W1L2', title:'Order of Operations',       meta:'PEMDAS/BODMAS, nested brackets',     icon:'🔣' },
    { id:'W1L3', title:'Powers & Scientific Notation', meta:'Exponents, roots, sig figs',      icon:'⚡' },
    { id:'W1L4', title:'Ratios, Proportions & Percentages', meta:'Direct/inverse proportion',  icon:'⚖️' },
    { id:'W1L5', title:'Linear Equations',          meta:'Solving equations & inequalities',   icon:'📐' },
    { id:'W1L6', title:'Rearranging Formulas',      meta:'Subject of formula, substitution',   icon:'🔄' },
    { id:'W1L7', title:'Graphing Lines',            meta:'Slope, y=mx+c, Cartesian plane',     icon:'📈' },
    { id:'S1',   title:'Stage 1 Exam',              meta:'20 questions · 45 min · Pass ≥ 75%', icon:'📝', isExam:true },
  ],
  S2:[
    { id:'W2L1', title:'Functions & Notation',     meta:'Domain, range, composition', icon:'𝑓' },
    { id:'W2L2', title:'Quadratic Functions',      meta:'Parabolas, factoring, formula', icon:'∩' },
    { id:'W2L3', title:'Exponential Functions',    meta:'Base e, growth & decay, half-life', icon:'📊' },
    { id:'W2L4', title:'Logarithms',               meta:'Log laws, natural log, pH', icon:'㏒' },
    { id:'W2L5', title:'Right-Triangle Trig',      meta:'SOH-CAH-TOA, inverse trig', icon:'△' },
    { id:'W2L6', title:'Unit Circle & Radians',    meta:'Exact values, reference angles, CAST', icon:'⭕' },
    { id:'W2L7', title:'Vectors in 2D',            meta:'Magnitude, direction, dot product', icon:'→' },
    { id:'S2',   title:'Stage 2 Exam',             meta:'20 questions · 45 min · Pass ≥ 75%', icon:'📝', isExam:true },
  ],
  S3:[
    { id:'W3L1', title:'Limits & Continuity',        meta:'Limit laws, indeterminate forms', icon:'→' },
    { id:'W3L2', title:'The Derivative',             meta:'Power rule, tangent, velocity', icon:'d/dx' },
    { id:'W3L3', title:'Differentiation Rules',      meta:'Product, quotient, chain rules', icon:'∂' },
    { id:'W3L4', title:'Optimisation',               meta:'Critical points, second derivative test', icon:'📉' },
    { id:'W3L5', title:'Introduction to Integration',meta:'Antiderivatives, Riemann sums, area', icon:'∫' },
    { id:'W3L6', title:'Fundamental Theorem',        meta:'FTC Part 1 & 2, net change', icon:'⚡' },
    { id:'W3L7', title:'Differential Equations',     meta:'Separable ODEs, initial value problems', icon:'∂y' },
    { id:'S3',   title:'Stage 3 Exam',               meta:'20 questions · 45 min · Pass ≥ 75%', icon:'📝', isExam:true },
  ],
  S4:[
    { id:'W4L1', title:'Vectors in 3D',              meta:'Dot & cross products, torque', icon:'⬡' },
    { id:'W4L2', title:'Matrices',                   meta:'Structure, operations, multiplication', icon:'▦' },
    { id:'W4L3', title:'Systems of Equations',       meta:'Gaussian elimination, row operations', icon:'≡' },
    { id:'W4L4', title:'Eigenvalues & Eigenvectors', meta:'Characteristic polynomial, diagonalisation', icon:'λ' },
    { id:'W4L5', title:'Probability Foundations',    meta:"Bayes' theorem, conditional probability", icon:'P(A)' },
    { id:'W4L6', title:'Distributions & Statistics', meta:'Normal distribution, z-scores, hypothesis testing', icon:'σ' },
    { id:'W4L7', title:'Linear Regression',          meta:'Least-squares, R², residuals, correlation', icon:'~' },
    { id:'S4',   title:'Stage 4 Exam',               meta:'20 questions · 45 min · Pass ≥ 75%', icon:'📝', isExam:true },
  ],
  S5:[
    { id:'W5L1', title:'Multivariable Functions',    meta:'Partial derivatives, gradient, surfaces', icon:'∇' },
    { id:'W5L2', title:'Gradient, Div & Curl',       meta:'Vector calculus, del operator, Maxwell', icon:'∇·' },
    { id:'W5L3', title:'Double & Triple Integrals',  meta:'Fubini\'s theorem, polar, cylindrical', icon:'∬' },
    { id:'W5L4', title:'Fourier Series & Transforms',meta:'Harmonics, coefficients, FFT', icon:'∿' },
    { id:'W5L5', title:'PDEs',                       meta:'Heat equation, wave equation, separation of variables', icon:'∂²' },
    { id:'W5L6', title:'Complex Analysis',           meta:"Euler's formula, analytic functions, C-R", icon:'ℂ' },
    { id:'W5L7', title:'Laplace Transforms',         meta:'Transform table, solving ODEs, transfer functions', icon:'ℒ' },
    { id:'S5',   title:'Stage 5 Exam',               meta:'20 questions · 60 min · Pass ≥ 75%', icon:'📝', isExam:true },
  ]
};

function getStageModules(id) { return STAGE_MODULES[id] || []; }
function getAllModules() { return Object.values(STAGE_MODULES).flat(); }
