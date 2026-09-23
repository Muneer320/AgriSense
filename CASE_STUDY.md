# AgriSense — field records with evidence boundaries

AgriSense is Team Underdawgs' agriculture decision-support prototype. It connects a farmer's field, crop season and observations to planning/readiness screens, retaining reasons for missing measurements and requiring confirmation before proposed changes become records.

This personal fork preserves the team's history and presents Muneer Alam's contributions alongside a repeatable synthetic demonstration. It is a team project; the source does not support claiming sole ownership or attributing every backend/science module to one person.

## My contribution, with repository evidence

| Area | Concrete work | Original evidence |
| --- | --- | --- |
| Farmer experience | Field dashboard, account-scoped field selection, location search and progressive onboarding/API integration | [`8a55056`](https://github.com/Muneer320/AgriSense/commit/8a55056), [`959e684`](https://github.com/Muneer320/AgriSense/commit/959e684), [`0c93196`](https://github.com/Muneer320/AgriSense/commit/0c93196) |
| Authentication | Phone-code interface, Firebase errors and web/WhatsApp integration; email access compatibility | [`98cb0a7`](https://github.com/Muneer320/AgriSense/commit/98cb0a7), [`79afa7a`](https://github.com/Muneer320/AgriSense/commit/79afa7a) |
| Conversational workflow | Ask screen, journal/plan integration, text/media commands, proposals and confirmations | [`64abedd`](https://github.com/Muneer320/AgriSense/commit/64abedd), [`afffd17`](https://github.com/Muneer320/AgriSense/commit/afffd17), [`1a3e989`](https://github.com/Muneer320/AgriSense/commit/1a3e989), [`09b72b7`](https://github.com/Muneer320/AgriSense/commit/09b72b7) |
| Delivery and season records | Scheduled outbox draining, reminder/season-close flows and CI support | [`294980d`](https://github.com/Muneer320/AgriSense/commit/294980d), [`36b0420`](https://github.com/Muneer320/AgriSense/commit/36b0420), [`44e9160`](https://github.com/Muneer320/AgriSense/commit/44e9160) |
| Presentation | Landing-page redesign and brand assets | [`a1e8906`](https://github.com/Muneer320/AgriSense/commit/a1e8906), [`a687e98`](https://github.com/Muneer320/AgriSense/commit/a687e98) |

These references establish areas of contribution, not exclusive authorship. Akasha Prasad, Anoushka Wayangankar, Jaideep and Hina retain their team credits and original identities. Scientific references are shared work requiring domain expertise.

## Design choices that matter

**Unknown is a state.** Missing soil observations, unreviewed references and unavailable weather carry missing reasons rather than zeros or confident advice. Refusal is useful product behavior, even though it means a local demo cannot display every agronomic answer.

**A crop belongs to a season on a particular field.** Journal queries/API caches include actor, field and season identity. Idempotency keys protect retries; version checks expose conflicting edits rather than silently overwriting records.

**A transcription needs a person.** Soil extraction produces an editable draft. The farmer confirms readings; illegible values remain unknown. This fork connects the existing component to onboarding instead of duplicating extraction.

**A queued message is not a delivered one.** The outbox and worker exist, but delivery needs real Meta configuration and approved templates. The local demo keeps outbox mode and makes no live-delivery claim.

## What the maintenance pass establishes

The fork repairs Windows contract generation, removes orphan localization, extends core labels, upgrades the web dependencies and adds credential-free Compose with real Auth Emulator verification/PostgreSQL persistence. Browser checks exercise field creation, journal media, reloads, ownership denial and responsive layouts. [Cleanup progress](workstreams/cleanup/progress.md) records the verification.

Production dependency audit is clear at this checkpoint; [DEVELOPMENT.md](docs/DEVELOPMENT.md) records development lint/advisory debt. These checks verify prototype software, not agricultural outcomes or farmer adoption.

## External work

- Reviewed agronomic parameters, label evidence and field validation before operational advice.
- A configured model for actual OCR/assistant calls, and live forecast/provider verification.
- Meta approval/configuration before outbound WhatsApp; its conversation language defaults to English.
- Human terminology review and fuller translation of explanatory/journal/agronomist text.
- An agreed deployment, operational security review and farmer-facing privacy policy before collecting real records.
- Real labeled outcomes and reviewed training/evaluation before promoting a learned model.

No cloud deployment, model promotion, live messaging or change to upstream ownership is implied. [Run the synthetic local demo](docs/LOCAL_DEMO.md).
