/* Start page: four findings that were checked (see ~/ds701-spark/notes/37). Local preview only.
   Numbers are copied from notes/37 (computed by data/scripts/storyline_check_1108/). */
(function () {
  const YEARS = Array.from({length: 18}, (_, i) => 2008 + i);
  const C = {blue: "#4582cc", purple: "#8c3a91", gold: "#d4a92c", ink: "#333C47", muted: "#6c6b66", grid: "#e9ecf1"};

  const STORIES = [
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
    {
      kicker: "Exemptions", q: 4, qlabel: "Outcomes & exemptions",
      title: "Privacy exemptions are cited more, but rarely to withhold everything",
      body: "Privacy exemptions (Ex. 6 and 7(C)) went from 44% of all exemption citations in FY2008 to 61% in FY2025. Yet among requests that were partly released or fully denied on exemptions, full denials fell from 18% to 8%. Most still got some records.",
      foot: "Exemption counts are citations, not requests: one request can cite several exemptions. All agencies.",
      yMax: 70, unit: "%",
      series: [
        {name: "Privacy share of exemption citations", color: C.blue, v: [43.9,44.2,46.1,51.3,52.4,51.6,53.1,57.4,57.8,53.2,56.1,55.1,56.8,55.7,56.4,59.5,63.2,61.1]},
        {name: "Full denials (of partly released + fully denied)", color: C.purple, v: [17.7,13.2,16.6,15.0,13.3,16.9,15.4,10.9,13.3,11.3,10.0,8.8,10.5,10.9,10.1,8.6,8.1,7.7]}]
    },
    {
      kicker: "Appeals", q: 5, qlabel: "Appeals",
      title: "Few requests are appealed; outside DHS, about a quarter of appeals succeed",
      body: "Each year only 1.3 to 2.0 appeals are filed for every 100 processed requests. Outside DHS, 21–27% of closed appeals end with the decision fully or partly reversed or sent back. At DHS the rate was 48–76% in FY2009–23, then 37–39% in FY2024–25.",
      foot: "“Reversed” includes sending the request back for another look; it does not mean the requester got the records. DHS also closed more appeals “for other reasons” in FY2024–25. Share of all closed appeals.",
      yMax: 80, unit: "%",
      series: [
        {name: "Agencies other than DHS", color: C.blue, v: [21.4,24.4,25.7,24.9,26.9,23.5,23.1,22.2,25.9,23.5,22.4,23.2,22.9,20.6,23.7,26.0,27.1,27.3]},
        {name: "DHS", color: C.purple, v: [26.6,65.5,75.7,55.8,48.2,53.9,54.0,50.9,50.2,53.4,57.6,54.6,62.6,54.2,54.2,48.4,39.0,36.7]}],
      extra: {name: "Appeals per 100 processed requests (all agencies)", v: [1.37,1.59,1.82,1.70,1.79,1.77,1.96,1.90,1.99,1.77,1.88,1.75,1.93,1.84,1.76,1.29,1.34,1.96], fmt: x => x.toFixed(2)}
    },
    {
      kicker: "Backlog", q: 6, qlabel: "Backlog vs intake",
      title: "Outside the immigration agencies, backlogs stepped up after FY2020",
      body: "Leaving out USCIS, CBP, ICE and EOIR, the year-end backlog equaled 9–19% of a year's requests in FY2008–19 and 22–30% in FY2020–25. On average FY2020–25 is about 9 points higher than FY2014–19.",
      foot: "Dashed lines: averages for FY2014–19 (17%) and FY2020–25 (26%). In FY2020 this group's requests fell 17% while its backlog rose 22%; the reports do not say why. Year-end backlog as a share of requests received that year.",
      yMax: 30, unit: "%",
      series: [{name: "Backlog as % of requests received", color: C.blue, v: [12.9,14.5,13.1,9.4,10.6,10.5,15.2,18.0,16.9,15.8,17.1,18.7,27.6,25.9,27.8,23.2,21.9,29.9]}],
      avgs: [{from: 2014, to: 2019, label: "FY2014–19 avg 17%"}, {from: 2020, to: 2025, label: "FY2020–25 avg 26%"}]
    }
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
      <p>Four findings from the agencies' own FOIA reports, FY2008–FY2025. Each one holds in every year, and still holds if any single agency or component is left out. Pick a question on the left to explore the data yourself.</p></div>`);
    const grid = document.createElement("div"); grid.className = "story-grid"; STORIES.forEach(s => grid.appendChild(card(s))); es.appendChild(grid);
    es.insertAdjacentHTML("beforeend", `<p class="stories-method">How these were counted: government totals add up component rows plus agencies that have no components, and match foia.gov's government-wide totals. The reports are filled in by the agencies themselves, and some numbers are revised the next year. They show what changed, not why.</p>`);
  }
  const scan = () => document.querySelectorAll(".empty-state:not([data-stories])").forEach(fill);
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", scan);
})();

/* ---------- The four findings for the selected agency/component and the "Compare with" list (appended under the overview tiles) ---------- */
(function () {
  const YEARS = Array.from({length: 18}, (_, i) => 2008 + i);
  const SERIES = ["#4582cc", "#8c3a91", "#0b5a36", "#d4a92c", "#cc5c52", "#21304a"];  // same order as the dashboard's overview
  const C = {ref: "#8a8f98", ink: "#333C47", muted: "#6c6b66", grid: "#e9ecf1"};
  const MIN_N = 20, TOTAL = "All agencies (government total)", ALL = "__all__";
  let DATA = null;
  const load = () => DATA || (DATA = fetch("data/foia.json").then(r => r.json()).then(d => {
    const keys = Object.keys(d.values), find = (pre, has) => keys.find(k => k.startsWith(pre) && k.includes(has));
    d.K = {cats02: keys.filter(k => k.startsWith("02_") && !k.includes("Total")), FG: find("02_", "FullGrant"), PG: find("02_", "PartialGrant"),
      NR: find("02_", "[NoRecords]"), FD: find("02_", "FullExemptionDenial"), ex05: keys.filter(k => k.startsWith("05_")),
      E6: find("05_", "[Ex. 6]"), E7C: find("05_", "[Ex. 7(C)]"), AR: find("07_", "Received"), PRO: find("01_", "Processed"),
      REC: find("01_", "Received"), T8: find("08_", "Total"), RV: find("08_", "Reversed"), PA: find("08_", "Partial"), BL: find("26_", "BackloggedRequest")};
    return d;
  }));
  const REF = {  // government-wide finding lines, from notes/37
    f1: {name: "Outside DHS and NARA", v: [50.0,45.5,47.0,47.1,47.3,47.3,42.0,39.7,39.3,38.0,40.1,37.1,36.8,32.9,30.2,29.7,24.3,21.4]},
    f2: {name: "All agencies", v: [17.7,13.2,16.6,15.0,13.3,16.9,15.4,10.9,13.3,11.3,10.0,8.8,10.5,10.9,10.1,8.6,8.1,7.7]},
    f3: {name: "Agencies other than DHS", v: [21.4,24.4,25.7,24.9,26.9,23.5,23.1,22.2,25.9,23.5,22.4,23.2,22.9,20.6,23.7,26.0,27.1,27.3]},
    f4: {name: "Outside USCIS, CBP, ICE, EOIR", v: [12.9,14.5,13.1,9.4,10.6,10.5,15.2,18.0,16.9,15.8,17.1,18.7,27.6,25.9,27.8,23.2,21.9,29.9]}};

  // the selection, read from the dashboard's own inputs (their .value is the same value the dashboard uses)
  const formOf = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); return l && l.closest("form") };
  function readUnits() {
    const af = formOf("Agency"), cf = formOf("Component"), cmp = document.querySelector("div.cmp");
    const agency = af ? af.value : TOTAL, comp = cf && !cf.querySelector("select").disabled ? cf.value : ALL;
    const selKey = agency === TOTAL ? "" : comp === ALL ? `A|${agency}` : `C|${agency}|${comp}`;
    const list = cmp && Array.isArray(cmp.value) ? cmp.value.filter(k => k !== selKey) : [];
    const units = [];
    if (selKey) units.push({key: selKey, color: SERIES[0]});
    list.forEach((k, i) => units.push({key: k, color: SERIES[(i + 1) % SERIES.length]}));
    return units;
  }
  function rowsFor(d, key) {
    const [lv, agency, ck] = key.split("|"), id = d.ids, out = {}; let name = agency, code = "";
    for (let i = 0; i < id.FY.length; i++) {
      if (id.Agency[i] !== agency) continue;
      if (lv === "A" ? id.level[i] !== "agency" : id.level[i] !== "component" || id.Key[i] !== ck) continue;
      (out[id.FY[i]] = out[id.FY[i]] || []).push(i);
      if (lv === "C") { name = id.Name[i]; code = id.Component[i] }
    }
    return {rows: out, agency, full: lv === "C" ? `${name} (${code})` : agency, short: lv === "C" ? code : agency, isComp: lv === "C", code};
  }
  const sum = (d, keys, idx) => { let s = 0, any = false; (Array.isArray(keys) ? keys : [keys]).forEach(k => idx.forEach(i => { const v = d.values[k][i]; if (v != null) { s += v; any = true } })); return any ? s : null };
  function compute(d, rows) {
    const K = d.K, per = f => YEARS.map(y => rows[y] ? f(rows[y]) : null);
    const rate = (num, den) => idx => { const n = sum(d, num, idx), m = sum(d, den, idx); return m ? {v: n / m * 100, n: m} : (m === 0 ? {v: null, n: 0} : null) };
    return {f1: per(rate(K.FG, K.cats02)), f1pg: per(rate(K.PG, K.cats02)), f1nr: per(rate(K.NR, K.cats02)),
      f2: per(rate(K.FD, [K.FD, K.PG])), f2priv: per(rate([K.E6, K.E7C], K.ex05)),
      f3: per(rate([K.RV, K.PA], K.T8)), f3per: per(rate(K.AR, K.PRO)), f4: per(rate(K.BL, K.REC))};
  }
  const r1 = x => Math.round(x * 10) / 10, pct = v => `${r1(v)}%`;
  const okP = p => p && p.v != null && p.n >= MIN_N;
  const lastOf = s => { for (let i = 17; i >= 0; i--) if (okP(s[i])) return [YEARS[i], s[i].v]; return null };
  function facts(s) {
    const ok = s.map((p, i) => okP(p) ? [YEARS[i], p.v] : null).filter(Boolean); if (!ok.length) return null;
    const vs = ok.map(p => p[1]); return {first: ok[0], last: ok[ok.length - 1], min: Math.min(...vs), max: Math.max(...vs), n: ok.length};
  }

  function chart(lines, ref, title) {
    const W = 520, H = 170, M = {l: 34, r: 150, t: 10, b: 22};
    const vals = [...lines.flatMap(L => L.s.filter(p => p && p.v != null).map(p => p.v)), ...ref.v];
    const top = [10, 20, 25, 40, 50, 60, 80, 100, 150, 200, 300, 500, 1000].find(t => t >= Math.max(...vals)) || Math.ceil(Math.max(...vals));
    const x = yr => M.l + (yr - 2008) / 17 * (W - M.l - M.r), y = v => M.t + (1 - Math.min(v, top) / top) * (H - M.t - M.b);
    const NS = "http://www.w3.org/2000/svg", el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e };
    const svg = el("svg", {viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": title});
    [0, top / 2, top].forEach(t => { svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(t), y2: y(t), stroke: C.grid}));
      const l = el("text", {x: M.l - 6, y: y(t) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}); l.textContent = r1(t) + "%"; svg.appendChild(l) });
    [2008, 2012, 2016, 2020, 2025].forEach(yr => { const l = el("text", {x: x(yr), y: H - 6, "text-anchor": "middle", "font-size": 10, fill: C.muted}); l.textContent = yr; svg.appendChild(l) });
    svg.appendChild(el("path", {d: ref.v.map((v, i) => `${i ? "L" : "M"}${x(YEARS[i])},${y(v)}`).join(" "), fill: "none", stroke: C.ref, "stroke-width": 1.5, "stroke-dasharray": "4 3"}));
    lines.forEach(L => {  // each unit: line only through years with enough cases; small-number years as hollow points
      let seg = [];
      const flush = () => { if (seg.length > 1) svg.appendChild(el("path", {d: seg.map((p, i) => `${i ? "L" : "M"}${p}`).join(" "), fill: "none", stroke: L.color, "stroke-width": 2, "stroke-linejoin": "round"}));
        if (seg.length === 1) { const [a, b] = seg[0].split(","); svg.appendChild(el("circle", {cx: a, cy: b, r: 2.5, fill: L.color})) } seg = [] };
      L.s.forEach((p, i) => { if (okP(p)) seg.push(`${x(YEARS[i])},${y(p.v)}`); else { flush(); if (p && p.v != null) svg.appendChild(el("circle", {cx: x(YEARS[i]), cy: y(p.v), r: 3, fill: "#fff", stroke: L.color, "stroke-width": 1.2, opacity: 0.6})) } });
      flush();
    });
    const ends = [];
    lines.forEach(L => { const e = lastOf(L.s); if (e) ends.push({yy: y(e[1]), cy: y(e[1]), cx: x(e[0]), c: L.color, text: `${r1(e[1])}% ${L.label}${e[0] < 2025 ? ` (FY${e[0]})` : ""}`}) });
    ends.push({yy: y(ref.v[17]), cy: y(ref.v[17]), cx: x(2025), c: C.ref, text: `${ref.v[17]}% group`});
    ends.sort((a, b) => a.yy - b.yy); for (let i = 1; i < ends.length; i++) if (ends[i].yy - ends[i - 1].yy < 12) ends[i].yy = ends[i - 1].yy + 12; const floor = H - M.b - 2; if (ends.length && ends[ends.length - 1].yy > floor) { ends[ends.length - 1].yy = floor; for (let i = ends.length - 2; i >= 0; i--) ends[i].yy = Math.min(ends[i].yy, ends[i + 1].yy - 12) }
    ends.forEach(e => { svg.appendChild(el("circle", {cx: e.cx, cy: e.cy, r: 3, fill: e.c})); const t = el("text", {x: x(2025) + 8, y: e.yy + 3.5, "font-size": 10, fill: C.ink}); t.textContent = e.text; svg.appendChild(t) });
    const cross = el("line", {y1: M.t, y2: H - M.b, stroke: "#9aa3ae", visibility: "hidden"}); svg.appendChild(cross);
    const hit = el("rect", {x: M.l, y: 0, width: W - M.l - M.r, height: H, fill: "transparent"}); svg.appendChild(hit);
    const box = document.createElement("div"); box.className = "chart"; const tip = document.createElement("div"); tip.className = "tip";
    hit.addEventListener("mousemove", ev => { const r = svg.getBoundingClientRect(), i = Math.max(0, Math.min(17, Math.round(((ev.clientX - r.left) / r.width * W - M.l) / (W - M.l - M.r) * 17)));
      cross.setAttribute("x1", x(YEARS[i])); cross.setAttribute("x2", x(YEARS[i])); cross.setAttribute("visibility", "visible");
      const row = L => { const p = L.s[i]; return `<i style="background:${L.color}"></i>${L.label}: ${!p ? "no report" : p.v == null ? "none to count" : `${r1(p.v)}%${p.n < MIN_N ? ` (only ${p.n} cases)` : ""}`}` };
      tip.innerHTML = `<b>FY${YEARS[i]}</b><br>${lines.map(row).join("<br>")}<br><i style="background:${C.ref}"></i>${ref.name}: ${ref.v[i]}%`;
      tip.style.display = "block"; const left = x(YEARS[i]) / W * r.width; tip.style.left = (left > r.width * 0.5 ? left - tip.offsetWidth - 10 : left + 10) + "px"; tip.style.top = "6px" });
    hit.addEventListener("mouseleave", () => { cross.setAttribute("visibility", "hidden"); tip.style.display = "none" });
    box.appendChild(svg); box.appendChild(tip); return box;
  }

  function outOfGroup(f, u) {  // returns a short reason if this unit is outside the finding's group
    const isDHS = u.agency === "Department of Homeland Security", isNARA = u.agency.startsWith("National Archives");
    const imm = (isDHS && ["USCIS", "CBP", "ICE"].includes(u.code)) || (u.agency === "Department of Justice" && u.code === "EOIR");
    const who = u.isComp && isDHS ? `${u.label} (part of DHS)` : u.label;
    if (f === "f1" && isDHS) return [who, "the DHS “no records” share jumped after FY2021 and has not been checked yet"];
    if (f === "f1" && isNARA) return [who, "NARA's categories swing from year to year"];
    if (f === "f3" && isDHS) return [who, "DHS as a whole reverses far more appeals than other agencies"];
    if (f === "f4" && imm) return [who, "it is one of the four immigration units"];
    if (f === "f4" && !u.isComp && (isDHS || u.agency === "Department of Justice")) return [`${u.label} (whole agency)`, `its total includes ${isDHS ? "USCIS, CBP and ICE" : "EOIR"}`];
    return null;
  }
  function card(f, kicker, heading, units, key, extras) {
    const el = document.createElement("article"); el.className = "story";
    const lines = units.map(u => ({label: u.label, color: u.color, s: u.S[key]})), ref = REF[f];
    let body;
    if (units.length === 1) {
      const u = units[0], F = facts(u.S[key]);
      body = !F ? `${u.label}: too few cases to show this rate.` : F.n === 1 ? `${u.label}: ${pct(F.last[1])} in FY${F.last[0]}, the only year with at least ${MIN_N} cases.`
        : `${u.label}: ${pct(F.first[1])} in FY${F.first[0]} and ${pct(F.last[1])} in FY${F.last[0]}; between ${pct(F.min)} and ${pct(F.max)} in the ${F.n} years with at least ${MIN_N} cases.`;
      body += extras.map(e => { const l = lastOf(u.S[e.key]); return l ? ` ${e.say(l)}` : "" }).join("");
    } else {
      body = "Latest year with at least " + MIN_N + " cases: " + units.map(u => { const l = lastOf(u.S[key]); return `${u.label} ${l ? `${pct(l[1])}${l[0] < 2025 ? ` (FY${l[0]})` : ""}` : "too few cases"}` }).join(" · ") + `. Group: ${ref.v[17]}% in FY2025. Full series under “Numbers”.`;
    }
    const outs = units.map(u => outOfGroup(f, u)).filter(Boolean);
    const outText = outs.length ? `Not in this finding's group: ${outs.map(([w, why]) => `${w}, because ${why}`).join("; ")}. ` : "";
    const base = f === "f3" ? "Counted out of all closed appeals, including those closed for other reasons; tile 5 above counts only appeals decided on the merits, so its number is higher. " : "";
    el.innerHTML = `<div class="kicker">${kicker}</div><h3>${heading}</h3><p class="body">${body}</p>
      <div class="legend">${units.map(u => `<span><i style="background:${u.color}"></i>${u.label}</span>`).join("")}<span><i style="background:none;border-top:2px dashed ${C.ref};height:0"></i>${ref.name} (the finding's group)</span></div>`;
    el.appendChild(chart(lines, ref, heading));
    const cell = p => !p || p.v == null ? "–" : `${pct(p.v)}${p.n < MIN_N ? "*" : ""}`;
    const extraCols = units.length === 1 ? extras : [];
    const rows = YEARS.map((yr, i) => `<tr><td>FY${yr}</td>${units.map(u => `<td>${cell(u.S[key][i])}</td>`).join("")}${extraCols.map(e => `<td>${cell(units[0].S[e.key][i])}</td>`).join("")}<td>${ref.v[i]}%</td></tr>`).join("");
    el.insertAdjacentHTML("beforeend", `<p class="foot">${outText}${base}Hollow points (and * in the table): fewer than ${MIN_N} cases that year. The finding was checked for the group, not for single agencies or components.</p>
      <div class="actions"><details><summary>Numbers</summary><table><tr><th>Year</th>${units.map(u => `<th>${u.label}</th>`).join("")}${extraCols.map(e => `<th>${e.h}</th>`).join("")}<th>Group</th></tr>${rows}</table></details></div>`);
    return el;
  }
  async function fillAC(ov) {
    ov.dataset.acf = "1";
    const picked = readUnits(); if (!picked.length) return;
    const d = await load(); if (!ov.isConnected) return;
    const units = picked.map(p => Object.assign(p, rowsFor(d, p.key))).filter(u => Object.keys(u.rows).length);
    if (!units.length) return;
    const shorts = units.map(u => u.short);  // same name at two agencies: add the agency
    units.forEach(u => { u.label = shorts.filter(s => s === u.short).length > 1 ? `${u.agency} › ${u.short}` : u.short; u.S = compute(d, u.rows) });
    const one = units.length === 1, title = one ? units[0].full : units.map(u => u.label).join(", ");
    const sec = document.createElement("section"); sec.className = "ac-findings";
    sec.innerHTML = `<div class="stories-head"><h2>The four findings — ${title}</h2><p>${one ? `Blue: ${units[0].label}'s own numbers.` : "Colored lines: each unit's own numbers, same colors as above."} Grey dashed: the group each government-wide finding is about. The findings were checked for those groups; for one agency or component the numbers are just its own record, not a test of the finding.</p></div>`;
    const grid = document.createElement("div"); grid.className = "story-grid";
    grid.appendChild(card("f1", "1 · Outcomes", "Released in full, share of processed requests", units, "f1",
      [{key: "f1pg", h: "Partly", say: l => `In FY${l[0]}: partly released ${pct(l[1])}.`}, {key: "f1nr", h: "No records", say: l => `No records found ${pct(l[1])}.`}]));
    grid.appendChild(card("f2", "2 · Exemptions", "Full denials, share of partly released + fully denied requests", units, "f2",
      [{key: "f2priv", h: "Privacy share", say: l => `Privacy exemptions were ${pct(l[1])} of its exemption citations in FY${l[0]}.`}]));
    grid.appendChild(card("f3", "3 · Appeals", "Appeals reversed fully or partly, share of closed appeals", units, "f3",
      [{key: "f3per", h: "Appeals per 100 processed", say: l => `It received ${r1(l[1])} appeals per 100 processed requests in FY${l[0]}.`}]));
    grid.appendChild(card("f4", "4 · Backlog", "Year-end backlog, share of requests received", units, "f4", []));
    sec.appendChild(grid); ov.appendChild(sec);
  }
  const scan = () => document.querySelectorAll(".overview:not([data-acf])").forEach(fillAC);
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
})();

/* ---------- Storyline 1 walkthrough: a dialog of step cards, swipe or arrow keys (sample, branch exploring-storyline-display, 2026-11-14) ----------
   Text and numbers: data/s1_walk.json, built by ~/ds701-spark/data/scripts/storyline_cards_1114/build_s1_walk.py from the S1 notebook code. */
(function () {
  const C = {blue: "#4582cc", purple: "#8c3a91", gold: "#d4a92c", green: "#0b5a36", ink: "#333C47", muted: "#6c6b66", grid: "#e9ecf1"};
  const COLORS = {"Released in full": C.blue, "Partly released": C.purple, "No records found": C.gold, "Fully denied on exemptions": C.green,
    "DHS share": C.purple, "Outside DHS": C.blue, "DHS": C.purple};
  const SHORT = {"Released in full": "in full", "Partly released": "partly", "No records found": "no records", "Fully denied on exemptions": "denied",
    "Outside DHS": "outside DHS", "DHS": "DHS"};
  const STEPS = 9, NS = "http://www.w3.org/2000/svg";
  let DATA = null, modal = null, idx = 0, opener = null;
  const el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e };
  const txt = (svg, a, s) => { const e = el("text", Object.assign({"font-size": 10.5, fill: C.ink}, a)); e.textContent = s; svg.appendChild(e); return e };
  const nice = m => [10, 20, 25, 40, 50, 60, 70, 80, 100].find(t => t >= m) || Math.ceil(m / 10) * 10;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"})[c]);

  function lines(ch, years, W) {
    const H = Math.round(W * 0.38), M = {l: 36, r: Math.round(W * 0.2), t: 10, b: 24}, names = Object.keys(ch.series), n = years.length - 1;
    const top = nice(Math.max(...names.flatMap(k => ch.series[k])));
    const x = i => M.l + i / n * (W - M.l - M.r), y = v => M.t + (1 - v / top) * (H - M.t - M.b);
    const svg = el("svg", {viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ch.title});
    [top / 2, top].forEach(t => { svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(t), y2: y(t), stroke: C.grid})); txt(svg, {x: M.l - 6, y: y(t) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}, t + "%") });
    svg.appendChild(el("line", {x1: M.l, x2: W - M.r, y1: y(0), y2: y(0), stroke: "#8a8f98"})); txt(svg, {x: M.l - 6, y: y(0) + 3.5, "text-anchor": "end", "font-size": 10, fill: C.muted}, "0%");
    [2008, 2012, 2016, 2020, 2025].forEach(yr => txt(svg, {x: x(years.indexOf(yr)), y: H - 6, "text-anchor": "middle", "font-size": 10, fill: C.muted}, yr));
    names.forEach(k => svg.appendChild(el("path", {d: ch.series[k].map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" "), fill: "none", stroke: COLORS[k] || C.ink, "stroke-width": 2.2, "stroke-linejoin": "round", "stroke-linecap": "round"})));
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
    d.innerHTML = `<div class="s1m-kicker">Step ${i + 1} of ${STEPS} · ${esc(s.kicker)}</div><h3>${esc(s.title)}</h3>${s.text.map(p => `<p>${esc(p)}</p>`).join("")}`;
    const wrap = document.createElement("div"); wrap.className = "s1m-charts" + (s.charts.length > 1 ? " two" : "");
    s.charts.forEach(ch => { const f = document.createElement("figure"); f.innerHTML = `<figcaption>${esc(ch.title)}</figcaption>`;
      const names = ch.series ? Object.keys(ch.series) : [];
      if (names.length > 1) f.insertAdjacentHTML("beforeend", `<div class="s1m-legend">${names.map(k => `<span><i style="background:${COLORS[k] || C.ink}"></i>${esc(k)}</span>`).join("")}</div>`);
      f.appendChild(ch.kind === "bars" ? bars(ch, 640) : lines(ch, DATA.years, s.charts.length > 1 ? 440 : 640)); wrap.appendChild(f) });
    d.appendChild(wrap);
    if (s.note) d.insertAdjacentHTML("beforeend", `<p class="s1m-note">${esc(s.note)}</p>`);
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
        <div class="s1m-view"><div class="s1m-track"></div></div>
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
  function go(i) {
    idx = Math.max(0, Math.min(STEPS - 1, i));
    modal.querySelector(".s1m-track").style.transform = `translateX(${-idx * 100}%)`;
    modal.querySelectorAll(".s1m-dot").forEach((d, j) => j === idx ? d.setAttribute("aria-current", "step") : d.removeAttribute("aria-current"));
    modal.querySelectorAll(".s1m-slide").forEach((s, j) => { s.inert = j !== idx; if (j === idx) s.scrollTop = 0 });
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
