# Contributing to PRISM

Thanks for your interest in PRISM. This is a solo-maintained, open-source
project, so please read the expectations below before opening an issue or PR.

## Support and issue response

Issues and feature requests are tracked via [GitHub Issues](https://github.com/HuskyDawg94/prism/issues).
There is no formal SLA or dedicated support staff — the maintainer reviews
and responds to issues as time allows. If you need a fix urgently, a pull
request is the fastest path to getting it merged.

## Reporting bugs

Open an issue with:
- What you were doing (search query, module run, etc.)
- What you expected vs. what happened
- Browser/OS, and console errors if any (open DevTools → Console)
- Whether it reproduces on the hosted app (useprism.net) or only in a local
  dev setup

## Reporting security issues

Do not open a public issue for a security vulnerability (e.g. anything that
could expose API keys, bypass rate limiting, or leak another user's data).
Instead, contact the maintainer directly — see the repository owner's GitHub
profile for contact details.

## Proposing changes

1. Open an issue first for anything beyond a small fix, so we can agree on
   the approach before you invest time.
2. Fork the repo, branch off `main`, and keep PRs focused on one change.
3. For frontend changes (`prism`): `npm install && npm run dev` to run
   locally, `npm run build` and `npm run lint` before submitting.
4. For backend changes (`prism-backend`): `npm install`, set the required
   environment variables (see `README.md`), and `node server.js` to run
   locally. Test against the validation and rate-limiting behavior described
   in `server.js` before submitting.
5. Describe what you changed and why in the PR description.

## Where to contribute

- **Frontend** (`prism`): React/Vite app, all UI and analysis-orchestration
  logic in `src/App.jsx`.
- **Backend** (`prism-backend`, private — request access if you want to
  contribute here): Express proxy that handles the Anthropic API calls,
  rate limiting, and usage tracking.

## Sustainability model

PRISM currently runs on a free daily usage tier funded by the maintainer,
with a bring-your-own-API-key fallback once that tier is exhausted, and an
optional donation link. There is no paid tier. If you're proposing a change
that affects cost (e.g. a new AI-calling feature), please note the expected
cost impact in your PR.
