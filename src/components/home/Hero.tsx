'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: 'var(--dark)' }}
    >
      {/* BG pattern */}
      <div
        className="absolute inset-0 opacity-[.05]"
        style={{
          backgroundImage: 'radial-gradient(var(--gold4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-150px', right: '-80px',
          width: '550px', height: '550px',
          background: 'radial-gradient(circle, rgba(184,146,42,.14), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="animate-fade-up">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
            style={{ background: 'rgba(184,146,42,.14)', border: '1px solid rgba(184,146,42,.3)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-live"
              style={{ background: 'var(--gold3)' }}
            />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--gold4)' }}>
              Provably Fair · 수학적 공정성 증명
            </span>
          </div>

          <h1
            className="font-black tracking-tighter leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(32px,4.5vw,54px)', color: '#fff' }}
          >
            누구도 조작할 수 없는<br />
            <span style={{ color: 'var(--gold4)' }}>추첨</span>,
            누구나<br />
            검증할 수 있는{' '}
            <span style={{ color: 'var(--gold4)' }}>방송</span>
          </h1>

          <p className="text-base leading-relaxed mb-9" style={{ color: 'rgba(255,255,255,.5)' }}>
            참가자 명단 SHA-256 잠금 → 비트코인 블록 해시 Seed → 결정론적 알고리즘.<br />
            운영자조차 당첨자를 미리 알 수 없는 구조로,<br />
            이벤트 추첨의 신뢰를 수학적으로 보장합니다.
          </p>

          <div className="flex gap-3 flex-wrap mb-12">
            <Link href="/#pricing" className="btn-gold text-base px-7 py-3.5 rounded-2xl">
              무료로 시작하기 →
            </Link>
            <Link
              href="/verify/EVT-20250601-001"
              className="inline-flex items-center gap-2 text-base px-7 py-3.5 rounded-2xl font-bold transition-all"
              style={{ color: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.15)' }}
            >
              검증 체험하기
            </Link>
          </div>

          <div
            className="flex gap-8 pt-8 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}
          >
            {[
              { n: '247', l: '누적 추첨' },
              { n: '100%', l: '검증 가능' },
              { n: '0건', l: '조작 사례' },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="text-3xl font-black tracking-tight" style={{ color: 'var(--gold4)' }}>{n}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,.35)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Live card */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'var(--dark2)',
              border: '1px solid rgba(184,146,42,.2)',
              boxShadow: '0 24px 60px rgba(0,0,0,.4)',
            }}
          >
            {/* Video area */}
            <div
              className="relative flex items-center justify-center overflow-hidden cursor-pointer group"
              style={{ height: '220px', background: 'linear-gradient(150deg, var(--dark) 0%, var(--dark3) 60%, var(--dark) 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-[.04]"
                style={{ backgroundImage: 'radial-gradient(var(--gold4) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              />
              {/* Live badge */}
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md px-2.5 py-1 z-10"
                style={{ background: 'var(--red)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-live" />
                <span className="text-xs font-extrabold text-white tracking-wider">LIVE</span>
              </div>
              <div
                className="absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs z-10"
                style={{ background: 'rgba(0,0,0,.45)', color: 'rgba(255,255,255,.65)' }}
              >
                👁 4,287명
              </div>
              {/* Play button */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center z-10 transition-transform duration-200 group-hover:scale-110"
                style={{ background: 'rgba(184,146,42,.85)' }}
              >
                <svg viewBox="0 0 24 24" fill="white" width="22" height="22" style={{ marginLeft: '3px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {/* Prize overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)' }}
              >
                <div className="text-base font-bold text-white">아이패드 Pro M4 12.9" × 3명</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.45)' }}>삼성전자 공식 이벤트 · 14:00 KST</div>
              </div>
            </div>

            {/* Info area */}
            <div className="p-4">
              {/* Hash */}
              <div
                className="rounded-lg p-3 mb-3"
                style={{ background: 'rgba(184,146,42,.07)', border: '1px solid rgba(184,146,42,.15)' }}
              >
                <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--brown2)' }}>
                  참가자 명단 SHA-256 잠금완료
                </div>
                <div className="font-mono text-[10px] leading-relaxed break-all" style={{ color: 'var(--gold4)', opacity: 0.75 }}>
                  a3f9c2d8e1b4f7a2c1d8e3b4f9c2a1d8...e8b1d4
                </div>
              </div>
              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(255,255,255,.35)' }}>
                  <span>Bitcoin Seed 수집 중</span>
                  <span>참가자 12,847명</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.07)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: '68%', background: 'linear-gradient(90deg, var(--gold), var(--gold4))' }}
                  />
                </div>
              </div>
              <button className="btn-gold w-full justify-center rounded-xl py-3">
                방송 참여하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
