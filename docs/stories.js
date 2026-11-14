/* Start page: four findings that were checked (see ~/ds701-spark/notes/37). Local preview only.
   Numbers are copied from notes/37 (computed by data/scripts/storyline_check_1108/). */
// a grey, blurred card that holds a storyline's place; no old text or numbers are kept in it
function storyPlaceholder(kicker) {
  const el = document.createElement("article"); el.className = "story placeholder";
  el.setAttribute("aria-label", `${kicker}: storyline in progress`);
  el.innerHTML = `<div class="kicker">${kicker}</div>
    <div class="veil-wrap">
      <div class="veil" aria-hidden="true">
        <div class="sk tall w80"></div><div class="sk tall w55"></div>
        <div class="sk w95"></div><div class="sk w90"></div><div class="sk w70"></div>
        <svg viewBox="0 0 520 180"><g stroke="#c9ced6" stroke-width="1"><line x1="34" x2="392" y1="10" y2="10"/><line x1="34" x2="392" y1="84" y2="84"/><line x1="34" x2="392" y1="158" y2="158"/></g>
          <path d="M34,122 L80,112 L126,118 L172,96 L218,90 L264,70 L310,76 L356,52 L392,44" fill="none" stroke="#9aa3ae" stroke-width="3"/>
          <path d="M34,58 L80,66 L126,58 L172,74 L218,82 L264,96 L310,92 L356,110 L392,118" fill="none" stroke="#b8bec7" stroke-width="3"/></svg>
        <div class="sk w85"></div><div class="sk w60"></div>
      </div>
      <div class="veil-label"><b>Storyline in progress</b><span>Still being checked. It will appear here when it is ready.</span></div>
    </div>`;
  return el;
}
(function () {
  const YEARS = Array.from({length: 18}, (_, i) => 2008 + i);
  const C = {blue: "#4582cc", purple: "#8c3a91", gold: "#d4a92c", ink: "#333C47", muted: "#6c6b66", grid: "#e9ecf1"};

  const STORIES = [
    {placeholder: "Requests"},
    {
      kicker: "Outcomes", q: 4, qlabel: "Outcomes & exemptions", walk: true,
      title: "A shrinking share of requests is released in full",
      body: "Outside DHS and NARA, the share of processed requests released in full fell from 50.0% in FY2008 to 21.4% in FY2025. The fall holds with any single agency or component left out, and it comes mostly from agencies' own shares falling.",
      foot: "Share of all processed requests. Why DHS and NARA are left out, and what lies behind the fall, is in the 9 steps.",
      yMax: 60, unit: "%",
      series: [
        {name: "Released in full", color: C.blue, v: [50.0,45.5,47.0,47.1,47.3,47.3,42.0,39.7,39.3,38.0,40.1,37.1,36.8,32.9,30.2,29.7,24.3,21.4]},
        {name: "Partly released", color: C.purple, v: [10.2,13.5,16.0,18.9,18.2,17.9,21.2,22.7,23.0,23.3,23.0,24.4,22.8,23.8,23.1,27.9,31.7,32.3]},
        {name: "No records found", color: C.gold, v: [14.7,14.2,11.9,12.0,12.5,11.7,12.5,13.4,12.7,13.6,13.6,13.5,13.1,13.5,14.9,13.9,13.2,13.5]}]
    },
    {placeholder: "Appeals"},
    {placeholder: "Backlog"}
  ];

  const W = 520, H = 180, M = {l: 34, r: 128, t: 10, b: 22};
  const x = yr => M.l + (yr - 2008) / 17 * (W - M.l - M.r);
  const svgEl = (tag, attrs) => { const e = document.createElementNS("http://www.w3.org/2000/svg", tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  function chart(s) {
    const box = document.createElement("div"); box.className = "chart";
    const y = v => M.t + (1 - v / s.yMax) * (H - M.t - M.b);
    const svg = svgEl("svg", {viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": s.title});
    [0, s.yMax / 2, s.yMax].forEach(t => {
      svg.appendChild(svgEl("line", {x1: M.l, x2: W - M.r, y1: y(t), y2: y(t), stroke: C.grid, "stroke-width": 1}));
      const lab = svgEl("text", {x: M.l - 6, y: y(t) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}); lab.textContent = t + s.unit; svg.appendChild(lab);
    });
    [2008, 2012, 2016, 2020, 2025].forEach(yr => {
      const lab = svgEl("text", {x: x(yr), y: H - 6, "text-anchor": "middle", "font-size": 10, fill: C.muted}); lab.textContent = yr; svg.appendChild(lab);
    });
    (s.avgs || []).forEach(a => {
      const vals = s.series[0].v.slice(a.from - 2008, a.to - 2008 + 1); const m = vals.reduce((p, c) => p + c, 0) / vals.length;
      svg.appendChild(svgEl("line", {x1: x(a.from), x2: x(a.to), y1: y(m), y2: y(m), stroke: C.muted, "stroke-width": 1.5, "stroke-dasharray": "4 3"}));
    });
    s.series.forEach(se => {
      const d = se.v.map((v, i) => `${i ? "L" : "M"}${x(YEARS[i]).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      svg.appendChild(svgEl("path", {d, fill: "none", stroke: se.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round"}));
    });
    // end labels (text in ink, colored dot carries identity), nudged apart
    const ends = s.series.map(se => ({se, yy: y(se.v[17])})).sort((a, b) => a.yy - b.yy);
    for (let i = 1; i < ends.length; i++) if (ends[i].yy - ends[i - 1].yy < 13) ends[i].yy = ends[i - 1].yy + 13;
    ends.forEach(({se, yy}) => {
      svg.appendChild(svgEl("circle", {cx: x(2025), cy: y(se.v[17]), r: 3, fill: se.color}));
      const t = svgEl("text", {x: x(2025) + 8, y: yy + 3.5, "font-size": 10.5, fill: C.ink});
      t.textContent = `${se.v[17]}${s.unit} ${s.series.length > 1 ? short(se.name) : ""}`; svg.appendChild(t);
    });
    // hover: crosshair + tooltip
    const cross = svgEl("line", {y1: M.t, y2: H - M.b, stroke: "#9aa3ae", "stroke-width": 1, visibility: "hidden"}); svg.appendChild(cross);
    const hit = svgEl("rect", {x: M.l, y: 0, width: W - M.l - M.r, height: H, fill: "transparent"}); svg.appendChild(hit);
    const tip = document.createElement("div"); tip.className = "tip";
    hit.addEventListener("mousemove", ev => {
      const r = svg.getBoundingClientRect(); const px = (ev.clientX - r.left) / r.width * W;
      const i = Math.max(0, Math.min(17, Math.round((px - M.l) / (W - M.l - M.r) * 17)));
      cross.setAttribute("x1", x(YEARS[i])); cross.setAttribute("x2", x(YEARS[i])); cross.setAttribute("visibility", "visible");
      tip.innerHTML = `<b>FY${YEARS[i]}</b><br>` + s.series.map(se => `<i style="background:${se.color}"></i>${se.name}: ${se.v[i]}${s.unit}`).join("<br>")
        + (s.extra ? `<br>${s.extra.name}: ${s.extra.fmt(s.extra.v[i])}` : "");
      tip.style.display = "block";
      const left = x(YEARS[i]) / W * r.width; tip.style.left = (left > r.width * 0.55 ? left - tip.offsetWidth - 10 : left + 10) + "px"; tip.style.top = "6px";
    });
    hit.addEventListener("mouseleave", () => { cross.setAttribute("visibility", "hidden"); tip.style.display = "none"; });
    box.appendChild(svg); box.appendChild(tip);
    return box;
  }
  const short = n => ({"Released in full": "in full", "Partly released": "partly", "No records found": "no records",
    "Privacy share of exemption citations": "privacy", "Full denials (of partly released + fully denied)": "full denials",
    "Agencies other than DHS": "not DHS", "DHS": "DHS"})[n] || n;

  function card(s) {
    const el = document.createElement("article"); el.className = "story";
    el.innerHTML = `<div class="kicker">${s.kicker}</div><h3>${s.title}</h3><p class="body">${s.body}</p>`;
    if (s.series.length > 1) el.insertAdjacentHTML("beforeend", `<div class="legend">${s.series.map(se => `<span><i style="background:${se.color}"></i>${se.name}</span>`).join("")}</div>`);
    el.appendChild(chart(s));
    const rows = YEARS.map((yr, i) => `<tr><td>FY${yr}</td>${s.series.map(se => `<td>${se.v[i]}${s.unit}</td>`).join("")}${s.extra ? `<td>${s.extra.fmt(s.extra.v[i])}</td>` : ""}</tr>`).join("");
    el.insertAdjacentHTML("beforeend", `<p class="foot">${s.foot}</p><div class="actions">${s.walk ? `<button type="button" class="walk">How we got here · 9 steps →</button>` : ""}<button type="button" class="go" data-q="${s.q}">Explore: ${s.qlabel} →</button>
      <details><summary>Numbers</summary><table><tr><th>Year</th>${s.series.map(se => `<th>${se.name}</th>`).join("")}${s.extra ? `<th>${s.extra.name}</th>` : ""}</tr>${rows}</table></details></div>`);
    el.querySelector(".go").addEventListener("click", () => { const b = document.querySelector(`.qbtn[data-id="${s.q}"]`); if (b) b.click(); });
    const wb = el.querySelector(".walk"); if (wb) wb.addEventListener("click", () => window.openS1Walk && window.openS1Walk(wb));
    return el;
  }

  function fill(es) {
    es.dataset.stories = "1"; es.classList.add("stories"); es.innerHTML = "";
    es.insertAdjacentHTML("beforeend", `<div class="stories-head"><h2>What the annual reports show</h2>
      <p>Findings from the agencies' own FOIA reports, FY2008–FY2025. One is ready; the other three are still being checked and will appear here when they are. Pick a question on the left to explore the data yourself.</p></div>`);
    const grid = document.createElement("div"); grid.className = "story-grid"; STORIES.forEach(s => grid.appendChild(s.placeholder ? storyPlaceholder(s.placeholder) : card(s))); es.appendChild(grid);
    es.insertAdjacentHTML("beforeend", `<p class="stories-method">How these were counted: government totals add up each agency's reported total (its components plus anything not assigned to one) and match foia.gov's government-wide totals. The reports are filled in by the agencies themselves. They show what changed, not why.</p>`);
  }
  const scan = () => document.querySelectorAll(".empty-state:not([data-stories])").forEach(fill);
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", scan);
})();

/* ---------- Storyline 1 walkthrough: a dialog of step cards, swipe or arrow keys (sample, branch exploring-storyline-display, 2026-11-14) ----------
   Text and numbers: data/s1_walk.json, built by ~/ds701-spark/data/scripts/storyline_cards_1114/build_s1_walk.py from the S1 notebook code. */
(function () {
  const C = {blue: "#4582cc", purple: "#8c3a91", gold: "#d4a92c", green: "#0b5a36", ink: "#333C47", muted: "#6c6b66", grid: "#e9ecf1"};
  const COLORS = {"Released in full": C.blue, "Partly released": C.purple, "No records found": C.gold, "Fully denied on exemptions": C.green,
    "DHS share": C.purple, "Outside DHS": C.blue, "DHS": C.purple, "All agencies": "#8a8f98"};
  const DASHED = new Set(["All agencies"]);
  const SHORT = {"Released in full": "in full", "Partly released": "partly", "No records found": "no records", "Fully denied on exemptions": "denied",
    "Outside DHS": "outside DHS", "DHS": "DHS", "All agencies": "all agencies"};
  const STEPS = 9, NS = "http://www.w3.org/2000/svg";
  let DATA = null, modal = null, idx = 0, opener = null;
  const el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e };
  const txt = (svg, a, s) => { const e = el("text", Object.assign({"font-size": 10.5, fill: C.ink}, a)); e.textContent = s; svg.appendChild(e); return e };
  const nice = m => [10, 20, 25, 40, 50, 60, 70, 80, 100].find(t => t >= m) || Math.ceil(m / 10) * 10;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"})[c]);

  function lines(ch, years, W, ratio = 0.38) {
    const H = Math.round(W * ratio), M = {l: 36, r: Math.round(W * 0.2), t: 10, b: 24}, names = Object.keys(ch.series), n = years.length - 1;
    const top = nice(Math.max(...names.flatMap(k => ch.series[k])));
    const x = i => M.l + i / n * (W - M.l - M.r), y = v => M.t + (1 - v / top) * (H - M.t - M.b);
    const svg = el("svg", {viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ch.title});
    [top / 2, top].forEach(t => { svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(t), y2: y(t), stroke: C.grid})); txt(svg, {x: M.l - 6, y: y(t) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}, t + "%") });
    (ch.ref || []).forEach(rf => { svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(rf.v), y2: y(rf.v), stroke: "#6c6b66", "stroke-dasharray": "5 4"})); txt(svg, {x: M.l + 4, y: y(rf.v) - 5, "font-size": 10, fill: C.muted}, `${rf.v}%: ${rf.label}`) });
    svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(0), y2: y(0), stroke: "#8a8f98"})); txt(svg, {x: M.l - 6, y: y(0) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}, "0%");
    [2008, 2012, 2016, 2020, 2025].forEach(yr => txt(svg, {x: x(years.indexOf(yr)), y: H - 6, "text-anchor": "middle", "font-size": 10, fill: C.muted}, yr));
    names.forEach(k => svg.appendChild(el("path", {d: ch.series[k].map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" "), fill: "none", stroke: COLORS[k] || C.ink, "stroke-width": DASHED.has(k) ? 1.6 : 2.2, "stroke-dasharray": DASHED.has(k) ? "5 4" : "none", "stroke-linejoin": "round", "stroke-linecap": "round"})));
    const ends = names.map(k => ({k, v: ch.series[k][n], yy: y(ch.series[k][n])})).sort((a, b) => a.yy - b.yy);
    for (let i = 1; i < ends.length; i++) if (ends[i].yy - ends[i - 1].yy < 13) ends[i].yy = ends[i - 1].yy + 13;
    ends.forEach(e => { svg.appendChild(el("circle", {cx: x(n), cy: y(e.v), r: 3, fill: COLORS[e.k] || C.ink})); txt(svg, {x: x(n) + 8, y: e.yy + 3.5}, `${e.v}%${names.length > 1 ? " " + (SHORT[e.k] || e.k) : ""}`) });
    const cross = el("line", {y1: M.t, y2: H - M.b, stroke: "#9aa3ae", visibility: "hidden"}); svg.appendChild(cross);
    const hit = el("rect", {x: M.l, y: 0, width: W - M.l - M.r, height: H, fill: "transparent"}); svg.appendChild(hit);
    const box = document.createElement("div"); box.className = "s1m-chart"; const tip = document.createElement("div"); tip.className = "tip";
    hit.addEventListener("pointermove", ev => { const r = svg.getBoundingClientRect(), i = Math.max(0, Math.min(n, Math.round(((ev.clientX - r.left) / r.width * W - M.l) / (W - M.l - M.r) * n)));
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i)); cross.setAttribute("visibility", "visible");
      tip.innerHTML = `<b>FY${years[i]}</b><br>` + names.map(k => `<i style="background:${COLORS[k] || C.ink}"></i>${esc(k)}: ${ch.series[k][i]}%`).join("<br>");
      tip.style.display = "block"; const left = x(i) / W * r.width; tip.style.left = (left > r.width * 0.5 ? left - tip.offsetWidth - 10 : left + 10) + "px"; tip.style.top = "4px" });
    hit.addEventListener("pointerleave", () => { cross.setAttribute("visibility", "hidden"); tip.style.display = "none" });
    box.appendChild(svg); box.appendChild(tip); return box;
  }
  function bars(ch, W) {
    const rowH = 44, M = {l: 250, r: 64, t: 6, b: 26}, H = M.t + rowH * ch.bars.length + M.b;
    const top = nice(Math.max(...ch.bars.map(b => b.hi))), x = v => M.l + v / top * (W - M.l - M.r);
    const svg = el("svg", {viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ch.title});
    [0, top / 2, top].forEach(t => { svg.appendChild(el("line", {x1: x(t), x2: x(t), y1: M.t, y2: H - M.b, stroke: t ? C.grid : "#8a8f98"})); txt(svg, {x: x(t), y: H - 8, "text-anchor": "middle", "font-size": 10, fill: C.muted}, `${t} pts`) });
    ch.bars.forEach((b, i) => { const y0 = M.t + i * rowH + 12, c = i ? C.purple : C.blue;
      txt(svg, {x: M.l - 10, y: y0 + 13, "text-anchor": "end", "font-size": 11.5}, b.name);
      svg.appendChild(el("rect", {x: M.l, y: y0, width: x(b.v) - M.l, height: 18, rx: 2, fill: c, opacity: 0.85}));
      svg.appendChild(el("line", {x1: x(b.lo), x2: x(b.hi), y1: y0 + 9, y2: y0 + 9, stroke: C.ink, "stroke-width": 1.2}));
      [b.lo, b.hi].forEach(v => svg.appendChild(el("line", {x1: x(v), x2: x(v), y1: y0 + 4, y2: y0 + 14, stroke: C.ink, "stroke-width": 1.2})));
      txt(svg, {x: x(b.hi) + 6, y: y0 + 13, "font-weight": 600}, `${b.v}`); });
    const box = document.createElement("div"); box.className = "s1m-chart"; box.appendChild(svg);
    box.insertAdjacentHTML("beforeend", `<table class="s1m-range"><tr><th></th><th>Average</th><th>Range</th></tr>${ch.bars.map(b => `<tr><td>${esc(b.name)}</td><td>${b.v} pts</td><td>${b.lo}–${b.hi}</td></tr>`).join("")}</table>`);
    return box;
  }
  function slide(s, i) {
    const d = document.createElement("section"); d.className = "s1m-slide"; d.setAttribute("aria-label", `Step ${i + 1} of ${STEPS}`);
    const text = `<div class="s1m-text"><div class="s1m-kicker">Step ${i + 1} of ${STEPS} · ${esc(s.kicker)}</div><h3>${esc(s.title)}</h3>
      ${s.sections.map(x => `<h4>${esc(x.h)}</h4>${x.p.map(p => `<p>${esc(p)}</p>`).join("")}`).join("")}
      ${s.method ? `<div class="s1m-method"><b>How it was counted.</b> ${esc(s.method)}</div>` : ""}</div>`;
    d.innerHTML = `<div class="s1m-cols">${text}<div class="s1m-figs"></div></div>`;
    const figs = d.querySelector(".s1m-figs");
    s.charts.forEach(ch => { const fg = document.createElement("figure"); fg.innerHTML = `<figcaption>${esc(ch.title)}</figcaption>`;
      const names = ch.series ? Object.keys(ch.series) : [];
      if (names.length > 1) fg.insertAdjacentHTML("beforeend", `<div class="s1m-legend">${names.map(k => `<span><i style="${DASHED.has(k) ? `border-top:2px dashed ${COLORS[k]};height:0;background:none` : `background:${COLORS[k] || C.ink}`}"></i>${esc(k)}</span>`).join("")}</div>`);
      fg.appendChild(ch.kind === "bars" ? bars(ch, 640) : lines(ch, DATA.years, 640, s.charts.length > 1 ? 0.26 : 0.52)); figs.appendChild(fg) });
    if (s.example) { const e = s.example, cell = c => c.startsWith("*") ? `<b>${esc(c.slice(1))}</b>` : esc(c);
      figs.insertAdjacentHTML("beforeend", `<figure class="s1m-ex"><figcaption>How the split works</figcaption><p>${esc(e.caption)}</p>
        <table><tr>${e.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr>${e.rows.map(r => `<tr>${r.map((c, j) => j ? `<td>${cell(c)}</td>` : `<th>${esc(c)}</th>`).join("")}</tr>`).join("")}</table>
        <p class="s1m-small">Bold: the one thing that changes from the row above.</p></figure>`) }
    return d;
  }
  function todo(title, i) {
    const d = document.createElement("section"); d.className = "s1m-slide";
    d.innerHTML = `<div class="s1m-kicker">Step ${i + 1} of ${STEPS}</div><h3>${esc(title)}</h3><div class="s1m-todo">Not in this sample yet. In the full version this step has its own chart and finding.</div>`;
    return d;
  }
  function build() {
    modal = document.createElement("div"); modal.className = "s1m"; modal.hidden = true;
    modal.innerHTML = `<div class="s1m-backdrop"></div>
      <div class="s1m-panel" role="dialog" aria-modal="true" aria-labelledby="s1m-name">
        <header class="s1m-head"><div><div class="s1m-eyebrow">Storyline · Outcomes</div><div class="s1m-name" id="s1m-name">How we got to “A shrinking share of requests is released in full”</div></div>
          <button type="button" class="s1m-x" aria-label="Close">×</button></header>
        <div class="s1m-dots"></div>
        <div class="s1m-view"><div class="s1m-track"></div><div class="s1m-more" aria-hidden="true">More below ↓</div></div>
        <footer class="s1m-foot"><button type="button" class="s1m-prev">← Back</button><span class="s1m-count" aria-live="polite"></span><button type="button" class="s1m-next">Next →</button></footer>
      </div>`;
    document.body.appendChild(modal);
    const track = modal.querySelector(".s1m-track"), dots = modal.querySelector(".s1m-dots"), done = DATA.steps.length;
    for (let i = 0; i < STEPS; i++) {
      const title = i < done ? DATA.steps[i].title : DATA.upcoming[i - done];
      track.appendChild(i < done ? slide(DATA.steps[i], i) : todo(title, i));
      const b = document.createElement("button"); b.type = "button"; b.className = "s1m-dot" + (i < done ? "" : " todo");
      b.title = b.ariaLabel = `Step ${i + 1}: ${title}`; b.addEventListener("click", () => go(i)); dots.appendChild(b);
    }
    modal.querySelector(".s1m-x").addEventListener("click", close);
    modal.querySelector(".s1m-backdrop").addEventListener("click", close);
    modal.querySelector(".s1m-prev").addEventListener("click", () => go(idx - 1));
    modal.querySelector(".s1m-next").addEventListener("click", () => go(idx + 1));
    modal.querySelectorAll(".s1m-slide").forEach(s => s.addEventListener("scroll", more, {passive: true}));
    window.addEventListener("resize", () => { if (!modal.hidden) more() });
    const view = modal.querySelector(".s1m-view"); let sx = null, sy = 0;   // swipe: a mostly horizontal drag of 50px or more
    view.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY });
    view.addEventListener("pointerup", e => { if (sx == null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1)) });
    view.addEventListener("pointercancel", () => { sx = null });
    document.addEventListener("keydown", e => {   // on the document: a click inside the dialog can move focus to the page
      if (!modal || modal.hidden) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowRight") go(idx + 1); else if (e.key === "ArrowLeft") go(idx - 1);
      else if (e.key === "Tab") { const f = [...modal.querySelectorAll("button:not([disabled])")].filter(b => !b.closest("[inert]")); const a = f.indexOf(document.activeElement);
        if (a === -1) { e.preventDefault(); f[0].focus() } else if (e.shiftKey && a === 0) { e.preventDefault(); f[f.length - 1].focus() } else if (!e.shiftKey && a === f.length - 1) { e.preventDefault(); f[0].focus() } } });
  }
  function more() {   // "More below" while the current step has more to read
    const s = modal.querySelectorAll(".s1m-slide")[idx];
    modal.querySelector(".s1m-view").classList.toggle("more", s.scrollTop + s.clientHeight < s.scrollHeight - 8);
  }
  function go(i) {
    idx = Math.max(0, Math.min(STEPS - 1, i));
    modal.querySelector(".s1m-track").style.transform = `translateX(${-idx * 100}%)`;
    modal.querySelectorAll(".s1m-dot").forEach((d, j) => j === idx ? d.setAttribute("aria-current", "step") : d.removeAttribute("aria-current"));
    modal.querySelectorAll(".s1m-slide").forEach((s, j) => { s.inert = j !== idx; if (j === idx) s.scrollTop = 0 });
    requestAnimationFrame(more);
    modal.querySelector(".s1m-count").textContent = `Step ${idx + 1} of ${STEPS}`;
    modal.querySelector(".s1m-prev").disabled = idx === 0; modal.querySelector(".s1m-next").disabled = idx === STEPS - 1;
  }
  async function open(from) {
    opener = from;
    try { if (!DATA) DATA = await fetch("data/s1_walk.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json() }) }
    catch (err) { console.error("S1 walkthrough: could not load data/s1_walk.json", err); return }
    if (!modal) build();
    modal.hidden = false; document.documentElement.classList.add("s1m-open"); go(0); modal.querySelector(".s1m-x").focus();
  }
  function close() { modal.hidden = true; document.documentElement.classList.remove("s1m-open"); if (opener && opener.isConnected) opener.focus() }
  window.openS1Walk = open;
})();
