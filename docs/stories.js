/* Start page: storyline cards. 2026-11-14: all four storylines are being reworked, so each card is a placeholder until it is
   checked. No storyline text or numbers are kept in the page while they are being checked. */

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
  function fill(es) {
    es.dataset.stories = "1"; es.classList.add("stories"); es.innerHTML = "";
    es.insertAdjacentHTML("beforeend", `<div class="stories-head"><h2>What the annual reports show</h2>
      <p>Storylines from the agencies' own FOIA reports are being checked and will appear here when they are ready. Pick a question on the left to explore the data yourself.</p></div>`);
    const grid = document.createElement("div"); grid.className = "story-grid";
    ["Requests", "Outcomes", "Appeals", "Backlog"].forEach(k => grid.appendChild(storyPlaceholder(k)));
    es.appendChild(grid);
  }
  const scan = () => document.querySelectorAll(".empty-state:not([data-stories])").forEach(fill);
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", scan);
})();
