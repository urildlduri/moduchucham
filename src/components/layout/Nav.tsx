'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 transition-shadow duration-200"
      style={{
        background: 'rgba(250,248,243,.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--ivory3)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.07)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: '64px', gap: '8px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: 'auto', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 20 20" fill="white" width="18" height="18">
              <path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)' }}>
            모두의 추첨
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '4px', marginRight: '16px' }} className="hidden-mobile">
          {[
            { href: '/#schedule', label: '추첨 일정' },
            { href: '/verify/EVT-20250601-001', label: '검증하기' },
            { href: '/#pricing', label: '요금제' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                color: 'var(--text3)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all .15s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/admin" className="btn-outline" style={{ fontSize: '13px', padding: '7px 16px', borderRadius: '10px' }}>
            관리자
          </Link>
          <Link href="/#pricing" className="btn-gold" style={{ fontSize: '13px', padding: '7px 16px', borderRadius: '10px' }}>
            무료 시작
          </Link>
        </div>
      </div>
    </nav>
  )
}
