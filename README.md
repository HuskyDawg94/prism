# PRISM
### Pattern Recognition and Insight through Systemic Mapping

**PRISM is an open-source AI-powered research literature analysis tool that maps the epistemic structure of a field — not just what has been found, but what is missing, contested, and methodologically broken.**

🔬 Live at **[useprism.net](https://useprism.net)**

---

## The problem

A researcher entering a literature today faces thousands of papers, no systematic way to identify what questions aren't being asked, and no structured method for understanding where and why the field disagrees with itself. Manual literature review is slow, subject to individual blind spots, and produces outputs that are hard to share or reproduce. Most tools help you find papers. None help you understand the shape of what you've found.

## What PRISM does

PRISM retrieves a corpus of up to 200 papers from PubMed, synthesizes them, and runs five structured analysis modules powered by Claude:

| Module | What it does |
|--------|-------------|
| **Absence Mapping** | Identifies what the field is conspicuously *not* studying — underrepresented populations, absent methodological approaches, missing longitudinal questions, ignored cross-disciplinary connections. Each gap rated high / medium / low significance. |
| **Tension Topology** | Maps where and why researchers disagree. Classifies each conflict as empirical, definitional, methodological, or theoretical. Identifies root causes and possible resolutions. |
| **Methodological Critique** | Surfaces systematic problems in how the field does science — underpowered studies, replication failures, confounded variables. Each issue rated critical / moderate / minor with proposed remedies. |
| **Hypothesis Nudges** | Generates directional research suggestions calibrated to your methods, domains, and career stage. Flags which directions are addressable with your lab's actual capabilities. |
| **Field Diagnostic** | Scores the field's epistemic health across six dimensions: Methodological Integrity, Theoretical Consensus, Population Coverage, Longitudinal Depth, Replication Robustness, and Cross-disciplinary Integration. |

All results export as a formatted Word document (.docx).

---

## Demo

> *"I ran PRISM on white matter aging — it identified three population gaps I hadn't considered, classified the DTI vs. NODDI debate as a methodological tension rooted in modeling assumptions, and flagged underpowered cross-sectional designs as a critical systematic problem. It took 12 minutes."*

---

## How it works

```
User enters topic
      ↓
Claude generates targeted PubMed search terms (MeSH-informed)
      ↓
PubMed Entrez API retrieves up to 200 papers with full abstracts
      ↓
Chunked parallel synthesis — groups of 20 papers summarized,
then merged into a master synthesis
      ↓
Five analysis modules run against the synthesis
(three in parallel, hypotheses sequential, field diagnostic last)
      ↓
Results displayed in structured UI + exported as .docx
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite, deployed on Vercel |
| Backend | Express / Node.js, deployed on Render |
| AI | Anthropic API (Claude Sonnet) |
| Literature | PubMed Entrez Utilities |
| Export | docx.js |

---

## Running locally

### Prerequisites
- Node.js 18+
- Anthropic API key
- (Optional) NCBI API key for higher PubMed rate limits

### Frontend

```bash
git clone https://github.com/HuskyDawg94/prism.git
cd prism
npm install
npm run dev
```

### Backend

```bash
cd prism-backend
npm install
```

Create a `.env` file:
```
ANTHROPIC_API_KEY=your_key_here
NCBI_API_KEY=your_key_here  # optional
PORT=3001
```

```bash
node server.js
```

Update `BACKEND` in `src/App.jsx` to point to `http://localhost:3001` for local development.

---

## Project structure

```
prism/
├── src/
│   └── App.jsx          # Full frontend — all UI, state, and API logic
├── public/
├── index.html
└── package.json

prism-backend/
├── server.js            # Express proxy for Anthropic API and PubMed
├── package.json
└── .env                 # Not committed — add your own
```

---

## Researcher profile

PRISM personalizes hypothesis generation to your actual research context. On first use you set your career stage, available methods (DTI, fMRI, EEG, psychometrics, etc.), and research domains. The Hypothesis Nudges module uses this to flag which directions are genuinely addressable with your lab's capabilities rather than just theoretically interesting.

---

## Limitations

- Analysis quality is bounded by abstract content — PRISM reads PubMed abstracts, not full papers. Author-selected abstracts systematically underreport null findings and methodological weaknesses. Full text integration is planned.
- Coverage is limited to PubMed-indexed literature. Preprints, book chapters, and non-indexed journals are not captured.
- Outputs reflect Claude's synthesis of the abstracts provided. Domain expert validation is essential before staking research decisions on any specific output.
- At current API tier, a full 50-paper run with all modules costs approximately $0.70 in Anthropic API fees.

---

## Roadmap

- [ ] Full text integration via PubMed Central (open access papers)
- [ ] Prompt caching to reduce per-run API cost
- [ ] Named session saving
- [ ] Shareable analysis URLs
- [ ] Grant language export (NIH/NSF specific aims framing)
- [ ] Cross-topic comparison
- [ ] Temporal drift analysis (how a field's focus has shifted over decades)
- [ ] arXiv and Semantic Scholar integration

---

## Data and privacy

When you use PRISM, your research topic and retrieved paper abstracts are sent to the following external services:

- **Anthropic API** — processes your query and abstracts to generate search terms and all analysis outputs
- **PubMed, OpenAlex, Semantic Scholar, Europe PMC** — bibliographic databases that return publicly available paper metadata and abstracts

PRISM does not have a backend database. No user data, search queries, or analysis results are stored on PRISM's servers. All session data is stored in your browser's localStorage only.

Your researcher profile (name, institution, methods) is stored locally in your browser and is sent to Anthropic's API only when generating hypothesis nudges. It is not stored anywhere else.

For full details see the [Privacy Policy](https://useprism.net/privacy) and [Terms of Service](https://useprism.net/terms).

## Feedback

PRISM is in active development. If you use it, please take 2 minutes to share your experience — what worked, what didn't, and what you wish it did:

**[→ Give feedback](https://forms.gle/Qe5v4ZgiJPzQJxeW6)**

Feedback directly shapes what gets built next.

## Contributing

PRISM is open source and contributions are welcome. If you find an output that's wrong, a field it handles poorly, or a feature that would make it more useful for your research, open an issue or submit a PR.

For significant changes, open an issue first to discuss what you'd like to change.

---

## Built by

Casey Westring — Undergraduate Researcher, U-CLIMB Lab, University of Utah  
Research focus: cognitive aging, white matter neuroimaging  
[LinkedIn](https://linkedin.com/in/casey-westring-229546261)

Built from inside active neuroimaging research. PRISM exists because the tool I needed didn't.

---

## License

MIT — free to use, modify, and distribute.

---

## Support

PRISM is free and open source. Each full analysis run costs approximately $0.70 in AI API fees paid out of pocket.  
If PRISM saved you time on a literature review, consider [supporting development](https://github.com/sponsors/HuskyDawg94).

---

*PRISM is developed independently and is not affiliated with the University of Utah or Anthropic