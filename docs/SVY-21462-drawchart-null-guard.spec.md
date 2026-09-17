# Spec: SVY-21462 — svyChartJS drawChart() throws errors under NG2 (TiNG)

## 1. Goal
Fix the runtime crash that occurs when a solution calls the svyChartJS component's
`drawChart()` API under NG2 (TiNG) in the Servoy 2024.3 LTS line. The call currently
throws `TypeError: Cannot read properties of undefined (reading 'chart')` because
`drawChart()` dereferences the ng2-charts view child before it has rendered. Adding a
null-guard — identical to the one the sibling `clearChart()`/`refreshChart()` methods
already use — makes the API safe to call and unblocks the customer, who is on 2024.3 LTS
and cannot upgrade to Servoy 2025.

## 2. Background
The defect is in the **svyChartJS component**, not in the Servoy framework. This is a
component change on the svyChartJS `2024.3` branch, delivered as a new 2024.3.x
component build. **No Servoy framework change is proposed.**

In `svychartjs/projects/svychartjs/src/chart/chart.ts` on the `2024.3` branch:

- `this.chart` is `@ViewChild(BaseChartDirective, { static: false })` (line 39) — the
  ng2-charts directive. In `chart.html` that directive is gated by `*ngIf="showCanvas"`,
  and `showCanvas` only becomes `true` in `ngAfterViewInit` (line 83) / after
  `initPlugins()`'s `setTimeout` (lines 574-577). So `this.chart` is `undefined` until
  the canvas has materialised and change detection has run.
- `drawChart()` (lines 402-408) reads `this.chart.chart.render()` with **no guard**, so
  when the framework delivers the delayed API call before the directive exists, it
  throws the reported `TypeError`.
- The sibling methods in the same file **already guard** this exact condition:
  - `refreshChart()` (line 391): `if (this.chart && this.chart.chart) { this.chart.chart.update(); }`
  - `clearChart()` (line 397): `if (this.chart && this.chart.chart) { this.chart.chart.clear(); }`

  Those guards were added by `5d29444` (SVYX-784, "TiNG error with clearChart &
  refreshChart"), which fixed `clearChart`/`refreshChart` but **overlooked**
  `drawChart` — the exact gap SVY-21462 hits.

The two console errors in the ticket are one event: the `TypeError` in
`_SvyChartJS.drawChart` is the actual fault; the surrounding Sablo
`WebsocketSession` "Error … in parsing/processing this message" for the
`componentApis` message (`clearChart` + `drawChart`, `delayUntilFormLoads: true`) is
Sablo reporting that the delayed call threw.

The framework behaves correctly by contract. `delayUntilFormLoads: true`
(`com.servoy.eclipse.ngclient.ui/node/src/ngclient/form.service.ts:59-95` in the Servoy
reference repo) guarantees the **form** is loaded before invoking the API; it does not
and cannot guarantee that a component's internal view children have finished rendering.
Guarding that internal readiness is the component's responsibility.

The unguarded `drawChart()` is **not** unique to `2024.3`. A branch survey of
`chart.ts` shows:

| Branch | Component version | `drawChart()` state |
|--------|-------------------|---------------------|
| `2024.3` | 2024.3.4 | unguarded (`this.chart.chart.render()`) — **buggy** |
| `2024.3-upgrade-dependancies` | — | unguarded — **buggy** |
| `2026.6` | 2025.3.0 | unguarded — **buggy** (siblings guarded, `drawChart` still overlooked) |
| `master` | 2026.9.1 | guarded via optional chaining (`this.chartDirective?.chart?.render();`) — fixed |

The `5d29444` (SVYX-784) fix that guarded `clearChart`/`refreshChart` never reached
`drawChart` on any of the `2024.3`, `2024.3-upgrade-dependancies`, or `2026.6` branches.
Only the `master` branch — where `drawChart()` was rewritten with optional chaining
during the Angular 19 / signals migration — is already safe. "Works in 2025" as
reported is therefore not universally true for the 2025.3.x component line; the fix
must be forward-ported through `2026.6`.

## 3. Design

### 3.1 Add a null-guard to drawChart()
Guard the `render()` call exactly as `clearChart()`/`refreshChart()` do, so the method
is a no-op when the chart directive is not yet available. The `onChartDrawn` callback
should only fire when a render actually happened, matching the intent that the callback
signals a drawn chart.

Current (`chart.ts`, lines 402-408):

```ts
drawChart() {
    // what to do here ?
    this.chart.chart.render();
    if (this.onChartDrawn) {
        this.onChartDrawn();
    }
}
```

Proposed:

```ts
drawChart() {
    if (this.chart && this.chart.chart) {
        this.chart.chart.render();
        if (this.onChartDrawn) {
            this.onChartDrawn();
        }
    }
}
```

Rationale for keeping the `this.chart && this.chart.chart` form (rather than optional
chaining): it matches the existing style of `clearChart`/`refreshChart` in the same
2024.3 file, keeping the three API methods consistent and the diff minimal. The stale
`// what to do here ?` comment is removed since the method's behaviour is now defined.

### 3.2 Forward-port to 2026.6
Because `2026.6` (v2025.3.0) carries the identical unguarded `drawChart()`, the same
guard must be applied there so the 2025.3.x component line is fixed too. `master`
(v2026.9.1) is already guarded via optional chaining, so the propagation stops at
`2026.6` — nothing to do on `master`. The `2024.3-upgrade-dependancies` branch is a
stale/experimental line and is out of scope (see §6).

### 3.3 Release
After the fix, publish a new svyChartJS **2024.3.x** component build so customers on the
2024.3 LTS line can consume it, and a corresponding **2025.3.x** build from the `2026.6`
branch. The customer's reproduction (`chart_demo.servoy`, using component v2024.3.4)
should no longer error after upgrading to the new build.

## 4. Implementation plan

1. On the `2024.3` branch, in `svychartjs/projects/svychartjs/src/chart/chart.ts`,
   wrap the body of `drawChart()` in an `if (this.chart && this.chart.chart) { ... }`
   guard around `this.chart.chart.render()` and the `onChartDrawn` callback; remove the
   stale `// what to do here ?` comment.
2. Build the component and run its tests to confirm no regression.
3. Bump the component to a new 2024.3.x version and publish the build.
4. Forward-port the identical guard to the `2026.6` branch (v2025.3.0), which has the
   same unguarded `drawChart()`. Match that branch's existing `clearChart`/`refreshChart`
   guard style. Build, test, bump to a new 2025.3.x version and publish.
5. No change on `master` (already guarded via optional chaining) or on
   `2024.3-upgrade-dependancies` (out of scope).

## 5. Acceptance criteria
- [ ] Calling `drawChart()` before the chart directive has rendered no longer throws
      `TypeError: Cannot read properties of undefined (reading 'chart')`; the call is a
      safe no-op in that state.
- [ ] Calling `drawChart()` after the chart has rendered still renders the chart and
      invokes `onChartDrawn` (when provided).
- [ ] `onChartDrawn` is not invoked when the chart directive is not yet available (no
      render occurred).
- [ ] The attached `chart_demo.servoy` reproduction runs under NG2 (TiNG) on Servoy
      2024.3 LTS with the new component build without the reported console errors
      (neither the `TypeError` nor the Sablo `WebsocketSession` processing error for the
      `componentApis` message).
- [ ] `drawChart()`, `clearChart()`, and `refreshChart()` share the same guard style in
      `chart.ts`.

## 6. Out of scope
- Any change to the Servoy framework, including the delayed-API / `delayUntilFormLoads`
  handling in `form.service.ts`. The framework behaviour is correct by contract.
- Porting or altering the svyChartJS `master` branch (already guarded via optional
  chaining as part of the Angular 19 / signals migration).
- The `2024.3-upgrade-dependancies` branch — a stale/experimental line, not a shipping
  release train.
- Broader refactors of `chart.ts` beyond the single-method guard.
- Re-routing the Jira ticket and correcting its fixVersion (see Open questions) — a
  process action for the orchestrator/human, not a code change in this spec.

## 7. Open questions
| Question | Owner | Status |
|----------|-------|--------|
| The SVY-21462 ticket is filed against Servoy with fixVersion *2024.3.12 LTS*, but the fix is a svyChartJS component change. Should it be re-routed to an `SVYX-` component case and the Servoy fixVersion corrected? | Orchestrator / human | open |
| Confirm the exact next svyChartJS 2024.3.x version number to publish. | Component maintainer | open |
