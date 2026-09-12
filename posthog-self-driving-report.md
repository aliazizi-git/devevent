# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured for this Next.js web app. Session Replay was already enabled; Error Tracking and Support were enabled with server-owned defaults. Health, Error Tracking, and Support inbox responders are enabled, and findings will begin appearing in the [Self-driving inbox](https://us.posthog.com/project/601031/inbox) within about 30 minutes as data arrives.

## AI data processing

Approved by the wizard's organization-level gate before this setup ran.

## GitHub

GitHub is already connected through the PostHog GitHub App. No GitHub Issues responder was enabled because no connected tools were selected in this run.

## Products enabled

| Product | Result | Client check / note |
|---|---|---|
| Session Replay | Already enabled | `instrumentation-client.ts` does not disable recording. |
| Error Tracking | Enabled | `instrumentation-client.ts` has `capture_exceptions: true`. |
| Support (Conversations) | Enabled | Connect an inbound email, inbox, or Slack channel in PostHog before tickets can arrive. |

## Signal sources

| Source product | Source type | Action |
|---|---|---|
| `health_checks` | `health_issue` | Enabled (source id `01a0859d-3b98-777d-85a0-ec9066eea0db`). |
| `error_tracking` | `issue_created` | Enabled (source id `01a0859d-3d52-71bd-9afe-ff29caa3842f). |
| `error_tracking` | `issue_reopened` | Enabled (source id `01a0859d-3b38-7e5c-8da2-477948ed300e). |
| `error_tracking` | `issue_spiking` | Enabled (source id `01a0859d-3ba0-733e-96bd-9e2d9a7e3bde). |
| `conversations` | `ticket` | Enabled (source id `01a0859d-3b96-7692-b990-e6f0ba973fa1); idle until an inbound Support channel is connected. |
| `signals_scout` | `cross_source_issue` | Left without a row: scout findings are on by default. |
| `session_replay` | `session_analysis_cluster` | Skipped: this retired route is replaced by Replay Vision scanners below. |
| Connected-tool responders | Various | Skipped: no tool was selected. |

## Connected tools

The connected-tools selection was cancelled, so no external tool responder or warehouse source was added. GitHub remains connected but is not being used as an Issues responder by this setup.

## Scout troop

The enforced budget is **100 runs per day**; **0** had been used and **100** remained when checked. The project is enrolled in the early-access program. Banner: “Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.”

### Enabled (4)

| Scout | Why kept on |
|---|---|
| `signals-scout-general` | Cross-product coverage for issues outside a specialist's scope. |
| `signals-scout-product-analytics` | The app captures product interaction events for its primary outbound-resource paths. |
| `signals-scout-web-analytics` | This is a browser-based web app with web analytics configured. |
| `signals-scout-health-checks` | Keeps PostHog setup and instrumentation health actionable. |

### Disabled (23)

| Scout | Why disabled |
|---|---|
| `signals-scout-ai-observability` | No AI or LLM surface was found. |
| `signals-scout-anomaly-detection` | No established dashboards or insight baselines were found. |
| `signals-scout-apm` | No APM or OpenTelemetry surface was found. |
| `signals-scout-conversations` | Support has no inbound channel or ticket activity yet. |
| `signals-scout-csp-violations` | No CSP-reporting configuration was found. |
| `signals-scout-customer-analytics` | No account or group analytics surface was found. |
| `signals-scout-data-pipelines` | No CDP pipeline, batch export, or Hog flow surface was found. |
| `signals-scout-data-warehouse` | No warehouse source is connected. |
| `signals-scout-error-tracking` | Covered by the enabled native Error Tracking responder. |
| `signals-scout-experiments` | No active experiment surface was found. |
| `signals-scout-feature-flags` | No feature-flag usage was found. |
| `signals-scout-inbox-validation` | Fresh inbox setup has no resolved reports to validate. |
| `signals-scout-insight-alerts` | No insight-alert surface was found. |
| `signals-scout-logs` | No PostHog Logs surface was found. |
| `signals-scout-mcp-tool-calls` | MCP telemetry is not a primary product surface for this app. |
| `signals-scout-observability-gaps` | General and health coverage are sufficient for the current small event surface. |
| `signals-scout-replay-vision` | Newly created scanners have no observation history for cross-scanner trend analysis yet. |
| `signals-scout-revenue-analytics` | No payment or revenue integration was found. |
| `signals-scout-session-replay` | Covered by the Replay Vision scanners below. |
| `signals-scout-skills-store` | No skills-store maintenance surface was found. |
| `signals-scout-surveys` | No survey usage was found. |
| `signals-scout-tasks` | No PostHog Tasks usage was found. |
| `signals-scout-web-vitals` | No active per-page web-vitals baseline was found. |

## Custom scouts

No custom scout was created. A focused resource-link engagement monitor was proposed for the starter page’s Templates, Learning, Documentation, and Deploy Now paths; it was declined. It would have watched for a route going silent or changing engagement share sharply. The enabled product-analytics and web-analytics scouts cover the broader product and traffic surfaces.

If an enabled scout becomes noisy, set `emit: false` on its config in PostHog to switch it to dry-run.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes eligible findings to the inbox. These are the only setup components here that spend Replay Vision quota. Their findings arrive at half weight and require corroboration before promotion into a report.

| Brief | Scanner | Status | Query scope | Sampling | Estimated monthly spend |
|---|---|---|---|---:|---:|
| Breakage monitor | Starter resource link breakage | Created | Recordings on the root starter page, the app’s sole implemented flow where visitors select Templates, Learning, Documentation, or Deploy Now. | 0.5 | 0 credits across 0 observations (no recordings yet). |
| Frustration monitor | Starter link frustration | Created | Recordings containing `$rageclick`, with no URL filter, to isolate observable interaction frustration. | 1.0 | 0 credits across 0 observations (no recordings yet). |

Both scanners emit to the inbox and are enabled. Session Replay is enabled but no recording activity was found during setup, so the scanners are armed and will begin working when recordings start. The organization quota sizing endpoint was unavailable because the authoritative Replay Vision creation skill was not present; the scanners’ own post-create estimates were zero because no recordings exist.

## Files

| File | Change |
|---|---|
| `posthog-self-driving-report.md` | Created this setup report. |

No application source files were modified.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled Support ticket responder can receive tickets.
- [ ] Add a connected-tool responder later if you want Self-driving to process external issues or tickets; selecting one can automatically open draft PRs for records it judges fixable.
- [ ] Review the Self-driving inbox after recording traffic has accumulated and enable additional specialists only for product surfaces you adopt.

## What happens next

The scout coordinator picks up fresh configs within about 30 minutes. Scout runs draw from the project’s daily run budget, findings cluster into reports in the Self-driving inbox, and immediately actionable reports can begin coding tasks.
