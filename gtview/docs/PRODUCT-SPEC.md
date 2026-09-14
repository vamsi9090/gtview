# GTview portal — product and implementation specification

## Scope and identity

An independent design concept, visibly identified throughout. No supplied official logo, identity claims, hardware model, or service credentials. Original compass wordmark, vehicle render, and kit render create a distinct GTview-inspired visual language without claiming official status. This is a separate Site and repository from the first GTview guide.

## Sitemap and page specification

| Route | Primary task | UI sections | Completion / next action |
| --- | --- | --- | --- |
| `/` | Understand invitation and start/resume | Concept banner, navigation, invitation badge, welcome placeholder, headline, device/car concept, eligible reward, time, five-phase preview, how it works, setup CTA | Start setup or resume remembered setup route |
| `/before-you-start` | Confirm safety, invitation, vehicle | Six large safety checks; parked concept image; time/tools/weather; invitation and vehicle selectors | All safety checks plus current invitation and approved matching vehicle → Unbox |
| `/unbox` | Identify and confirm every required item | Concept inventory image, three-frame explainer, eight individually selectable cards, quantity/why/missing-item help | Required items and preparation complete → Install; missing item → troubleshooting/support |
| `/install` | Finish nine physical setup steps | Persistent phase stepper, numbered substep navigation, focused title, concept instruction player, up to three instructions, approval field, mistake accordion, confirmation, reset | Prior substeps and prerequisites gate completion; next substep or alignment |
| `/alignment-check` | Manually compare actual device view | Visual guide / photo / before-after tabs, horizon/center/target overlay, unmeasured pitch/roll/yaw, adjustment sequence, four checks, manual result | Confirmed result and all four checks plus installation completion → Connect |
| `/connect-and-test` | Record official tool observations | Manual status ring; seven diagnostic rows; explicit unreviewed/confirmed/attention; retained results; retry review; registration help | Seven manual confirmations and alignment completion → Review |
| `/review` | Correct errors and save a local record | Six linked review cards, five optional photo slots, privacy note, parked attestation, missing-prerequisite messages | All prerequisite gates, attestation, and working local storage → local receipt |
| `/complete` | Understand what remains official | Restrained check animation, local reference/time, not-submitted status, unverified reward, text download, next steps | Official invitation process remains necessary |
| `/safety` | Maintain safe operation | Dos and don’ts with reasons; weather/temperature placeholders; maintenance/removal accordions | Support for any loose/damaged/uncertain device |
| `/troubleshooting` | Resolve a symptom safely | Fourteen symptom cards → meaning → up to three checks → resolved? → setup correction or support | No hardware opening, bypasses, unsafe driving, or electrical modifications |
| `/support` | Prepare a request for official channels | Urgent safety notice; contextual issue state; eight contact/help cards; validated local draft; device/model fields; manual diagnostic summary; optional attachment | Save/download/copy draft; not sent; use invitation contact |
| `/faq` | Find program answers | Sixteen accessible accordions; install/support links; terms placeholder | Approved source placeholders where unknown |
| `/privacy` | Understand data boundaries | Nine policy topics with approval placeholders; exact local preview data behavior | Verified official policy URL pending |
| `/accessibility` | Adapt or understand accessibility | Larger text switch, language placeholder, keyboard/motion/photo/storage explanations | Accessibility request through support draft |

## Primary journey

Invitation → safe parked checklist → invited vehicle confirmation → package inventory → choose approved position → inspect mounting surface → clean and dry → place alignment guide → attach mount → secure camera → route cable → connect power → stability check → compare road alignment → record official connection tests → review → save local confirmation → follow official submission.

The location step identifies the target before physical preparation; attaching happens only after inspection, cleaning, and guide positioning. Power instructions inside installation concern the physical connection; the later connection page records diagnostic outcomes.

## Secondary journeys

- Pause: any guided page → Save and finish later → return to the same browser → Continue installation.
- Correction: review card → specific installation step or alignment/connection page → change confirmation → old local receipt invalidated → new review.
- Missing kit part: card accordion → MISSING symptom → official support draft; installation remains blocked.
- Uncertain view: alignment result “Unsure” → manual review draft; never counts as a pass.
- Failed connection: attention result → symptom checks → retry in official tool → update saved result.
- Vehicle mismatch/expired invitation: preparation selector → contextual support state; no installation gate passes.
- Storage failure: visible error → keep tab open → retry Save or download available record → support.
- Optional photo: choose supported image → validate/decode → IndexedDB commit → show saved preview. On failure, preserve old image and checklist.

## Visual system

| Token | Value / use |
| --- | --- |
| Brand pink | #FF00BF, dark text on bright CTA; never white small text on pink |
| Primary purple | #5A189A, white text controls, links, active steps |
| Violet | #7B2CFF, focus and selected accents |
| Ink | #11111A, invitation hero and primary buttons |
| Surface | #F7F5FA, setup background |
| Card | #FFFFFF |
| Body | #21192E |
| Secondary body | #665D70 |
| Success text | #137346 on pale green |
| Warning text | #864600 (or darker local tone) on pale amber |
| Error text | #AD2631 (or darker local tone) on pale red |
| Font | Inter when installed, Arial/Helvetica/system sans fallback; no blocking external font request |
| Text scale | Body 16px; headings fluid; secondary UI 12–15px; small hero annotation 10px; larger-text preference uses rem |
| Radius | Controls 10–12px; cards 16–20px; CTAs pill |
| Spacing | 4/8/12/16/20/24/32/48/64px rhythm |

Small hero labels are supplemental and never the only location for an essential instruction. The user-facing guide repeats approval limitations in readable body copy. Status always combines icon/text, not color alone.

## Responsive rules

- 320–680px: compact header/menu sheet, invitation stack, compact phase strip, single-column tasks, sticky bottom guided actions, wrapped selectors, readable text and native zoom. Substep controls wrap at the smallest width. Review cards move to one column below 370px.
- 681–950px: compact navigation, narrow phase rail, responsive card grids, installation visuals above instructions when necessary.
- 951px+: wide phase rail; installation visual/instruction columns; controlled maximum widths; three-column informational cards.
- Large text: rem sizing, flexible fields, multiline selects, no fixed-height paragraph containers.
- Mobile resume CTA appears on supporting resources when an incomplete setup exists.

## Motion specification

| Motion | Timing | Purpose | Fallback |
| --- | --- | --- | --- |
| Invitation route | 3 seconds once | Route reaches invitation context | Final static route |
| Invitation card/car | 0.7–1.2 seconds, short delay | Establish invitation and concept device | Fully visible static content |
| Micro-interactions | 180ms | Focus/selection/hover feedback | Instant transition |
| Instruction sequence | 1.7s/frame, 3 frames | Explain task order | Numbered selectable frames and transcript |
| Diagnostic review ring | 2s gentle glow | Shows manual review mode, never a hardware check | Static ring and text |
| Local completion | 600ms | Confirms local checklist | Static checkmark and explicit local label |

All instructional motion is user-initiated, pauses offscreen, and supports replay/pause. Invitation motion pauses when offscreen and has pause/skip controls. Reduced-motion settings remove animation and smooth scrolling. No audio/video, proprietary animations, or simulated physical attachment instructions. Exact hardware animation needs approved references before replacement.

## Component inventory

- Shell: Header, Brand, mobile Sheet navigation, driver local status, Footer, Offline/Storage banners.
- Progress: Stepper built from semantic navigation and Progress primitive; guided route frame.
- Actions: large buttons, context help, save-and-finish-later, back/next, installation restart.
- Forms: CheckRow using Checkbox; Choice using Select; support validation through React Hook Form + Zod; text-size Switch.
- Visuals: responsive vehicle image, concept kit render, MotionPlayer with text transcript, PositionDiagram, RoadView overlay, comparison Tabs.
- Installation: focused step layout, numbered instructions, approval notice, mistake Accordion.
- Diagnostics: manual diagnostic row, explicit state text, review ring, progress bar.
- Media: PhotoCard with type/size/decode validation, IndexedDB persistence, replacement/deletion, failure notices.
- Completion: review cards, attestation, local receipt, downloadable confirmation.
- Resources: symptom decision flow, contact cards, contextual issue states, FAQ/policy accordions, alerts and error boundaries.

## Content ownership

All operational fields and policy content are in `lib/gtview/content.ts`. The implementation does not interpolate untrusted HTML. Text support descriptions and image metadata never enter analytics. Quantity placeholders deliberately avoid promising exact kit contents. The eight-item kit is a conceptual required inventory; replace it with the approved per-device bill of materials and optional-component rules before release.

## State and recovery matrix

| State | Presentation | Next step |
| --- | --- | --- |
| Loading | Saved-progress text; completion restores local record | Wait for local hydration |
| Empty photos | Camera icon, reason, allowed types/size, optional label | Choose a photo or continue without one |
| Completed step | Check icon and text; retained local state | Next step or correct earlier step |
| Invitation expired / ineligible | Selector-specific warning and support context | Program review; gate stays closed |
| Vehicle mismatch / unsupported | Vehicle warning, approved assignment required | Program confirmation |
| Missing hardware | Missing-item help under every card | Packing-list check and support |
| Damaged / loose hardware | Safety notice and symptom flow | Park, stop use, approved safety instructions |
| Interrupted install | Saved progress and remembered substep | Continue installation on same browser |
| Offline | Offline banner; no fabricated queued submission | Keep loaded guide open; reconnect for unloaded routes |
| Camera unavailable/permission | No live camera permission requested | Existing file, file-picker camera when available, or written comparison |
| Invalid / oversized / unreadable image | Adjacent photo error; old photo stays | Choose supported image under 8 MB |
| Photo storage failure | Error with retained previous-image guidance | Free storage, retry, or support |
| Uncertain alignment | Amber text/icon and manual review link | No pass until manually confirmed against official guide |
| Failed registration / duplicate / linked | Selectable official-message support route | Program reassignment review |
| Support unavailable | Channels labeled not configured | Save draft; use invitation’s verified contact |
| Reward under review / unverified | No claim of earned reward | Complete official terms/review |
| Submission pending | Explicitly not submitted; local reference only | Official invitation submission |
| Content unavailable | Bracketed placeholders and content-help state | Request approved manual |
| Unsupported storage/browser | Error with retained-tab/download guidance | Supported storage or support |
| Route error | Recovery page | Retry; previously stored records not intentionally removed |
| Unknown URL | Not-found page | Return to invitation |

## Troubleshooting decision tree

Choose symptom → read meaning → perform at most three safe checks → “Did this solve the problem?”
- Yes → return to affected setup step → verify against official guidance → update manual confirmation.
- No → pause affected step → prepare support draft with FV-[symptom] reference → send through invitation channel.
- Unsafe device symptoms → park and stop use first; no troubleshooting path authorizes unsafe operation.

Symptom codes: POWER, LIGHT, CONNECT, DISCOVERY, ALIGN, MOUNT, LOOSE, CABLE, VIEW, WEB, MISSING, DAMAGE, VEHICLE, REMOVE. These are local support-description labels, not codes issued by a hardware service.

## Analytics plan

The adapter is disabled. An approved implementation may accept only event name, step number, manual/local mode, and enumerated result. Never send names, device IDs, vehicle details, photos, street imagery, support text, precise location, or raw errors.

| Event | Intended trigger | Current behavior |
| --- | --- | --- |
| setup_started | Start setup | No-op adapter |
| safety_checklist_completed | Valid preparation continue | No-op adapter |
| package_item_missing | Missing-item help | No-op adapter |
| installation_step_viewed | Display substep | No-op adapter |
| installation_step_completed | User confirms approved step | No-op adapter |
| animation_replayed | Replay sequence | No-op adapter |
| help_opened | Context help | No-op adapter |
| alignment_passed / failed | Explicit manual observation | No-op; no measured pass claim |
| connectivity_test_passed / failed | Confirmed / attention manual result | No-op; no real test |
| troubleshooting_flow_started | Symptom selected | No-op adapter |
| support_contacted | Real support request accepted | Reserved; never fired for a local draft |
| installation_submitted | Real submission accepted | Reserved; never fired in this concept |
| setup_completed | Local checklist receipt created | No-op, explicitly local mode |
| setup_abandoned | Consented aggregate inactivity measure | Reserved; no unload beacons |

Enable only after privacy, consent, retention, and platform review. Avoid interpreting local/manual events as hardware telemetry or official activation.

## Technical architecture

Next-compatible App Router pages through Vinext → route-specific React client feature → shared Provider → Zod-validated local storage + IndexedDB photo store. Existing Radix/Shadcn primitives cover menu, checkboxes, tabs, selects, progress, accordions, switch, and feedback. Pages split by route; content is CMS-ready TypeScript objects. Worker output is built through the preserved Sites plugin. No D1/R2 bindings are necessary for this explicitly browser-local flow. A server-connected production release must add authenticated APIs, approved ownership checks, retention controls, and real diagnostic adapters.

## Performance and accessibility targets

Target mobile Lighthouse ≥90, LCP <2.5s, CLS <0.1, INP <200ms. These are targets, not measured results. The implementation uses compressed WebP, a smaller hero source for mobile, explicit image aspect ratios, lazy below-fold kit imagery, no external font fetch, no 3D runtime, no autoplay video, and route modules. Hosted access infrastructure and network conditions affect measurement.

Target WCAG 2.2 AA. Includes skip link, landmarks, heading order, field labels/errors, keyboard primitives, focus indication, reduced motion, written sequence frames, status text, and large primary touch targets. Full WCAG, screen reader, zoom, bright-outdoor, and browser audits remain required before release. See validation notes for what was actually checked.
