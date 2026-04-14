import '@fontsource/dm-mono'

const COLORS = {
  bg: '#080c0f',
  surface: '#0d1318',
  border: 'rgba(255,255,255,0.06)',
  text: '#e8eaed',
  muted: '#6b7785',
  accent: '#4af2a1',
  red: '#ff5f5f',
  amber: '#f5a623',
  blue: '#5b9cf6',
  purple: '#a78bfa',
}

function PrismLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <polygon points="11,2 20,18 2,18" stroke="#4af2a1" strokeWidth="1.5" fill="none" />
      <line x1="11" y1="2" x2="11" y2="18" stroke="#4af2a1" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="11" y1="10" x2="20" y2="18" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.5" />
      <line x1="11" y1="10" x2="2" y2="18" stroke="#a78bfa" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

const features = [
  {
    color: '#ff5f5f',
    label: 'Absence Mapping',
    desc: 'Identifies what a field conspicuously is not studying — underrepresented populations, missing methodologies, ignored theoretical angles.',
  },
  {
    color: '#5b9cf6',
    label: 'Tension Topology',
    desc: 'Maps where and why researchers disagree. Classifies each conflict as empirical, definitional, methodological, or theoretical.',
  },
  {
    color: '#f5a623',
    label: 'Methodological Critique',
    desc: 'Surfaces systematic problems in how a field does science — underpowered studies, replication failures, confounds nobody controls for.',
  },
  {
    color: '#a78bfa',
    label: 'Hypothesis Nudges',
    desc: 'Generates directional hypothesis suggestions calibrated to your methods and career stage. Nudges, not conclusions — the connections are yours.',
  },
]

const steps = [
  { step: '01', label: 'Enter a topic', desc: 'Type a research area. PRISM generates targeted PubMed search terms for your review.' },
  { step: '02', label: 'Approve queries', desc: 'Edit, remove, or add search terms before they hit PubMed. You control the corpus.' },
  { step: '03', label: 'Build corpus', desc: 'PRISM fetches up to 200 papers with abstracts across all your search terms.' },
  { step: '04', label: 'Run analysis', desc: 'Run any combination of the five analysis modules. Export a Word brief when done.' },
]

export default function Landing({ onEnter }) {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"DM Mono", monospace', fontSize: '13px' }}>

      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: '56px', borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
        <div style={{ fontFamily: '"Times New Roman", serif', fontSize: '20px', fontWeight: 'bold', color: COLORS.accent, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PrismLogo size={22} />
          PRISM
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: COLORS.muted }}>v0.1 alpha</span>
          <a
            href="https://forms.gle/Qe5v4ZgiJPzQJxeW6"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '11px', color: COLORS.muted, textDecoration: 'none' }}
          >
            Give Feedback
          </a>
          <button onClick={onEnter} style={{ padding: '7px 16px', borderRadius: '6px', border: `1px solid ${COLORS.accent}`, background: 'rgba(74,242,161,0.1)', color: COLORS.accent, fontFamily: '"DM Mono", monospace', fontSize: '12px', cursor: 'pointer' }}>
            Launch PRISM
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '80px 40px 60px', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <PrismLogo size={48} />
        </div>
        <h1 style={{ fontFamily: '"Times New Roman", serif', fontSize: '48px', fontWeight: 'bold', color: COLORS.text, letterSpacing: '0.06em', marginBottom: '16px', lineHeight: 1.2 }}>
          Pattern Recognition and Insight through Systemic Mapping
        </h1>
        <p style={{ fontSize: '15px', color: COLORS.muted, lineHeight: 1.9, maxWidth: '560px', margin: '0 auto 40px' }}>
          PRISM is a research intelligence tool that does not just summarize literature.
          It maps what a field is not studying, why researchers disagree, what is methodologically broken, and where the unexplored hypotheses live.
        </p>
        <button onClick={onEnter} style={{ padding: '14px 32px', borderRadius: '8px', border: `1px solid ${COLORS.accent}`, background: 'rgba(74,242,161,0.1)', color: COLORS.accent, fontFamily: '"DM Mono", monospace', fontSize: '14px', cursor: 'pointer', letterSpacing: '0.04em' }}>
          Launch PRISM
        </button>
        <p style={{ fontSize: '11px', color: COLORS.muted, marginTop: '12px' }}>
          Free to use · Powered by PubMed + Claude · Open source ·{' '}
          <a href="https://forms.gle/Qe5v4ZgiJPzQJxeW6" target="_blank" rel="noreferrer" style={{ color: COLORS.accent, textDecoration: 'none' }}>
            Share feedback
          </a>
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px 80px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {features.map((f) => (
          <div key={f.label} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${f.color}`, borderRadius: '8px', padding: '20px 22px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: f.color, marginBottom: '8px' }}>
              {f.label}
            </div>
            <div style={{ fontFamily: '"Times New Roman", serif', fontSize: '15px', color: COLORS.text, marginBottom: '8px' }}>
              {f.label}
            </div>
            <div style={{ fontSize: '12px', color: COLORS.muted, lineHeight: 1.7 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: '"Times New Roman", serif', fontSize: '24px', color: COLORS.text, marginBottom: '32px', textAlign: 'center' }}>
          How it works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {steps.map((s) => (
            <div key={s.step} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontFamily: '"Times New Roman", serif', fontSize: '28px', color: COLORS.accent, opacity: 0.4, marginBottom: '8px' }}>
                {s.step}
              </div>
              <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '6px', fontWeight: 'bold' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '11px', color: COLORS.muted, lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: COLORS.muted, marginBottom: '12px' }}>
          Using PRISM? Your feedback shapes what gets built next.
        </p>
        <a
          href="https://forms.gle/Qe5v4ZgiJPzQJxeW6"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '6px', border: `1px solid ${COLORS.border}`, color: COLORS.accent, textDecoration: 'none', fontSize: '12px', fontFamily: '"DM Mono", monospace' }}
        >
          → Give Feedback
        </a>
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: COLORS.muted }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PrismLogo size={14} />
          PRISM · Pattern Recognition and Insight through Systemic Mapping
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://github.com/HuskyDawg94/prism" target="_blank" rel="noreferrer" style={{ color: COLORS.muted, textDecoration: 'none' }}>
            GitHub
          </a>
          <a href="https://forms.gle/Qe5v4ZgiJPzQJxeW6" target="_blank" rel="noreferrer" style={{ color: COLORS.muted, textDecoration: 'none' }}>
            Feedback
          </a>
          <span>Open source · MIT License</span>
        </div>
      </div>

    </div>
  )
}