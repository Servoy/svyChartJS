# Triage Report — SVY-21462

**Verdict:** PROCEED

## Reported problem
Under NG2 (TiNG) in Servoy 2024.3.10 LTS, calling `drawChart()` on the **svyChartJS**
component (v2024.3.4) throws a runtime error. The attached `chart_demo.servoy`
reproduces it. Two errors appear in the browser console:

1. `WebsocketSession - Error ... in parsing/processing this message` for a
   `componentApis` message carrying `clearChart` and `drawChart`, both with
   `delayUntilFormLoads: true`.
2. `TypeError: Cannot read properties of undefined (reading 'chart')` at
   `_SvyChartJS.drawChart`.

The reporter notes the problem does **not** occur in Servoy 2025 and asks for a fix in
the **2024.3 LTS** line (they cannot upgrade). The ticket proposes no concrete solution;
it is filed against Servoy with fixVersion *2024.3.12 LTS*, implying an expected
Servoy-side framework fix.

## Root-cause assessment
The crash is in the **component**, not in Servoy framework code.

svyChartJS `drawChart()` on the `2024.3` branch
(`svychartjs/projects/svychartjs/src/chart/chart.ts`, introduced 2021 in commit
`eb83223`, unchanged since):

```ts
drawChart() {
    // what to do here ?
    this.chart.chart.render();      // <-- no null-guard
    if (this.onChartDrawn) {
        this.onChartDrawn();
    }
}
```

`this.chart` is `@ViewChild(BaseChartDirective, { static: false })` — the ng2-charts
directive. In `chart.html` that directive is gated by `*ngIf="showCanvas"`, and
`showCanvas` only becomes `true` in `ngAfterViewInit`. So `this.chart` is `undefined`
until the canvas has materialised and change detection has run. Reading
`this.chart.chart` while `this.chart` is `undefined` throws exactly the reported
`Cannot read properties of undefined (reading 'chart')`.

The two console errors are the **same event**: the second (the `TypeError`) is the
actual fault; the first is Sablo's `WebsocketSession.handleMessage` reporting that
processing the incoming `componentApis` message failed because the delayed call threw.

The Servoy TiNG framework behaves correctly and by contract. In
`com.servoy.eclipse.ngclient.ui/node/src/ngclient/form.service.ts:59-95`,
`delayUntilFormLoads: true` means: wait until the **form** is loaded
(`formComponentCache` resolved) and `clientFunctionService.waitForLoading()` settles,
then invoke `formComponent.callApi(...)` → `component.drawChart()`. The framework
guarantees the **form** is loaded; it does **not** (and cannot) guarantee that a
component's internal view children (here the ng2-charts directive) have finished
rendering. Guarding that internal readiness is the component's responsibility.

Sibling methods in the same 2024.3 file already do this guarding:

```ts
refreshChart() { ... if (this.chart && this.chart.chart) { this.chart.chart.update(); } }
clearChart()   {     if (this.chart && this.chart.chart) { this.chart.chart.clear();  } }
```

Only `drawChart()` lacks the guard.

## Ticket premise check
The implied premise — that this should be fixed in the **Servoy 2024.3.12 LTS
framework** — does **not** hold. The defect is entirely in the svyChartJS component's
`2024.3` branch. The "works in 2025, fails in 2024.3" observation is explained by the
**component** version paired with each Servoy line, not by a framework regression: the
svyChartJS `master` branch `drawChart()` already guards with optional chaining
(`this.chartDirective?.chart?.render();`), whereas the `2024.3` branch never received
that guard. No Servoy framework change is warranted or appropriate.

## Approaches considered

1. **Fix svyChartJS `drawChart()` on the component's `2024.3` branch (recommended).**
   Add the same null-guard already used by `clearChart`/`refreshChart`, e.g.
   `if (this.chart && this.chart.chart) { this.chart.chart.render(); }` (or optional
   chaining `this.chart?.chart?.render();`). Publish a new 2024.3.x build of the
   component.
   - Pros: fixes the actual root cause; one line; matches the existing pattern in the
     same file; already proven correct on `master`; no framework risk; deliverable in
     the 2024.3 line the customer is on.
   - Cons: requires a component release rather than a Servoy release; the SVY ticket and
     its Servoy fixVersion likely need re-routing to the svyChartJS project.

2. **Change Servoy TiNG framework to further delay component API calls until child
   directives are ready.**
   - Pros: none that are proportionate.
   - Cons: wrong layer; the framework cannot know per-component internal readiness; would
     be a broad, risky change to core delayed-API semantics affecting every component;
     does not match how the same component already guards `clearChart`/`refreshChart`.

3. **No code change.**
   - Pros: nothing to ship in Servoy.
   - Cons: this is a real, reproducible, blocker-priority defect with a clear one-line
     fix. Doing nothing leaves customers on 2024.3 broken. Not acceptable.

## Recommendation
**PROCEED**, but fix it in the **svyChartJS component `2024.3` branch**, not in Servoy
2024.3 LTS framework code.

Add a null-guard to `drawChart()` in
`svychartjs/projects/svychartjs/src/chart/chart.ts` on the `2024.3` branch, mirroring
the existing `clearChart`/`refreshChart` guard (introduced by SVYX-784), then publish a
new 2024.3.x svyChartJS build. This is the minimal, correct fix and is already the
behaviour on `master`.

Action for the orchestrator/human: re-route this from a Servoy framework change to a
svyChartJS component change (likely an `SVYX-` case against the component), and correct
the Servoy *2024.3.12 LTS* fixVersion accordingly. Alternative 2 (framework change) is
explicitly not recommended.

## Git history findings
- svyChartJS `2024.3` `drawChart()` — introduced by `eb83223` (lvostinar, 2021-05-27,
  "SVY-16137 [NG2] move all package to their own git repo") and never guarded since.
- svyChartJS `2024.3` `clearChart`/`refreshChart` guards — added by `5d29444`
  (cPecican, 2024-02-01, "SVYX-784 TiNG error with clearChart & refreshChart - update").
  That fix guarded `clearChart` and `refreshChart` but **overlooked** `drawChart`, which
  is the exact gap SVY-21462 now hits.
- svyChartJS `master` `drawChart()` — already guarded via optional chaining
  (`this.chartDirective?.chart?.render();`), part of the Angular 19 / signals migration
  line; explains why Servoy 2025 (shipping the newer component) is unaffected.
- Servoy (`servoy_201903`, branch `lts_2024`) delayed-API handling —
  `com.servoy.eclipse.ngclient.ui/node/src/ngclient/form.service.ts:59-95`; behaviour is
  correct by contract, no change needed.
- No prior `docs/` spec or triage exists for SVY-21462.
