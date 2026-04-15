import '@fontsource/dm-mono'

const COLORS = {
  bg: '#080c0f',
  surface: '#0d1318',
  border: 'rgba(255,255,255,0.06)',
  text: '#e8eaed',
  muted: '#6b7785',
  accent: '#4af2a1',
}

function PrismLogo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <polygon points="11,2 20,18 2,18" stroke="#4af2a1" strokeWidth="1.5" fill="none" />
      <line x1="11" y1="2" x2="11" y2="18" stroke="#4af2a1" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="11" y1="10" x2="20" y2="18" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.5" />
      <line x1="11" y1="10" x2="2" y2="18" stroke="#a78bfa" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '36px' }}>
    <div style={{ fontFamily: '"Times New Roman", serif', fontSize: '18px', color: COLORS.text, marginBottom: '12px' }}>
      {title}
    </div>
    <div style={{ fontSize: '13px', color: COLORS.muted, lineHeight: 1.9 }}>
      {children}
    </div>
  </div>
)

export default function Privacy() {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: '"DM Mono", monospace', fontSize: '13px' }}>

      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: '56px', borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
        <a href="/" style={{ fontFamily: '"Times New Roman", serif', fontSize: '20px', fontWeight: 'bold', color: COLORS.accent, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <PrismLogo size={22} />
          PRISM
        </a>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 40px' }}>
        <h1 style={{ fontFamily: '"Times New Roman", serif', fontSize: '32px', color: COLORS.text, marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '48px' }}>
          Last updated: April 2026
        </p>

        <Section title="Overview">
          PRISM is a research literature analysis tool. This policy explains what data is collected when you use PRISM, where it goes, and how it is handled. We have written this in plain language because we believe you deserve to understand it clearly.
        </Section>

        <Section title="What PRISM does with your data">
          <p style={{ marginBottom: '12px' }}>When you use PRISM, the following happens:</p>
          <p style={{ marginBottom: '8px' }}>
            <span style={{ color: COLORS.text }}>Your search query and research topic</span> are sent to Anthropic's API to generate search terms, and to PubMed, OpenAlex, Semantic Scholar, and/or Europe PMC to retrieve relevant papers. These are external services with their own privacy policies.
          </p>
          <p style={{ marginBottom: '8px' }}>
            <span style={{ color: COLORS.text }}>Paper abstracts retrieved from databases</span> are sent to Anthropic's API for synthesis and analysis. Abstracts are publicly available scientific literature — they are not your private data.
          </p>
          <p style={{ marginBottom: '8px' }}>
            <span style={{ color: COLORS.text }}>Your researcher profile</span> (name, institution, career stage, methods, domains) is stored only in your browser's localStorage. It never leaves your device unless you submit it as part of a search query to generate hypothesis nudges, in which case it is sent to Anthropic's API along with the synthesis.
          </p>
          <p>
            <span style={{ color: COLORS.text }}>Analysis results and synthesis text</span> are stored only in your browser's localStorage. PRISM does not have a database. We do not store your searches, your analysis outputs, or any personally identifying information on our servers.
          </p>
        </Section>

        <Section title="Third-party services">
          <p style={{ marginBottom: '12px' }}>PRISM uses the following external services:</p>
          <p style={{ marginBottom: '8px' }}><span style={{ color: COLORS.text }}>Anthropic API</span> — processes your research queries and abstracts to generate analysis. Anthropic's privacy policy is available at anthropic.com/privacy.</p>
          <p style={{ marginBottom: '8px' }}><span style={{ color: COLORS.text }}>PubMed (NCBI)</span> — retrieves biomedical literature. Operated by the U.S. National Library of Medicine. Privacy policy at nlm.nih.gov/privacy.</p>
          <p style={{ marginBottom: '8px' }}><span style={{ color: COLORS.text }}>OpenAlex</span> — retrieves broad academic literature. Operated by OurResearch. Privacy policy at openalex.org/privacy.</p>
          <p style={{ marginBottom: '8px' }}><span style={{ color: COLORS.text }}>Semantic Scholar</span> — retrieves academic papers. Operated by the Allen Institute for AI. Privacy policy at semanticscholar.org/privacy.</p>
          <p style={{ marginBottom: '8px' }}><span style={{ color: COLORS.text }}>Europe PMC</span> — retrieves life science literature. Operated by EMBL-EBI. Privacy policy at europepmc.org/privacy.</p>
          <p><span style={{ color: COLORS.text }}>Vercel Analytics</span> — collects anonymized page view data (pages visited, browser type, country). No personally identifying information is collected. Privacy policy at vercel.com/legal/privacy-policy.</p>
        </Section>

        <Section title="What we do not do">
          <p style={{ marginBottom: '8px' }}>We do not sell your data to anyone.</p>
          <p style={{ marginBottom: '8px' }}>We do not store your search queries or analysis results on our servers.</p>
          <p style={{ marginBottom: '8px' }}>We do not require account creation or collect email addresses.</p>
          <p style={{ marginBottom: '8px' }}>We do not serve advertising.</p>
          <p>We do not share personally identifying information with third parties beyond what is necessary to operate the service (described above).</p>
        </Section>

        <Section title="Data retention">
          All session data — your researcher profile, search queries, papers, and analysis outputs — is stored in your browser's localStorage and persists until you clear it using the "Clear Session" button in PRISM or clear your browser's localStorage manually. PRISM's servers retain no user data between sessions.
        </Section>

        <Section title="Institutional and enterprise use">
          If you are using PRISM in an institutional or enterprise context and have specific data handling requirements, contact us before use. We can discuss private deployment options where all processing occurs within your infrastructure and no data is sent to shared API endpoints.
        </Section>

        <Section title="Changes to this policy">
          If we make material changes to how PRISM handles data, we will update this page and change the date at the top. We will not retroactively change data practices without notice.
        </Section>

        <Section title="Contact">
          Questions about this privacy policy can be directed to u1469338@utah.edu or via the feedback form at useprism.net.
        </Section>
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: COLORS.muted }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PrismLogo size={14} />
          PRISM · Pattern Recognition and Insight through Systemic Mapping
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/" style={{ color: COLORS.muted, textDecoration: 'none' }}>Home</a>
          <a href="/terms" style={{ color: COLORS.muted, textDecoration: 'none' }}>Terms</a>
          <a href="https://github.com/HuskyDawg94/prism" target="_blank" rel="noreferrer" style={{ color: COLORS.muted, textDecoration: 'none' }}>GitHub</a>
        </div>
      </div>

    </div>
  )
}
