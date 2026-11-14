# Federal FOIA Dashboard (v4: the prototype plus storyline cards)

Draft v4 of the BU Spark! DS 701 prototype FOIA dashboard for MuckRock's Data Liberation Project. Not an official MuckRock product.

Live page: https://crazythursv50.github.io/foia-dashboard-v4/

## What v4 adds
v4 is built on the public preview site (foia-dashboard-preview), not on v2 or v3. The page code is unchanged; two files are added at the end of `index.html`: `stories.css` and `stories.js`.
- Start page (no agency or component chosen): four storyline cards in place of the watermark: Requests, Outcomes, Appeals and Backlog.

Status (2026-11-14): all four storylines are being reworked. Each card is a grey placeholder labelled "Storyline in progress" and holds no text or numbers; the section that showed the findings for a chosen agency or component is removed for now.

## Data
`docs/data/foia.json`: built 2026-11-02 from the component-level table of foia.gov's annual FOIA reports (FY2008–FY2025). Same file as the preview site.

## Preview locally
```
cd docs
python3 -m http.server 8772 --bind 127.0.0.1
```
Then open http://127.0.0.1:8772/
