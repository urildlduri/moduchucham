import Link from 'next/link'

export default function Footer() {
  const sections = [
    {
      title: '플랫폼',
      links: [
        { label: '추첨 일정', href: '/#schedule' },
        { label: '검증 페이지', href: '/verify/EVT-20250601-001' },
        { label: '알고리즘 소스코드', href: 'https://github.com/moduchucham/algorithm' },
        { label: '공정성 백서', href: '/whitepaper' },
      ],
    },
    {
      title: '기업 고객',
      links: [
        { label: '요금제', href: '/#pricing' },
        { label: '관리자 대시보드', href: '/admin' },
        { label: 'API 문서', href: '/docs' },
        { label: '도입 문의', href: '/contact' },
      ],
    },
    {
      title: '지원',
      links: [
        { label: '자주 묻는 질문', href: '/faq' },
        { label: '개인정보처리방침', href: '/privacy' },
        { label: '이용약관', href: '/terms' },
        { label: '서비스 현황', href: '/status' },
      ],
    },
  ]

  return (
    <footer style={{ background: 'var(--dark)', padding: '56px 0 32px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 20 20" fill="white" width="15" height="15">
                  <path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z" />
                </svg>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>모두의 추첨</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,.35)' }}>
              수학적으로 증명 가능한 공정 추첨.<br />
              운영자조차 조작할 수 없는 구조로<br />
              이벤트 신뢰를 회복합니다.
            </p>
          </div>

          {/* Link sections */}
          {sections.map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '14px' }}>
                {title}
              </div>
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.35)', textDecoration: 'none', marginBottom: '9px' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,.2)' }}>
          <span>© 2025 모두의 추첨. All rights reserved.</span>
          <span>사업자등록번호 000-00-00000 · 서울시 강남구</span>
        </div>
      </div>
    </footer>
  )
}
