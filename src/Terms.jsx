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

export default function Terms() {
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
          Terms of Service
        </h1>
        <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '48px' }}>
          Last updated: April 2025
        </p>

        <Section title="Acceptance">
          By using PRISM at useprism.net or accessing its API, you agree to these terms. If you are using PRISM on behalf of an organization, you agree to these terms on behalf of that organization. If you do not agree, do not use PRISM.
        </Section>

        <Section title="What PRISM is">
          PRISM is a research literature analysis tool that retrieves publicly available academic abstracts from bibliographic databases and uses AI to identify patterns, gaps, tensions, and research opportunities in the literature. PRISM is a tool to support research inquiry — it is not a substitute for domain expertise, peer-reviewed analysis, or professional judgment.
        </Section>

        <Section title="No warranty on outputs">
          <p style={{ marginBottom: '12px', color: COLORS.text, fontWeight: 'bold' }}>
            PRISM outputs are AI-generated analyses of publicly available abstracts. They may be incomplete, incorrect, or misleading.
          </p>
          <p style={{ marginBottom: '8px' }}>
            PRISM is provided "as is" without warranty of any kind, express or implied. We make no representations about the accuracy, completeness, reliability, or suitability of any analysis output for any purpose.
          </p>
          <p>
            You are responsible for independently verifying any findings before relying on them for research decisions, grant applications, publications, clinical decisions, business decisions, or any other consequential purpose. PRISM outputs are a starting point for inquiry, not a conclusion.
          </p>
        </Section>

        <Section title="Limitation of liability">
          To the maximum extent permitted by applicable law, PRISM and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities, arising out of or in connection with your use of PRISM, even if advised of the possibility of such damages.

          Our total liability to you for any claim arising out of or relating to these terms or your use of PRISM shall not exceed the amount you paid us in the twelve months preceding the claim. If you have not paid anything, our liability is zero.
        </Section>

        <Section title="Acceptable use">
          <p style={{ marginBottom: '8px' }}>You may use PRISM for legitimate research, educational, and commercial research intelligence purposes.</p>
          <p style={{ marginBottom: '8px' }}>You may not use PRISM to:</p>
          <p style={{ marginBottom: '4px' }}>— Attempt to reverse engineer, scrape, or systematically extract PRISM's prompts or internal logic</p>
          <p style={{ marginBottom: '4px' }}>— Deliberately abuse the service in ways that incur excessive API costs</p>
          <p style={{ marginBottom: '4px' }}>— Represent AI-generated outputs as your own original research analysis without disclosure</p>
          <p style={{ marginBottom: '4px' }}>— Use PRISM for any purpose that violates applicable law</p>
          <p>— Misrepresent PRISM outputs as validated clinical, legal, or financial advice</p>
        </Section>

        <Section title="Third-party services">
          PRISM depends on external services including Anthropic's API, PubMed, OpenAlex, Semantic Scholar, and Europe PMC. We are not responsible for the availability, accuracy, or behavior of these services. Their terms of service and usage policies apply to your use of PRISM insofar as PRISM transmits queries to those services on your behalf.

          In particular, Anthropic's usage policies apply to all AI-generated content produced by PRISM. By using PRISM you agree to comply with Anthropic's usage policies at anthropic.com/legal/usage-policy.
        </Section>

        <Section title="Intellectual property">
          PRISM's source code is open source under the MIT License. You are free to use, copy, modify, and distribute the code subject to that license.

          Analysis outputs generated by PRISM are derived from publicly available literature and AI processing. We make no claim of copyright over outputs generated during your PRISM sessions. You may use, publish, and share PRISM outputs subject to your obligations under the terms of the underlying scientific literature and Anthropic's usage policies.
        </Section>

        <Section title="Institutional and commercial use">
          PRISM's MIT license permits commercial use. If you are deploying PRISM for institutional or enterprise use and require a custom agreement, data processing addendum, or private deployment arrangement, contact us at u1469338@utah.edu before deployment.
        </Section>

        <Section title="Changes to the service">
          We may modify, suspend, or discontinue PRISM at any time without notice. We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.
        </Section>

        <Section title="Governing law">
          These terms are governed by the laws of the State of Utah, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Salt Lake County, Utah.
        </Section>

        <Section title="Contact">
          Questions about these terms can be directed to u1469338@utah.edu.
        </Section>
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: COLORS.muted }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PrismLogo size={14} />
          PRISM · Pattern Recognition and Insight through Systemic Mapping
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/" style={{ color: COLORS.muted, textDecoration: 'none' }}>Home</a>
          <a href="/privacy" style={{ color: COLORS.muted, textDecoration: 'none' }}>Privacy</a>
          <a href="https://github.com/HuskyDawg94/prism" target="_blank" rel="noreferrer" style={{ color: COLORS.muted, textDecoration: 'none' }}>GitHub</a>
        </div>
      </div>

    </div>
  )
}
