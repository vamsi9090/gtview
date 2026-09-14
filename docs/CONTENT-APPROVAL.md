# Production content approval checklist

Status: NOT APPROVED FOR DRIVER RELEASE. This is an independent concept with local interactions. Do not treat checkbox completion as official hardware readiness.

| Reviewer | Required approval |
| --- | --- |
| GTview Operations | Program identity/authorization; invitations; selection and eligibility; expiry handling; assigned vehicle process; setup duration; driver/fleet ownership; real submission status and reference; onboarding copy |
| Hardware Engineering | Exact device/model; per-device package contents and quantities; optional parts; vehicle-specific mounting location/diagrams; flatness and damage rules; surface and device temperatures; cleaning/drying method; pressure/duration; adhesive cure; orientation/lock indicator; cable route/clips; approved power; indicator meanings; alignment tolerance; official telemetry; stability test; original visual replacements |
| Safety | Safe parking and power state; no unsafe driving; all obstruction zones; painted-surface permission; cable hazards; loose/damaged/overheating/smoking escalation; weather limits; emergency wording; inspection and removal instructions |
| Legal | Independent/official branding status; program terms; incentive and reward eligibility; no unsupported guarantee; technical liability copy; approved terms URL |
| Privacy | Exact imagery and audio scope/exclusions; collection conditions; transfer/security/access; retention/deletion; face and plate treatment; driver controls; privacy contact; photo consent/metadata/retention; analytics/consent; approved policy URL |
| Accessibility | WCAG 2.2 AA audit; keyboard and screen-reader checks; 320px and 200–400% zoom; bright outdoor testing; language translations; larger text; motion/transcript alternatives; non-visual installation assistance |
| Support | Verified chat URL, phone, email, hours, response times; issue code mapping; ticket/replacement/lost/stolen/safety routes; account reassignment escalation; accessible support formats; diagnostics and attachment requirements |
| Engineering / Security | Authenticated invitation and vehicle/device ownership; server validation; submission idempotency; photo consent/scanning/metadata policy; durable storage and deletion; API failure/timeout states; offline queue policy; analytics adapter; error reporting without PII |

## Required placeholder replacements

[Driver first name], [Eligible reward], [Approved installation time], [Approved required tools], [Approved weather requirements], [Device operating temperature], [Approved mounting location], [Approved vehicle-specific mounting rules], [Approved cleaning method], [Approved drying time], [Approved attachment method], [Approved attachment force], [Approved duration], [Adhesive curing time], [Approved front and rear indicators], [Approved locking mechanism], [Approved locking click or visual indicator], [Approved vehicle-specific cable route], [Approved power source], [Approved connector orientation], [Expected indicator behavior], [Required alignment tolerance], [Approved stability-check procedure], [Approved quantity], [Approved optional components], [Approved inspection interval], [Approved lens and device cleaning procedure], [Approved removal and return instructions], [Support URL], [Support phone number], [Support email], [Support hours], [Expected response time], [Privacy policy URL], [Terms and conditions URL], [Reward eligibility requirements], [Approved language options], and all FAQ/privacy policy entries.

## Release gates

- [ ] Every placeholder has an approved owner, source, version, and review date.
- [ ] Device-specific visuals accurately demonstrate the approved real hardware; concept labels are replaced only after approval.
- [ ] All real integrations return verified status; local/manual records cannot activate a device or grant reward eligibility.
- [ ] Real submission and support flows are reviewed, authenticated, idempotent, and explicit about success/failure.
- [ ] Photos have approved collection scope, consent, retention, metadata, and deletion policies.
- [ ] Accessibility, representative-device usability, performance, and security gates pass.
- [ ] Operations and Support sign off before any driver-facing rollout.
