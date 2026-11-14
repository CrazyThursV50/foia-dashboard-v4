# Federal FOIA Dashboard (v4: the prototype plus storyline cards)

Draft v4 of the BU Spark! DS 701 prototype FOIA dashboard for MuckRock's Data Liberation Project. Not an official MuckRock product.

Live page: https://crazythursv50.github.io/foia-dashboard-v4/

## What v4 adds
v4 is built on the public preview site (foia-dashboard-preview), not on v2 or v3. The page code is unchanged; two files are added at the end of `index.html`: `stories.css` and `stories.js`.
- Start page (no agency or component chosen): four storyline cards in place of the watermark: Requests, Outcomes, Appeals and Backlog.
- After choosing an agency or component, or adding one under "Compare with": a "Findings" section below the six summary tiles, with the same four cards. In the Outcomes card each unit's own numbers are drawn as a line, and the group the government-wide finding is about is a grey dashed line. Years with fewer than 20 cases are hollow points.

Status (2026-11-14): only the Outcomes storyline (full releases) is final. The Requests, Appeals and Backlog cards are grey placeholders until those storylines are settled; they hold no numbers.

## Data
`docs/data/foia.json`: built 2026-11-02 from the component-level table of foia.gov's annual FOIA reports (FY2008–FY2025). Same file as the preview site.

## Preview locally
```
cd docs
python3 -m http.server 8772 --bind 127.0.0.1
```
Then open http://127.0.0.1:8772/
