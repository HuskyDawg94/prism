import { useState, useEffect } from 'react'
import '@fontsource/dm-mono'
import { Analytics } from '@vercel/analytics/react'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'

const COLORS = {
  bg: '#080c0f',
  surface: '#0d1318',
  surface2: '#121920',
  border: 'rgba(255,255,255,0.06)',
  border2: 'rgba(255,255,255,0.12)',
  text: '#e8eaed',
  muted: '#6b7785',
  accent: '#4af2a1',
  red: '#ff5f5f',
  amber: '#f5a623',
  blue: '#5b9cf6',
  purple: '#a78bfa',
}

const styles = {
  app: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gridTemplateRows: '52px 1fr',
    height: '100vh',
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: '"DM Mono", monospace',
    fontSize: '13px',
    overflow: 'hidden',
  },
  topbar: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    borderBottom: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    gap: '16px',
  },
  logo: {
    fontFamily: '"Times New Roman", serif',
    fontSize: '20px',
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: '0.1em',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  searchBar: {
    flex: 1,
    maxWidth: '440px',
    display: 'flex',
    alignItems: 'center',
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border2}`,
    borderRadius: '6px',
    padding: '0 12px',
    gap: '8px',
    height: '32px',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: COLORS.text,
    fontFamily: '"DM Mono", monospace',
    fontSize: '12px',
    flex: 1,
    width: '100%',
  },
  pill: (active) => ({
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '20px',
    border: `1px solid ${active ? COLORS.accent : COLORS.border2}`,
    color: active ? COLORS.accent : COLORS.muted,
    background: active ? 'rgba(74,242,161,0.06)' : 'transparent',
    flexShrink: 0,
  }),
  sidebar: {
    borderRight: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    overflowY: 'auto',
    padding: '16px 0',
  },
  sidebarLabel: {
    fontSize: '9px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: COLORS.muted,
    padding: '0 16px',
    marginBottom: '6px',
    marginTop: '16px',
  },
  sidebarItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 16px',
    cursor: 'pointer',
    fontSize: '12px',
    color: active ? COLORS.accent : COLORS.muted,
    background: active ? 'rgba(74,242,161,0.06)' : 'transparent',
    borderRight: active ? `2px solid ${COLORS.accent}` : '2px solid transparent',
    transition: 'all 0.15s',
  }),
  dot: (color) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  badge: {
    marginLeft: 'auto',
    fontSize: '10px',
    background: 'rgba(255,255,255,0.08)',
    padding: '1px 6px',
    borderRadius: '10px',
    color: COLORS.muted,
  },
  main: {
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '8px',
    padding: '16px 18px',
  },
  sectionTitle: {
    fontFamily: '"Times New Roman", serif',
    fontSize: '15px',
    color: COLORS.text,
    marginBottom: '4px',
  },
  sectionSub: {
    fontSize: '11px',
    color: COLORS.muted,
    marginBottom: '14px',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  statCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '8px',
    padding: '12px 14px',
  },
  statLabel: {
    fontSize: '10px',
    color: COLORS.muted,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  statValue: (color) => ({
    fontFamily: '"Times New Roman", serif',
    fontSize: '28px',
    color: color || COLORS.text,
    lineHeight: 1,
  }),
  statSub: {
    fontSize: '10px',
    color: COLORS.muted,
    marginTop: '4px',
  },
  tensionCard: (color) => ({
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '10px',
  }),
  typeTag: (color) => ({
    fontSize: '9px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: color,
    marginBottom: '4px',
  }),
  absenceItem: (color) => ({
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '10px',
    display: 'flex',
    gap: '12px',
  }),
  sigBadge: (color) => ({
    fontSize: '9px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 7px',
    borderRadius: '4px',
    flexShrink: 0,
    marginTop: '2px',
    background: `${color}18`,
    color: color,
  }),
  hypothesisCard: (addressable) => ({
    background: addressable ? 'rgba(74,242,161,0.03)' : COLORS.surface,
    border: `1px solid ${addressable ? 'rgba(74,242,161,0.2)' : COLORS.border}`,
    borderLeft: `3px solid ${addressable ? COLORS.accent : COLORS.muted}`,
    borderRadius: '8px',
    padding: '14px 16px',
    marginBottom: '10px',
  }),
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '10px',
  },
  tag: {
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.border2}`,
    color: COLORS.muted,
  },
  input: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border2}`,
    borderRadius: '6px',
    padding: '8px 12px',
    color: COLORS.text,
    fontFamily: '"DM Mono", monospace',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  },
  select: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border2}`,
    borderRadius: '6px',
    padding: '8px 12px',
    color: COLORS.text,
    fontFamily: '"DM Mono", monospace',
    fontSize: '13px',
    outline: 'none',
  },
  btn: (variant) => ({
    padding: '8px 16px',
    borderRadius: '6px',
    border: `1px solid ${variant === 'primary' ? COLORS.accent : variant === 'danger' ? COLORS.red : COLORS.border2}`,
    background: variant === 'primary' ? 'rgba(74,242,161,0.1)' : variant === 'danger' ? 'rgba(255,95,95,0.1)' : 'transparent',
    color: variant === 'primary' ? COLORS.accent : variant === 'danger' ? COLORS.red : COLORS.muted,
    fontFamily: '"DM Mono", monospace',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  toggleBtn: (active) => ({
    padding: '4px 10px',
    borderRadius: '4px',
    border: `1px solid ${active ? COLORS.accent : COLORS.border2}`,
    background: active ? 'rgba(74,242,161,0.1)' : 'transparent',
    color: active ? COLORS.accent : COLORS.muted,
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: '"DM Mono", monospace',
    transition: 'all 0.15s',
  }),
  processLog: {
    background: COLORS.bg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '6px',
    padding: '12px 14px',
    fontSize: '11px',
    color: COLORS.muted,
    lineHeight: 2,
  },
  onboardingWrap: {
    maxWidth: '580px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  label: {
    fontSize: '11px',
    color: COLORS.muted,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
    marginTop: '20px',
  },
}

const tensionColors = {
  empirical: COLORS.red,
  definitional: COLORS.amber,
  methodological: COLORS.blue,
  theoretical: COLORS.purple,
}

const significanceColors = {
  high: COLORS.red,
  medium: COLORS.amber,
  low: COLORS.accent,
}

const severityColors = {
  critical: COLORS.red,
  moderate: COLORS.amber,
  minor: COLORS.accent,
}

const confidenceColors = {
  high: COLORS.accent,
  medium: COLORS.amber,
  low: COLORS.red,
}

const methodOptions = [
  'Diffusion MRI / DTI', 'Structural MRI / VBM', 'Functional MRI',
  'EEG / ERP', 'Psychometrics / surveys', 'Cognitive behavioral measures',
  'Genetics / genomics', 'Animal models', 'Clinical trials',
  'Computational modeling', 'Meta-analysis', 'Qualitative methods',
]

const domainOptions = [
  'Cognitive aging', 'Memory & learning', 'Neuropsychiatric disorders',
  'Mood & affective neuroscience', 'OCD / repetitive cognition',
  "Alzheimer's / dementia", 'White matter / connectivity',
  'Brain structure & morphology', 'Developmental neuroscience',
  'Clinical psychology', 'Computational psychiatry', 'Psychopharmacology',
]

function PrismLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polygon points="11,2 20,18 2,18" stroke="#4af2a1" strokeWidth="1.5" fill="none" />
      <line x1="11" y1="2" x2="11" y2="18" stroke="#4af2a1" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="11" y1="10" x2="20" y2="18" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.5" />
      <line x1="11" y1="10" x2="2" y2="18" stroke="#a78bfa" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

const BACKEND = 'https://prism-backend-8ac5.onrender.com'

export default function App() {
  const [stage, setStage] = useState(() => {
    const savedPapers = localStorage.getItem('prism_papers')
    if (savedPapers && JSON.parse(savedPapers).length > 0) return 'results'
    return 'onboarding'
  })
  const [activePanel, setActivePanel] = useState('overview')
  const [query, setQuery] = useState(() => localStorage.getItem('prism_query') || '')
  const [proposedTerms, setProposedTerms] = useState(() => {
    const saved = localStorage.getItem('prism_terms')
    return saved ? JSON.parse(saved) : []
  })
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem('prism_papers')
    return saved ? JSON.parse(saved) : []
  })
  const [analysis, setAnalysis] = useState(() => {
    const saved = localStorage.getItem('prism_analysis')
    return saved ? JSON.parse(saved) : {}
  })
  const [summary, setSummary] = useState(() => localStorage.getItem('prism_summary') || '')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [paperCount, setPaperCount] = useState(50)
  const [processLog, setProcessLog] = useState([])
  const [researcherProfile, setResearcherProfile] = useState(() => {
    const saved = localStorage.getItem('prism_profile')
    return saved ? JSON.parse(saved) : {
      name: '',
      institution: '',
      careerStage: 'undergraduate',
      methods: [],
      domains: [],
      customMethods: '',
      customDomains: '',
    }
  })

  useEffect(() => { localStorage.setItem('prism_query', query) }, [query])
  useEffect(() => { localStorage.setItem('prism_terms', JSON.stringify(proposedTerms)) }, [proposedTerms])
  useEffect(() => { localStorage.setItem('prism_papers', JSON.stringify(papers)) }, [papers])
  useEffect(() => { localStorage.setItem('prism_analysis', JSON.stringify(analysis)) }, [analysis])
  useEffect(() => { localStorage.setItem('prism_summary', summary) }, [summary])
  useEffect(() => { localStorage.setItem('prism_profile', JSON.stringify(researcherProfile)) }, [researcherProfile])

  function clearSession() {
    localStorage.clear()
    setQuery('')
    setProposedTerms([])
    setPapers([])
    setAnalysis({})
    setSummary('')
    setProcessLog([])
    setStage('input')
  }

  function log(msg) {
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setProcessLog((prev) => [...prev, { time, msg }])
  }

  function toggleMethod(m) {
    setResearcherProfile((p) => ({
      ...p,
      methods: p.methods.includes(m) ? p.methods.filter((x) => x !== m) : [...p.methods, m],
    }))
  }

  function toggleDomain(d) {
    setResearcherProfile((p) => ({
      ...p,
      domains: p.domains.includes(d) ? p.domains.filter((x) => x !== d) : [...p.domains, d],
    }))
  }

  function buildProfileString() {
    const methods = [
      ...researcherProfile.methods,
      ...(researcherProfile.customMethods ? researcherProfile.customMethods.split(',').map((s) => s.trim()) : []),
    ].join(', ')
    const domains = [
      ...researcherProfile.domains,
      ...(researcherProfile.customDomains ? researcherProfile.customDomains.split(',').map((s) => s.trim()) : []),
    ].join(', ')
    return { methods, domains }
  }

  async function callClaude(prompt, maxTokens = 2000) {
    const response = await fetch(`${BACKEND}/api/claude`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.content[0].text
  }

  async function generateTerms() {
    setStage('approve')
    setProposedTerms(['Generating search terms...'])
    log('Generating search terms via Claude...')
    const text = await callClaude(
      `You are helping a neuroscience researcher search PubMed. Generate 6 specific, high-quality PubMed search terms for the following research topic: "${query}". Rules: each term should be a distinct angle on the topic, use MeSH terms and field-specific language where appropriate, vary specificity. Return ONLY a JSON array of strings, nothing else.`
    )
    const cleaned = text.replace(/```json|```/g, '').trim()
    const terms = JSON.parse(cleaned)
    setProposedTerms(terms)
    log(`Generated ${terms.length} search terms`)
  }

  function updateTerm(i, v) {
    const u = [...proposedTerms]
    u[i] = v
    setProposedTerms(u)
  }

  function removeTerm(i) {
    setProposedTerms(proposedTerms.filter((_, idx) => idx !== i))
  }

  async function fetchFullText(paper) {
    // Try PMC full text first if pmcid exists
    if (paper.pmcid) {
      try {
        const res = await fetch(
          `${BACKEND}/api/pubmed/efetch.fcgi?db=pmc&id=${paper.pmcid}&retmode=xml&rettype=full`
        )
        const xml = await res.text()
        // Extract all body text sections from PMC XML
        const sections = []
        const sectionRegex = /<sec[^>]*>([\s\S]*?)<\/sec>/gi
        let secMatch
        while ((secMatch = sectionRegex.exec(xml)) !== null) {
          // Strip XML tags from section content
          const text = secMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          if (text.length > 100) sections.push(text)
        }
        if (sections.length > 0) {
          const fullText = sections.join('\n\n').slice(0, 1500)
          return { ...paper, fullText, textSource: 'full' }
        }
        // Fallback: extract abstract from PMC XML
        const abstractMatch = xml.match(/<abstract[^>]*>([\s\S]*?)<\/abstract>/i)
        if (abstractMatch) {
          const abstract = abstractMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          return { ...paper, fullText: abstract, textSource: 'abstract' }
        }
      } catch {
        // fall through to PubMed abstract
      }
    }
    return null
  }

  async function fetchAbstracts(paperList) {
    const result = []
    const batchSize = 10
    const batches = []
    for (let i = 0; i < paperList.length; i += batchSize) {
      batches.push(paperList.slice(i, i + batchSize))
    }

    for (const batch of batches) {
      // First attempt full text for papers with PMC IDs
      const pmcPapers = batch.filter((p) => p.pmcid)
      const nonPmcPapers = batch.filter((p) => !p.pmcid)
      const pmcResults = {}

      if (pmcPapers.length > 0) {
        await Promise.all(
          pmcPapers.map(async (paper) => {
            const r = await fetchFullText(paper)
            if (r) pmcResults[paper.id] = r
          })
        )
      }

      // Fetch abstracts for non-PMC papers and PMC papers that failed full text
      const needsAbstract = batch.filter((p) => !pmcResults[p.id])
      if (needsAbstract.length > 0) {
        try {
          const ids = needsAbstract.map((p) => p.id).join(',')
          const res = await fetch(
            `${BACKEND}/api/pubmed/efetch.fcgi?db=pubmed&id=${ids}&retmode=xml&rettype=abstract`
          )
          const xml = await res.text()
          needsAbstract.forEach((paper) => {
            const paperRegex = new RegExp(
              `<PubmedArticle>[\\s\\S]*?<PMID[^>]*>${paper.id}</PMID>[\\s\\S]*?<AbstractText[^>]*>([\\s\\S]*?)<\\/AbstractText>`,
              'i'
            )
            const match = xml.match(paperRegex)
            if (match) {
              result.push({ ...paper, fullText: match[1], textSource: 'abstract' })
            } else {
              const simpleMatch = xml.match(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/)
              result.push({ ...paper, fullText: simpleMatch ? simpleMatch[1] : 'No text available', textSource: 'abstract' })
            }
          })
        } catch {
          needsAbstract.forEach((paper) => result.push({ ...paper, fullText: 'No text available', textSource: 'abstract' }))
        }
      }

      // Add PMC full text results
      Object.values(pmcResults).forEach((r) => result.push(r))
      await new Promise((r) => setTimeout(r, 150))
    }

    // Restore original order
    const ordered = paperList.map((p) => result.find((r) => r.id === p.id) || { ...p, fullText: 'No text available', textSource: 'abstract' })
    return ordered
  }

  async function buildSummary(paperList) {
    const chunkSize = 10
    const chunks = []
    for (let i = 0; i < paperList.length; i += chunkSize) {
      chunks.push(paperList.slice(i, i + chunkSize))
    }

    log(`Building synthesis across ${chunks.length} chunk(s) of papers...`)

    // Synthesize each chunk sequentially to avoid rate limits
    const chunkSummaries = []
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      log(`Synthesizing chunk ${i + 1} of ${chunks.length}...`)
      setLoadingMessage(`Synthesizing papers ${i * chunkSize + 1}–${Math.min((i + 1) * chunkSize, paperList.length)} of ${paperList.length}...`)
      const corpus = chunk
        .map((p) => {
          const textLabel = p.textSource === 'full' ? 'Full text (excerpted)' : 'Abstract'
          return `Title: ${p.title}\nAuthors: ${p.authors || 'Unknown'}\nYear: ${p.year || 'Unknown'}\nJournal: ${p.source || 'Unknown'}\n${textLabel}: ${p.fullText || 'No text available'}`
        })
        .join('\n\n---\n\n')
      const chunkResult = await callClaude(
        `You are synthesizing part ${i + 1} of ${chunks.length} of a research corpus on "${query}". Summarize the key findings, claims, methods, and debates across these ${chunk.length} papers in 600-900 words. Be specific — note sample sizes, effect sizes, populations, and methodological details where present. Return plain text only.\n\nPAPERS:\n${corpus}`,
        3000
      )
      chunkSummaries.push(chunkResult)
      if (i < chunks.length - 1) await new Promise((r) => setTimeout(r, 4000))
    }

    let finalSummary
    if (chunks.length === 1) {
      finalSummary = chunkSummaries[0]
    } else {
      // Merge chunk summaries into a master synthesis
      log('Merging chunk syntheses into master synthesis...')
      const mergeInput = chunkSummaries
        .map((s, i) => `CHUNK ${i + 1}:\n${s}`)
        .join('\n\n===\n\n')
      finalSummary = await callClaude(
        `You are synthesizing ${chunks.length} partial literature summaries covering ${paperList.length} total papers on "${query}" into a single comprehensive master synthesis. Integrate all chunks into a unified 2000-4000 word synthesis that captures: (1) the major empirical findings and where they agree or conflict, (2) the dominant methodological approaches and their limitations, (3) theoretical frameworks and debates, (4) population and contextual gaps, (5) the most contested or unresolved questions. Be specific and analytical. Return plain text only.\n\n${mergeInput}`,
        6000
      )
    }

    setSummary(finalSummary)
    const fullCount = paperList.filter((p) => p.textSource === 'full').length
    const abstractCount = paperList.filter((p) => p.textSource === 'abstract').length
    log(`Synthesis complete — ${fullCount} full text, ${abstractCount} abstract-only`)
    return finalSummary
  }

  async function getOrBuildSummary() {
    if (summary) return summary
    log('Condensing corpus...')
    return await buildSummary(papers)
  }

  async function runSearch() {
    setLoading(true)
    setStage('results')
    setActivePanel('overview')
    setLoadingMessage('Searching PubMed...')
    setSummary('')
    setAnalysis({})
    setProcessLog([])
    localStorage.removeItem('prism_papers')
    localStorage.removeItem('prism_analysis')
    localStorage.removeItem('prism_summary')
    log(`Searching PubMed across ${proposedTerms.length} terms...`)

    const perTerm = Math.ceil(paperCount / proposedTerms.length * 1.5)

    const termResults = await Promise.all(
      proposedTerms.map(async (term, index) => {
        await new Promise((r) => setTimeout(r, index * 150))
        try {
          const searchRes = await fetch(
            `${BACKEND}/api/pubmed/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${perTerm}&retmode=json`
          )
          const searchData = await searchRes.json()
          const ids = searchData.esearchresult.idlist
          if (!ids.length) return []
          await new Promise((r) => setTimeout(r, 300))
          const detailRes = await fetch(
            `${BACKEND}/api/pubmed/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`
          )
          const detailData = await detailRes.json()
          if (!detailData.result) return []
          return ids
            .filter((id) => detailData.result[id]?.title)
            .map((id) => {
              const paper = detailData.result[id]
              const pmcEntry = paper.articleids?.find((a) => a.idtype === 'pmc')
              return {
                id,
                title: paper.title,
                authors: paper.authors?.map((a) => a.name).join(', '),
                year: paper.pubdate?.split(' ')[0],
                source: paper.source,
                searchTerm: term,
                pmcid: pmcEntry ? pmcEntry.value.replace('PMC', '') : null,
              }
            })
        } catch {
          return []
        }
      })
    )

    const seen = new Set()
    const allPapers = []
    for (const batch of termResults) {
      for (const paper of batch) {
        if (!seen.has(paper.id)) {
          seen.add(paper.id)
          allPapers.push(paper)
        }
      }
    }
    allPapers.splice(paperCount)

    log(`Found ${allPapers.length} unique papers`)
    setLoadingMessage('Fetching full text and abstracts...')
    log('Fetching full text where available, abstracts otherwise...')
    const withText = await fetchAbstracts(allPapers)
    setPapers(withText)
    const fullCount = withText.filter((p) => p.textSource === 'full').length
    log(`Text retrieval complete — ${fullCount}/${withText.length} with full text`)
    setLoading(false)
    log('Building corpus synthesis in background...')
    buildSummary(withText)
  }

  async function runModule(moduleKey, promptFn, parseKey, successMsg) {
    setLoading(true)
    setLoadingMessage(successMsg)
    log(successMsg)
    const syn = await getOrBuildSummary()
    const text = await callClaude(promptFn(syn), 4000)
    const cleaned = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(cleaned)
    setAnalysis((prev) => ({ ...prev, [moduleKey]: result[parseKey] }))
    log(`${successMsg} complete`)
    setLoading(false)
    setActivePanel(moduleKey)
  }

  async function runAbsenceMapping() {
    await runModule(
      'absenceMapping',
      (syn) => `You are a rigorous neuroscience research analyst. Based on this synthesis of ${papers.length} papers on "${query}", perform absence mapping. Identify what is conspicuously NOT being studied. Look for underrepresented populations, absent methodological approaches, ignored theoretical angles, missing longitudinal questions, and cross-disciplinary connections nobody is making. Return ONLY this JSON, no markdown:\n{"absences":[{"category":"string","description":"string","significance":"high|medium|low"}]}\n\nSYNTHESIS:\n${syn}`,
      'absences',
      'Running absence mapping...'
    )
  }

  async function runTensionTopology() {
    await runModule(
      'tensionTopology',
      (syn) => `You are a rigorous neuroscience research analyst. Based on this synthesis of the literature on "${query}", identify where and WHY researchers disagree. Classify each tension as empirical, definitional, methodological, or theoretical. Return ONLY this JSON, no markdown:\n{"tensions":[{"title":"string","description":"string","rootCause":"string","type":"empirical|definitional|methodological|theoretical","resolution":"string"}]}\n\nSYNTHESIS:\n${syn}`,
      'tensions',
      'Mapping tensions...'
    )
  }

  async function runMethodologicalCritique() {
    await runModule(
      'methodologicalCritique',
      (syn) => `You are a rigorous methodologist reviewing the literature on "${query}". Based on this synthesis of ${papers.length} papers, identify systematic methodological problems. Rate severity as critical, moderate, or minor. Return ONLY this JSON, no markdown:\n{"critiques":[{"issue":"string","description":"string","severity":"critical|moderate|minor","affected":"string","remedy":"string"}]}\n\nSYNTHESIS:\n${syn}`,
      'critiques',
      'Running methodological critique...'
    )
  }

  async function runHypothesisGeneration() {
    const { methods, domains } = buildProfileString()
    const priorAnalysis = [
      analysis.absenceMapping ? `ABSENCES:\n${analysis.absenceMapping.map((a) => `- ${a.category}: ${a.description}`).join('\n')}` : '',
      analysis.tensionTopology ? `TENSIONS:\n${analysis.tensionTopology.map((t) => `- ${t.title}: ${t.rootCause}`).join('\n')}` : '',
      analysis.methodologicalCritique ? `CRITIQUES:\n${analysis.methodologicalCritique.map((c) => `- ${c.issue}: ${c.description}`).join('\n')}` : '',
    ].filter(Boolean).join('\n\n')

    await runModule(
      'hypotheses',
      (syn) => `You are a creative but rigorous neuroscience research analyst. Generate hypothesis nudges for a ${researcherProfile.careerStage} researcher studying "${query}" with methods: ${methods} and domains: ${domains}. Nudge toward directions, don't over-specify. Only flag lab-addressable if methods genuinely fit. Return ONLY this JSON, no markdown:\n{"hypotheses":[{"nudge":"string","rationale":"string","labAddressable":true,"methods":["string"],"confidence":"high|medium|low","tags":["string"]}]}\n\nSYNTHESIS:\n${syn}\n\nPRIOR ANALYSIS:\n${priorAnalysis}`,
      'hypotheses',
      'Generating hypotheses...'
    )
  }

  async function runFieldDiagnostic() {
    setLoading(true)
    setLoadingMessage('Running field diagnostic...')
    log('Running field diagnostic...')
    const syn = await getOrBuildSummary()

    const priorAnalysis = [
      analysis.absenceMapping ? `ABSENCES:\n${analysis.absenceMapping.map((a) => `- ${a.category}: ${a.description}`).join('\n')}` : '',
      analysis.tensionTopology ? `TENSIONS:\n${analysis.tensionTopology.map((t) => `- ${t.title}: ${t.rootCause}`).join('\n')}` : '',
      analysis.methodologicalCritique ? `CRITIQUES:\n${analysis.methodologicalCritique.map((c) => `- ${c.issue}: ${c.description}`).join('\n')}` : '',
      analysis.hypotheses ? `HYPOTHESES:\n${analysis.hypotheses.map((h) => `- ${h.nudge}`).join('\n')}` : '',
    ].filter(Boolean).join('\n\n')

    const text = await callClaude(`You are a rigorous research epistemologist. Based on the literature synthesis and prior analysis of ${papers.length} papers on "${query}", generate a Field Diagnostic — a structured assessment of the epistemic health of this research field.

Score each dimension from 1-10 where 1 is severely broken and 10 is exemplary. Be honest and critical. Do not inflate scores.

Return ONLY this JSON, no markdown:
{
  "dimensions": [
    {
      "name": "Methodological Integrity",
      "score": 4,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Theoretical Consensus",
      "score": 6,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Population Coverage",
      "score": 3,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Longitudinal Depth",
      "score": 2,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Replication Robustness",
      "score": 3,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Cross-disciplinary Integration",
      "score": 4,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    }
  ],
  "overallScore": 3.7,
  "overallVerdict": "2-3 sentence plain language summary of the field epistemic health",
  "opportunity": "2-3 sentences on where the real research opportunities are given these gaps"
}

LITERATURE SYNTHESIS:
${syn}

PRIOR ANALYSIS:
${priorAnalysis}`, 4000)

    const cleaned = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(cleaned)
    setAnalysis((prev) => ({ ...prev, fieldDiagnostic: result }))
    log('Field diagnostic complete')
    setLoading(false)
    setActivePanel('fieldDiagnostic')
  }

  async function runAllModules() {
    setLoading(true)

    // Step 1: Build corpus summary if not cached
    setLoadingMessage('Building corpus summary...')
    log('Run All: building corpus summary...')
    const syn = await getOrBuildSummary()

    // Step 2: Absence mapping, tension topology, methodological critique in parallel
    setLoadingMessage('Running absence mapping, tension topology, method critique...')
    log('Run All: running parallel modules...')
    const [absences, tensions, critiques] = await Promise.all([
      callClaude(
        `You are a rigorous neuroscience research analyst. Based on this synthesis of ${papers.length} papers on "${query}", perform absence mapping. Identify what is conspicuously NOT being studied. Look for underrepresented populations, absent methodological approaches, ignored theoretical angles, missing longitudinal questions, and cross-disciplinary connections nobody is making. Return ONLY this JSON, no markdown:\n{"absences":[{"category":"string","description":"string","significance":"high|medium|low"}]}\n\nSYNTHESIS:\n${syn}`
      ).then((text) => JSON.parse(text.replace(/```json|```/g, '').trim()).absences),
      callClaude(
        `You are a rigorous neuroscience research analyst. Based on this synthesis of the literature on "${query}", identify where and WHY researchers disagree. Classify each tension as empirical, definitional, methodological, or theoretical. Return ONLY this JSON, no markdown:\n{"tensions":[{"title":"string","description":"string","rootCause":"string","type":"empirical|definitional|methodological|theoretical","resolution":"string"}]}\n\nSYNTHESIS:\n${syn}`
      ).then((text) => JSON.parse(text.replace(/```json|```/g, '').trim()).tensions),
      callClaude(
        `You are a rigorous methodologist reviewing the literature on "${query}". Based on this synthesis of ${papers.length} papers, identify systematic methodological problems. Rate severity as critical, moderate, or minor. Return ONLY this JSON, no markdown:\n{"critiques":[{"issue":"string","description":"string","severity":"critical|moderate|minor","affected":"string","remedy":"string"}]}\n\nSYNTHESIS:\n${syn}`
      ).then((text) => JSON.parse(text.replace(/```json|```/g, '').trim()).critiques),
    ])

    setAnalysis((prev) => ({
      ...prev,
      absenceMapping: absences,
      tensionTopology: tensions,
      methodologicalCritique: critiques,
    }))
    log('Run All: parallel modules complete')

    // Step 3: Hypothesis generation (depends on step 2 results)
    setLoadingMessage('Generating hypotheses...')
    log('Run All: generating hypotheses...')
    const { methods, domains } = buildProfileString()
    const priorForHypotheses = [
      `ABSENCES:\n${absences.map((a) => `- ${a.category}: ${a.description}`).join('\n')}`,
      `TENSIONS:\n${tensions.map((t) => `- ${t.title}: ${t.rootCause}`).join('\n')}`,
      `CRITIQUES:\n${critiques.map((c) => `- ${c.issue}: ${c.description}`).join('\n')}`,
    ].join('\n\n')

    const hypothesesText = await callClaude(
      `You are a creative but rigorous neuroscience research analyst. Generate hypothesis nudges for a ${researcherProfile.careerStage} researcher studying "${query}" with methods: ${methods} and domains: ${domains}. Nudge toward directions, don't over-specify. Only flag lab-addressable if methods genuinely fit. Return ONLY this JSON, no markdown:\n{"hypotheses":[{"nudge":"string","rationale":"string","labAddressable":true,"methods":["string"],"confidence":"high|medium|low","tags":["string"]}]}\n\nSYNTHESIS:\n${syn}\n\nPRIOR ANALYSIS:\n${priorForHypotheses}`
    )
    const hypotheses = JSON.parse(hypothesesText.replace(/```json|```/g, '').trim()).hypotheses
    setAnalysis((prev) => ({ ...prev, hypotheses }))
    log('Run All: hypotheses complete')

    // Step 4: Field diagnostic (depends on all prior results)
    setLoadingMessage('Running field diagnostic...')
    log('Run All: running field diagnostic...')
    const priorForDiagnostic = [
      `ABSENCES:\n${absences.map((a) => `- ${a.category}: ${a.description}`).join('\n')}`,
      `TENSIONS:\n${tensions.map((t) => `- ${t.title}: ${t.rootCause}`).join('\n')}`,
      `CRITIQUES:\n${critiques.map((c) => `- ${c.issue}: ${c.description}`).join('\n')}`,
      `HYPOTHESES:\n${hypotheses.map((h) => `- ${h.nudge}`).join('\n')}`,
    ].join('\n\n')

    const diagnosticText = await callClaude(`You are a rigorous research epistemologist. Based on the literature synthesis and prior analysis of ${papers.length} papers on "${query}", generate a Field Diagnostic — a structured assessment of the epistemic health of this research field.

Score each dimension from 1-10 where 1 is severely broken and 10 is exemplary. Be honest and critical. Do not inflate scores.

Return ONLY this JSON, no markdown:
{
  "dimensions": [
    {
      "name": "Methodological Integrity",
      "score": 4,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Theoretical Consensus",
      "score": 6,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Population Coverage",
      "score": 3,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Longitudinal Depth",
      "score": 2,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Replication Robustness",
      "score": 3,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    },
    {
      "name": "Cross-disciplinary Integration",
      "score": 4,
      "verdict": "one sentence assessment",
      "detail": "2-3 sentences explaining the score"
    }
  ],
  "overallScore": 3.7,
  "overallVerdict": "2-3 sentence plain language summary of the field epistemic health",
  "opportunity": "2-3 sentences on where the real research opportunities are given these gaps"
}

LITERATURE SYNTHESIS:
${syn}

PRIOR ANALYSIS:
${priorForDiagnostic}`, 4000)

    const diagnosticResult = JSON.parse(diagnosticText.replace(/```json|```/g, '').trim())
    setAnalysis((prev) => ({ ...prev, fieldDiagnostic: diagnosticResult }))
    log('Run All: complete')
    setLoading(false)
    setActivePanel('fieldDiagnostic')
  }

  async function exportBrief() {
    const children = []

    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'PRISM Analysis Brief', bold: true })] }))
    children.push(new Paragraph({ children: [new TextRun({ text: `Topic: ${query}`, italics: true })] }))
    children.push(new Paragraph({ children: [new TextRun({ text: `Papers: ${papers.length} · Generated: ${new Date().toLocaleDateString()}` })] }))
    children.push(new Paragraph({ children: [new TextRun('')] }))

    if (analysis.fieldDiagnostic) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Field Diagnostic')] }))
      children.push(new Paragraph({ children: [new TextRun({ text: `Overall Epistemic Health: ${analysis.fieldDiagnostic.overallScore.toFixed(1)}/10`, bold: true })] }))
      children.push(new Paragraph({ children: [new TextRun(analysis.fieldDiagnostic.overallVerdict)] }))
      children.push(new Paragraph({ children: [new TextRun({ text: 'Opportunity: ', bold: true }), new TextRun(analysis.fieldDiagnostic.opportunity)] }))
      children.push(new Paragraph({ children: [new TextRun('')] }))
      analysis.fieldDiagnostic.dimensions.forEach((dim) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `${dim.name}: ${dim.score}/10`, bold: true })] }))
        children.push(new Paragraph({ children: [new TextRun(dim.verdict)] }))
        children.push(new Paragraph({ children: [new TextRun(dim.detail)] }))
        children.push(new Paragraph({ children: [new TextRun('')] }))
      })
    }

    if (analysis.absenceMapping) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Absence Mapping')] }))
      children.push(new Paragraph({ children: [new TextRun({ text: 'What this field is not studying and why it matters', italics: true })] }))
      children.push(new Paragraph({ children: [new TextRun('')] }))
      analysis.absenceMapping.forEach((item) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `[${item.significance.toUpperCase()}] ${item.category}`, bold: true })] }))
        children.push(new Paragraph({ children: [new TextRun(item.description)] }))
        children.push(new Paragraph({ children: [new TextRun('')] }))
      })
    }

    if (analysis.tensionTopology) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Tension Topology')] }))
      children.push(new Paragraph({ children: [new TextRun({ text: 'Where and why researchers disagree', italics: true })] }))
      children.push(new Paragraph({ children: [new TextRun('')] }))
      analysis.tensionTopology.forEach((item) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `[${item.type.toUpperCase()}] ${item.title}`, bold: true })] }))
        children.push(new Paragraph({ children: [new TextRun(item.description)] }))
        children.push(new Paragraph({ children: [new TextRun({ text: 'Root cause: ', bold: true }), new TextRun(item.rootCause)] }))
        children.push(new Paragraph({ children: [new TextRun({ text: 'Resolution: ', bold: true }), new TextRun(item.resolution)] }))
        children.push(new Paragraph({ children: [new TextRun('')] }))
      })
    }

    if (analysis.methodologicalCritique) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Methodological Critique')] }))
      children.push(new Paragraph({ children: [new TextRun({ text: 'Systematic problems in how this field does science', italics: true })] }))
      children.push(new Paragraph({ children: [new TextRun('')] }))
      analysis.methodologicalCritique.forEach((item) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `[${item.severity.toUpperCase()}] ${item.issue}`, bold: true })] }))
        children.push(new Paragraph({ children: [new TextRun(item.description)] }))
        children.push(new Paragraph({ children: [new TextRun({ text: 'Affected: ', bold: true }), new TextRun(item.affected)] }))
        children.push(new Paragraph({ children: [new TextRun({ text: 'Remedy: ', bold: true }), new TextRun(item.remedy)] }))
        children.push(new Paragraph({ children: [new TextRun('')] }))
      })
    }

    if (analysis.hypotheses) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Hypothesis Nudges')] }))
      children.push(new Paragraph({ children: [new TextRun({ text: 'Directions worth pursuing', italics: true })] }))
      children.push(new Paragraph({ children: [new TextRun('')] }))
      analysis.hypotheses.forEach((item, i) => {
        children.push(new Paragraph({ children: [new TextRun({ text: `Nudge ${i + 1}${item.labAddressable ? ' [LAB-ADDRESSABLE]' : ''} — ${item.confidence} confidence`, bold: true })] }))
        children.push(new Paragraph({ children: [new TextRun(item.nudge)] }))
        children.push(new Paragraph({ children: [new TextRun({ text: 'Rationale: ', bold: true }), new TextRun(item.rationale)] }))
        if (item.tags?.length) {
          children.push(new Paragraph({ children: [new TextRun({ text: 'Tags: ', bold: true }), new TextRun(item.tags.join(', '))] }))
        }
        children.push(new Paragraph({ children: [new TextRun('')] }))
      })
    }

    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(`Corpus — ${papers.length} papers`)] }))
    papers.forEach((p) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: p.title, bold: true }),
          new TextRun({ text: ` (${p.year}) — ${p.source}` }),
        ]
      }))
    })

    const doc = new Document({
      styles: {
        default: { document: { run: { font: 'Arial', size: 24 } } },
        paragraphStyles: [
          { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
          { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
        ]
      },
      sections: [{
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
          }
        },
        children
      }]
    })

    const buffer = await Packer.toBlob(doc)
    const url = URL.createObjectURL(buffer)
    const a = document.createElement('a')
    a.href = url
    a.download = `prism-brief-${query.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.docx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const navItems = [
    { key: 'overview', label: 'Overview', color: COLORS.accent },
    { key: 'fieldDiagnostic', label: 'Field Diagnostic', color: COLORS.accent, count: analysis.fieldDiagnostic ? analysis.fieldDiagnostic.overallScore.toFixed(1) : undefined },
    { key: 'absenceMapping', label: 'Absence Mapping', color: COLORS.red, count: analysis.absenceMapping?.length },
    { key: 'tensionTopology', label: 'Tension Topology', color: COLORS.blue, count: analysis.tensionTopology?.length },
    { key: 'methodologicalCritique', label: 'Method Critique', color: COLORS.amber, count: analysis.methodologicalCritique?.length },
    { key: 'hypotheses', label: 'Hypotheses', color: COLORS.purple, count: analysis.hypotheses?.length },
    { key: 'corpus', label: 'Corpus', color: COLORS.muted, count: papers.length },
    { key: 'log', label: 'Process Log', color: COLORS.muted },
  ]

  const moduleButtons = [
    { label: 'Absence Mapping', fn: runAbsenceMapping, done: !!analysis.absenceMapping },
    { label: 'Tension Topology', fn: runTensionTopology, done: !!analysis.tensionTopology },
    { label: 'Method Critique', fn: runMethodologicalCritique, done: !!analysis.methodologicalCritique },
    { label: 'Hypotheses', fn: runHypothesisGeneration, done: !!analysis.hypotheses },
    { label: 'Field Diagnostic', fn: runFieldDiagnostic, done: !!analysis.fieldDiagnostic },
    { label: 'Run All Modules', fn: runAllModules, done: !!analysis.fieldDiagnostic },
  ]

  if (stage === 'onboarding') {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"DM Mono", monospace' }}>
        <div style={styles.onboardingWrap}>
          <div style={{ ...styles.logo, marginBottom: '8px' }}>
            <PrismLogo />
            PRISM
          </div>
          <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '32px' }}>
            Pattern Recognition and Insight through Systemic Mapping
          </p>
          <div style={{ ...styles.card, marginBottom: '24px' }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', lineHeight: 1.8 }}>
              Tell PRISM about your research context. This personalizes hypothesis generation and lab positioning to your actual capabilities.
            </p>
          </div>
          <label style={styles.label}>Name (optional)</label>
          <input style={styles.input} placeholder="Your name" value={researcherProfile.name} onChange={(e) => setResearcherProfile((p) => ({ ...p, name: e.target.value }))} />
          <label style={styles.label}>Institution (optional)</label>
          <input style={styles.input} placeholder="University or lab" value={researcherProfile.institution} onChange={(e) => setResearcherProfile((p) => ({ ...p, institution: e.target.value }))} />
          <label style={styles.label}>Career Stage</label>
          <select style={styles.select} value={researcherProfile.careerStage} onChange={(e) => setResearcherProfile((p) => ({ ...p, careerStage: e.target.value }))}>
            <option value="undergraduate">Undergraduate researcher</option>
            <option value="graduate">Graduate student</option>
            <option value="postdoc">Postdoc</option>
            <option value="faculty">Faculty / PI</option>
            <option value="industry">Industry researcher</option>
          </select>
          <label style={styles.label}>Methods Available</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {methodOptions.map((m) => (
              <button key={m} style={styles.toggleBtn(researcherProfile.methods.includes(m))} onClick={() => toggleMethod(m)}>{m}</button>
            ))}
          </div>
          <input style={styles.input} placeholder="Other methods, comma separated..." value={researcherProfile.customMethods} onChange={(e) => setResearcherProfile((p) => ({ ...p, customMethods: e.target.value }))} />
          <label style={styles.label}>Research Domains</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {domainOptions.map((d) => (
              <button key={d} style={styles.toggleBtn(researcherProfile.domains.includes(d))} onClick={() => toggleDomain(d)}>{d}</button>
            ))}
          </div>
          <input style={styles.input} placeholder="Other domains, comma separated..." value={researcherProfile.customDomains} onChange={(e) => setResearcherProfile((p) => ({ ...p, customDomains: e.target.value }))} />
          <button style={{ ...styles.btn('primary'), marginTop: '32px', width: '100%', padding: '12px' }} onClick={() => setStage('input')}>
            Enter PRISM
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'input') {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"DM Mono", monospace' }}>
        <div style={styles.onboardingWrap}>
          <div style={{ ...styles.logo, marginBottom: '32px' }}>
            <PrismLogo />
            PRISM
          </div>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>New Search</div>
            <div style={{ ...styles.sectionSub, marginBottom: '16px' }}>
              {researcherProfile.name ? `Welcome, ${researcherProfile.name}.` : ''} What do you want to map?
            </div>
            <input
              style={styles.input}
              placeholder="Enter a research topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query && generateTerms()}
            />
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: COLORS.muted }}>CORPUS SIZE</span>
                <span style={{ fontSize: '11px', color: COLORS.accent }}>{paperCount} papers</span>
              </div>
              <input
                type="range" min="20" max="200" step="10" value={paperCount}
                onChange={(e) => setPaperCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: COLORS.accent }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: COLORS.muted, marginTop: '4px' }}>
                <span>20 — fast</span>
                <span>100 — balanced</span>
                <span>200 — comprehensive</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button style={styles.btn('secondary')} onClick={() => setStage('onboarding')}>Profile</button>
              <button style={{ ...styles.btn('primary'), flex: 1 }} onClick={generateTerms} disabled={!query}>
                Generate Search Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'approve') {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"DM Mono", monospace' }}>
        <div style={styles.onboardingWrap}>
          <div style={{ ...styles.logo, marginBottom: '32px' }}>
            <PrismLogo />
            PRISM
          </div>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Review Search Terms</div>
            <div style={styles.sectionSub}>Edit, remove, or add terms before hitting PubMed.</div>
            {proposedTerms.map((term, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input style={{ ...styles.input, flex: 1 }} value={term} onChange={(e) => updateTerm(i, e.target.value)} />
                <button style={styles.btn('secondary')} onClick={() => removeTerm(i)}>x</button>
              </div>
            ))}
            <button style={{ ...styles.btn('secondary'), marginTop: '4px' }} onClick={() => setProposedTerms([...proposedTerms, ''])}>
              + Add Term
            </button>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button style={styles.btn('secondary')} onClick={() => setStage('input')}>Back</button>
              <button style={{ ...styles.btn('primary'), flex: 1 }} onClick={runSearch}>
                Confirm and Search PubMed
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.app}>
      <div style={styles.topbar}>
        <div style={styles.logo}>
          <PrismLogo />
          PRISM
        </div>
        <div style={styles.searchBar}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="5" cy="5" r="3.5" stroke="#6b7785" strokeWidth="1" />
            <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" stroke="#6b7785" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <input style={styles.searchInput} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topic..." />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <span style={styles.pill(true)}>{papers.length} papers</span>
          <span style={styles.pill(true)}>{proposedTerms.length} queries</span>
          <span style={styles.pill(false)}>{researcherProfile.name || 'Researcher'}</span>
        </div>
      </div>

      <div style={styles.sidebar}>
        <div style={styles.sidebarLabel}>Analysis</div>
        {navItems.map((item) => (
          <div key={item.key} style={styles.sidebarItem(activePanel === item.key)} onClick={() => setActivePanel(item.key)}>
            <div style={styles.dot(item.color)} />
            {item.label}
            {item.count != null && <span style={styles.badge}>{item.count}</span>}
          </div>
        ))}

        <div style={styles.sidebarLabel}>Run Modules</div>
        {moduleButtons.map((m) => (
          <div key={m.label} style={{ padding: '4px 12px' }}>
            <button
              style={{ ...styles.btn(m.done ? 'secondary' : 'primary'), width: '100%', fontSize: '11px', padding: '6px 10px' }}
              onClick={m.fn}
              disabled={loading || !papers.length}
            >
              {m.done ? 'done ' : ''}{m.label}
            </button>
          </div>
        ))}

        <div style={styles.sidebarLabel}>Export</div>
        <div style={{ padding: '4px 12px' }}>
          <button
            style={{ ...styles.btn('secondary'), width: '100%', fontSize: '11px', padding: '6px 10px' }}
            onClick={exportBrief}
            disabled={!papers.length}
          >
            Export Brief
          </button>
        </div>

        <div style={styles.sidebarLabel}>Session</div>
        <div style={styles.sidebarItem(false)} onClick={() => setStage('input')}>
          <div style={styles.dot(COLORS.muted)} />
          New Search
        </div>
        <div style={styles.sidebarItem(false)} onClick={() => setStage('onboarding')}>
          <div style={styles.dot(COLORS.muted)} />
          Edit Profile
        </div>
        <div style={styles.sidebarItem(false)} onClick={clearSession}>
          <div style={styles.dot(COLORS.red)} />
          Clear Session
        </div>
      </div>

      <div style={styles.main}>
        {loading && (
          <div style={{ ...styles.card, borderColor: COLORS.accent }}>
            <span style={{ color: COLORS.accent }}>loading {loadingMessage}</span>
          </div>
        )}

        {activePanel === 'overview' && (
          <>
            <div style={styles.statsRow}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Corpus</div>
                <div style={styles.statValue()}>{papers.length}</div>
                <div style={styles.statSub}>{proposedTerms.length} search queries</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Gaps found</div>
                <div style={styles.statValue(COLORS.red)}>{analysis.absenceMapping?.length || '—'}</div>
                <div style={styles.statSub}>{analysis.absenceMapping?.filter((a) => a.significance === 'high').length || 0} high significance</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Tensions</div>
                <div style={styles.statValue(COLORS.blue)}>{analysis.tensionTopology?.length || '—'}</div>
                <div style={styles.statSub}>{analysis.tensionTopology?.filter((t) => t.type === 'methodological').length || 0} methodological</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Hypotheses</div>
                <div style={styles.statValue(COLORS.accent)}>{analysis.hypotheses?.length || '—'}</div>
                <div style={styles.statSub}>{analysis.hypotheses?.filter((h) => h.labAddressable).length || 0} lab-addressable</div>
              </div>
            </div>

            {analysis.fieldDiagnostic && (
              <div style={{
                ...styles.card,
                borderColor: analysis.fieldDiagnostic.overallScore >= 7 ? COLORS.accent :
                             analysis.fieldDiagnostic.overallScore >= 4 ? COLORS.amber : COLORS.red,
                cursor: 'pointer',
              }} onClick={() => setActivePanel('fieldDiagnostic')}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <div style={{
                    fontFamily: '"Times New Roman", serif',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: analysis.fieldDiagnostic.overallScore >= 7 ? COLORS.accent :
                           analysis.fieldDiagnostic.overallScore >= 4 ? COLORS.amber : COLORS.red,
                    lineHeight: 1,
                  }}>
                    {analysis.fieldDiagnostic.overallScore.toFixed(1)}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Field Epistemic Health</div>
                    <div style={{ fontSize: '12px', color: COLORS.text, marginTop: '2px' }}>{analysis.fieldDiagnostic.overallVerdict.slice(0, 100)}...</div>
                  </div>
                </div>
              </div>
            )}

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Topic</div>
              <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '4px' }}>{query}</p>
              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {proposedTerms.map((t, i) => <span key={i} style={styles.tag}>{t}</span>)}
              </div>
            </div>

            {!analysis.absenceMapping && !loading && (
              <div style={styles.card}>
                <div style={styles.sectionTitle}>Ready to analyze</div>
                <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '4px', lineHeight: 1.8 }}>
                  Run analysis modules from the sidebar. Start with Absence Mapping, then Tension Topology, then Method Critique, then Hypotheses — run Field Diagnostic last for the most accurate score.
                </p>
              </div>
            )}
          </>
        )}

        {activePanel === 'fieldDiagnostic' && analysis.fieldDiagnostic && (
          <div>
            <div style={styles.sectionTitle}>Field Diagnostic</div>
            <div style={styles.sectionSub}>Epistemic health assessment of {query}</div>
            <div style={{
              ...styles.card,
              marginBottom: '20px',
              borderColor: analysis.fieldDiagnostic.overallScore >= 7 ? COLORS.accent :
                           analysis.fieldDiagnostic.overallScore >= 4 ? COLORS.amber : COLORS.red,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  fontFamily: '"Times New Roman", serif',
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: analysis.fieldDiagnostic.overallScore >= 7 ? COLORS.accent :
                         analysis.fieldDiagnostic.overallScore >= 4 ? COLORS.amber : COLORS.red,
                  lineHeight: 1,
                }}>
                  {analysis.fieldDiagnostic.overallScore.toFixed(1)}
                </div>
                <div style={{ fontSize: '14px', color: COLORS.muted }}>/10 overall epistemic health</div>
              </div>
              <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: 1.8, marginBottom: '10px' }}>
                {analysis.fieldDiagnostic.overallVerdict}
              </div>
              <div style={{
                fontSize: '12px',
                color: COLORS.text,
                lineHeight: 1.8,
                borderTop: `1px solid ${COLORS.border}`,
                paddingTop: '10px',
                marginTop: '4px',
              }}>
                <span style={{ color: COLORS.accent }}>Opportunity: </span>
                {analysis.fieldDiagnostic.opportunity}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {analysis.fieldDiagnostic.dimensions.map((dim, i) => {
                const scoreColor = dim.score >= 7 ? COLORS.accent : dim.score >= 4 ? COLORS.amber : COLORS.red
                return (
                  <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${scoreColor}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <div style={{ fontSize: '11px', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {dim.name}
                      </div>
                      <div style={{ fontFamily: '"Times New Roman", serif', fontSize: '22px', fontWeight: 'bold', color: scoreColor }}>
                        {dim.score}
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: COLORS.text, marginBottom: '4px' }}>{dim.verdict}</div>
                    <div style={{ fontSize: '11px', color: COLORS.muted, lineHeight: 1.7 }}>{dim.detail}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activePanel === 'absenceMapping' && analysis.absenceMapping && (
          <div>
            <div style={styles.sectionTitle}>Absence Mapping</div>
            <div style={styles.sectionSub}>What this field is not studying and why it matters</div>
            {analysis.absenceMapping.map((item, i) => (
              <div key={i} style={styles.absenceItem(significanceColors[item.significance])}>
                <span style={styles.sigBadge(significanceColors[item.significance])}>{item.significance}</span>
                <div>
                  <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '4px', fontFamily: '"Times New Roman", serif' }}>{item.category}</div>
                  <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7 }}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'tensionTopology' && analysis.tensionTopology && (
          <div>
            <div style={styles.sectionTitle}>Tension Topology</div>
            <div style={styles.sectionSub}>Where and why researchers disagree</div>
            {analysis.tensionTopology.map((item, i) => (
              <div key={i} style={styles.tensionCard(tensionColors[item.type])}>
                <div style={styles.typeTag(tensionColors[item.type])}>{item.type}</div>
                <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '6px', fontFamily: '"Times New Roman", serif' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7, marginBottom: '8px' }}>{item.description}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7 }}><span style={{ color: COLORS.text }}>Root cause: </span>{item.rootCause}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7, marginTop: '4px' }}><span style={{ color: COLORS.text }}>Resolution: </span>{item.resolution}</div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'methodologicalCritique' && analysis.methodologicalCritique && (
          <div>
            <div style={styles.sectionTitle}>Methodological Critique</div>
            <div style={styles.sectionSub}>Systematic problems in how this field does science</div>
            {analysis.methodologicalCritique.map((item, i) => (
              <div key={i} style={styles.tensionCard(severityColors[item.severity])}>
                <div style={styles.typeTag(severityColors[item.severity])}>{item.severity}</div>
                <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '6px', fontFamily: '"Times New Roman", serif' }}>{item.issue}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7, marginBottom: '8px' }}>{item.description}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7 }}><span style={{ color: COLORS.text }}>Affected: </span>{item.affected}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7, marginTop: '4px' }}><span style={{ color: COLORS.text }}>Remedy: </span>{item.remedy}</div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'hypotheses' && analysis.hypotheses && (
          <div>
            <div style={styles.sectionTitle}>Hypothesis Nudges</div>
            <div style={styles.sectionSub}>Directions worth pursuing — the connections are yours to make</div>
            {analysis.hypotheses.map((item, i) => (
              <div key={i} style={styles.hypothesisCard(item.labAddressable)}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  {item.labAddressable && (
                    <span style={{ fontSize: '10px', color: COLORS.accent, border: `1px solid ${COLORS.accent}`, padding: '2px 7px', borderRadius: '4px' }}>lab-addressable</span>
                  )}
                  <span style={{ fontSize: '10px', color: confidenceColors[item.confidence], border: `1px solid ${confidenceColors[item.confidence]}`, padding: '2px 7px', borderRadius: '4px' }}>{item.confidence} confidence</span>
                </div>
                <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: 1.8, marginBottom: '8px' }}>{item.nudge}</div>
                <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7 }}><span style={{ color: COLORS.text }}>Rationale: </span>{item.rationale}</div>
                <div style={styles.tagRow}>
                  {item.tags?.map((t, j) => <span key={j} style={styles.tag}>{t}</span>)}
                  {item.methods?.map((m, j) => <span key={j} style={{ ...styles.tag, borderColor: COLORS.accent + '44', color: COLORS.accent + 'aa' }}>{m}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'corpus' && (
          <div>
            <div style={styles.sectionTitle}>Corpus — {papers.length} papers</div>
            <div style={styles.sectionSub}>All papers retrieved across {proposedTerms.length} search queries</div>
            {papers.map((paper) => (
              <div key={paper.id} style={{ ...styles.card, marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '4px', fontFamily: '"Times New Roman", serif', lineHeight: 1.5 }}>{paper.title}</div>
                <div style={{ fontSize: '11px', color: COLORS.muted, marginBottom: '4px' }}>{paper.authors}</div>
                <div style={{ fontSize: '11px', color: COLORS.muted, marginBottom: '8px' }}>{paper.year} · {paper.source} · via: {paper.searchTerm} · <span style={{ color: paper.textSource === 'full' ? COLORS.accent : COLORS.muted }}>{paper.textSource === 'full' ? 'full text' : 'abstract only'}</span></div>
                <div style={{ fontSize: '11px', color: COLORS.muted, lineHeight: 1.7, fontStyle: 'italic' }}>{paper.fullText?.slice(0, 300)}...</div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'log' && (
          <div>
            <div style={styles.sectionTitle}>Process Log</div>
            <div style={styles.sectionSub}>How PRISM got here</div>
            <div style={styles.processLog}>
              {processLog.length === 0 && <span style={{ color: COLORS.muted }}>No log entries yet.</span>}
              {processLog.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: COLORS.accent, flexShrink: 0 }}>{entry.time}</span>
                  <span>{entry.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  )
}