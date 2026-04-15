'use client'
import { useState } from 'react'
import { MOCK_EVENTS } from '@/lib/mockData'
import Link from 'next/link'

const NAV_ITEMS = [
  { id: 'dashboard', label: '대시보드', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { id: 'events',    label: '이벤트 관리', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
  { id: 'participants', label: '참가자 관리', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { id: 'broadcast',  label: '방송 관리', icon: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
  { id: 'certs',      label: '증명서', icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 9l-3-3 1.4-1.4.6.6V12h2v4.2l.6-.6 1.4 1.4-3 3z' },
  { id: 'stats',      label: '통계', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
]

const WIZ_STEPS = ['생성', '참가자', '잠금', '방송중', '추첨', '발급']

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard')
  const [drawState, setDrawState] = useState<'idle' | 'seed' | 'running' | 'done'>('idle')
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const runDraw = async () => {
    setDrawState('seed')
    await new Promise(r => setTimeout(r, 1800))
    setDrawState('running')
    await new Promise(r => setTimeout(r, 1800))
    setDrawState('done')
    showToast('추첨 완료! 당첨자 3명 선정 · 공정성 증명서 발급됨')
  }

  const liveEvent = MOCK_EVENTS.find(e => e.status === 'live')!

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--ivory)' }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] rounded-xl px-4 py-3 text-sm font-semibold text-white"
          style={{ background: 'var(--dark)', borderLeft: '3px solid #4ade80', boxShadow: '0 4px 20px rgba(0,0,0,.2)' }}>
          {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-y-auto" style={{ background: 'var(--dark)' }}>
        {/* Logo */}
        <div className="p-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold)' }}>
              <svg viewBox="0 0 20 20" fill="white" width="15" height="15"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z" /></svg>
            </div>
            <span className="text-sm font-extrabold text-white">모두의 추첨</span>
          </Link>
        </div>
        {/* User */}
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div className="text-sm font-bold text-white">삼성전자</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.3)' }}>비즈니스 플랜 · 이번달 3/4회</div>
        </div>
        {/* Nav */}
        <nav className="p-3 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest px-2 pt-3 pb-2" style={{ color: 'rgba(255,255,255,.25)' }}>메인</div>
          {NAV_ITEMS.slice(0, 4).map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold mb-0.5 transition-all"
              style={{
                color: tab === item.id ? 'var(--gold4)' : 'rgba(255,255,255,.45)',
                background: tab === item.id ? 'rgba(184,146,42,.14)' : 'transparent',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
          <div className="text-[10px] font-bold uppercase tracking-widest px-2 pt-4 pb-2" style={{ color: 'rgba(255,255,255,.25)' }}>결과</div>
          {NAV_ITEMS.slice(4).map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold mb-0.5 transition-all"
              style={{
                color: tab === item.id ? 'var(--gold4)' : 'rgba(255,255,255,.45)',
                background: tab === item.id ? 'rgba(184,146,42,.14)' : 'transparent',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
        </nav>
        {/* Logout */}
        <div className="p-3 pt-0">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold no-underline transition-all" style={{ color: 'rgba(255,255,255,.3)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
            로그아웃
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <div className="flex items-start justify-between mb-7">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>대시보드</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text4)' }}>2025년 6월 1일 · 실시간 현황</p>
              </div>
              <button className="btn-gold text-sm px-5 py-2.5 rounded-xl" onClick={() => setShowNewEvent(true)}>
                + 이벤트 만들기
              </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { l: '총 참가자', v: '12,847', c: 'var(--gold)', ch: '↑ +23%' },
                { l: '현재 시청자', v: '4,287', c: 'var(--green)', ch: '실시간' },
                { l: '전환율', v: '33.4%', c: 'var(--text)', ch: '↑ +5.2%p' },
                { l: '누적 이벤트', v: '12회', c: 'var(--text)', ch: '이번달 3/4' },
              ].map(({ l, v, c, ch }) => (
                <div key={l} className="card p-5">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text4)' }}>{l}</div>
                  <div className="text-3xl font-black tracking-tight" style={{ color: c }}>{v}</div>
                  <div className="text-xs mt-1.5" style={{ color: 'var(--green)' }}>{ch}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left: 진행 상황 */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>진행 중인 이벤트</h3>
                    <span className="badge-live">● LIVE</span>
                  </div>
                  {/* Wizard */}
                  <div className="flex items-center mb-5 overflow-x-auto pb-1">
                    {WIZ_STEPS.map((s, i) => (
                      <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5 px-1">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold"
                            style={{
                              background: i < 3 ? 'rgba(26,107,58,.12)' : i === 3 ? 'var(--gold7)' : 'var(--ivory2)',
                              color: i < 3 ? 'var(--green)' : i === 3 ? 'var(--gold)' : 'var(--text4)',
                              border: `2px solid ${i < 3 ? 'rgba(26,107,58,.3)' : i === 3 ? 'var(--gold3)' : 'var(--ivory3)'}`,
                            }}
                          >
                            {i < 3 ? '✓' : i + 1}
                          </div>
                          <div className="text-[10px] font-semibold whitespace-nowrap" style={{ color: 'var(--text4)' }}>{s}</div>
                        </div>
                        {i < WIZ_STEPS.length - 1 && (
                          <div className="flex-1 h-0.5 mx-1 mb-5" style={{ background: 'var(--ivory3)', minWidth: '16px' }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Lock status */}
                  <div className="rounded-xl p-3.5 flex items-center gap-3 mb-3" style={{ background: 'rgba(26,107,58,.06)', border: '1px solid rgba(26,107,58,.2)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,107,58,.12)' }}>
                      <svg viewBox="0 0 24 24" fill="var(--green)" width="17" height="17"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--green)' }}>참가자 명단 잠금 완료 · 12,847명</div>
                      <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--text4)' }}>SHA-256: a3f9c2d8...e8b1d4</div>
                    </div>
                  </div>

                  {/* Seed status */}
                  <div className="rounded-xl p-3.5 flex items-center gap-3 mb-4" style={{ background: 'var(--gold7)', border: '1px solid var(--gold6)' }}>
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-live" style={{ background: 'var(--gold3)' }} />
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--brown)' }}>Bitcoin Seed 수집 대기 중</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text4)' }}>방송 시작 후 첫 Bitcoin 블록 해시 자동 수집 예정</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2.5">
                    <button
                      className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white transition-all"
                      style={{
                        background: drawState === 'done' ? 'var(--green)' : drawState !== 'idle' ? 'var(--gold2)' : 'var(--gold)',
                        opacity: drawState === 'seed' || drawState === 'running' ? 0.8 : 1,
                      }}
                      onClick={runDraw}
                      disabled={drawState !== 'idle' && drawState !== 'done'}
                    >
                      {drawState === 'idle' && '🎲 추첨 실행 (Seed 수집 완료 후 활성화)'}
                      {drawState === 'seed' && '⏳ Seed 수집 중...'}
                      {drawState === 'running' && '🎲 추첨 알고리즘 실행 중...'}
                      {drawState === 'done' && '🎉 추첨 완료! 당첨자 3명 선정됨'}
                    </button>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button className="btn-outline py-2.5 text-sm rounded-xl justify-center" onClick={() => showToast('명단 CSV 다운로드 중...')}>
                        📥 명단 내보내기
                      </button>
                      <button className="btn-outline py-2.5 text-sm rounded-xl justify-center" onClick={() => setShowUpload(true)}>
                        📤 참가자 업로드
                      </button>
                    </div>
                    <button className="btn-dark w-full py-3 text-sm rounded-xl justify-center" onClick={() => showToast('방송이 시작되었습니다. 🔴')}>
                      🔴 방송 시작 / 종료
                    </button>
                  </div>
                </div>

                {/* Event list */}
                <div className="card p-5">
                  <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>내 이벤트 목록</h3>
                  {MOCK_EVENTS.map(ev => (
                    <div key={ev.id} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--ivory2)' }}>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-live"
                        style={{ background: ev.status === 'live' ? 'var(--red)' : ev.status === 'done' ? 'var(--green)' : 'var(--gold3)' }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{ev.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text4)' }}>
                          참가 {ev.participantCount.toLocaleString()} · {ev.status === 'live' ? '시청 ' + ev.streamViewers?.toLocaleString() : ev.prize}
                        </div>
                        <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--ivory2)' }}>
                          <div className="h-full rounded-full" style={{
                            width: ev.status === 'done' ? '100%' : ev.status === 'live' ? '72%' : '40%',
                            background: ev.status === 'done' ? 'var(--green)' : 'linear-gradient(90deg,var(--gold),var(--gold4))',
                          }} />
                        </div>
                      </div>
                      <span className={
                        ev.status === 'live' ? 'badge-live' :
                        ev.status === 'done' ? 'badge-cert' : 'badge-soon'
                      }>
                        {ev.status === 'live' ? 'LIVE' : ev.status === 'done' ? '완료' : '준비중'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: 통계 + 활동 */}
              <div className="flex flex-col gap-5">
                <div className="card p-5">
                  <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>방송 통계</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { l: '시청자', v: '4,287', c: 'var(--gold)' },
                      { l: '평균 시청', v: '18:32', c: 'var(--text)' },
                      { l: '전환율', v: '33.4%', c: 'var(--green)' },
                      { l: '이의 신청', v: '0건', c: 'var(--text)' },
                    ].map(({ l, v, c }) => (
                      <div key={l} className="rounded-xl p-3 text-center" style={{ background: 'var(--ivory)' }}>
                        <div className="text-xl font-black" style={{ color: c }}>{v}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--text4)' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-5">
                  <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>최근 활동</h3>
                  {[
                    { dot: 'var(--green)', text: '참가자 명단 잠금 완료 · 12,847명', time: '13:59:00 UTC' },
                    { dot: 'var(--gold)', text: '방송 시작 · LIVE 중', time: '14:00:47 UTC' },
                    { dot: 'var(--text4)', text: '참가자 CSV 업로드 · 12,847행', time: '13:45:22 UTC' },
                    { dot: 'var(--text4)', text: '이벤트 생성 · 방송 슬롯 예약', time: '05-28' },
                  ].map(({ dot, text, time }, i) => (
                    <div key={i} className="flex gap-3 py-2.5" style={{ borderBottom: i < 3 ? '1px solid var(--ivory2)' : 'none' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: dot }} />
                      <div>
                        <div className="text-xs" style={{ color: 'var(--text2)' }}>{text}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text4)' }}>{time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARTICIPANTS */}
        {tab === 'participants' && (
          <div>
            <div className="flex items-start justify-between mb-7">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>참가자 관리</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text4)' }}>갤럭시 이벤트 · EVT-20250601-001</p>
              </div>
              <button className="btn-gold text-sm px-5 py-2.5 rounded-xl" onClick={() => setShowUpload(true)}>참가자 업로드</button>
            </div>
            <div className="card p-6">
              <div
                className="rounded-2xl p-8 text-center mb-5 cursor-pointer transition-all"
                style={{ border: '2px dashed var(--ivory4)' }}
                onClick={() => setShowUpload(true)}
              >
                <div className="text-3xl mb-3">📁</div>
                <div className="text-sm font-bold" style={{ color: 'var(--text2)' }}>CSV 파일 드래그 또는 클릭하여 업로드</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text4)' }}>포함 필드: UUID, 참가시각(UTC), 참가경로</div>
              </div>
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(26,107,58,.06)', border: '1px solid rgba(26,107,58,.2)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(26,107,58,.12)' }}>
                  <svg viewBox="0 0 24 24" fill="var(--green)" width="16" height="16"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--green)' }}>명단 잠금 완료 · 12,847명 확정</div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--text4)' }}>SHA-256: a3f9c2d8e1b4...e8b1d4</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { l: '총 참가자', v: '12,847', c: 'var(--gold)' },
                  { l: '중복 탐지', v: '23', c: 'var(--red)' },
                  { l: '유효 참가자', v: '12,824', c: 'var(--green)' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="rounded-xl p-4 text-center" style={{ background: 'var(--ivory)' }}>
                    <div className="text-2xl font-black" style={{ color: c }}>{v}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text4)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {!['dashboard', 'participants'].includes(tab) && (
          <div className="flex items-center justify-center h-64 rounded-3xl" style={{ border: '2px dashed var(--ivory3)' }}>
            <div className="text-center">
              <div className="text-3xl mb-3">🚧</div>
              <p style={{ color: 'var(--text4)' }}>{NAV_ITEMS.find(n => n.id === tab)?.label} 페이지 준비 중</p>
            </div>
          </div>
        )}
      </main>

      {/* 이벤트 생성 모달 */}
      {showNewEvent && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5" style={{ background: 'rgba(0,0,0,.55)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowNewEvent(false) }}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg animate-fade-up">
            <h3 className="text-xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--text)' }}>새 이벤트 만들기</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text4)' }}>기본 정보를 입력하면 6단계로 이벤트를 설정할 수 있습니다.</p>
            <div className="flex flex-col gap-3">
              <div><label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text4)' }}>이벤트명</label><input className="form-input" placeholder="예: 여름 경품 이벤트" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text4)' }}>경품</label><input className="form-input" placeholder="예: 아이패드 Pro × 3명" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text4)' }}>마감일</label><input className="form-input" type="date" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text4)' }}>방송 시각</label><input className="form-input" type="time" defaultValue="14:00" /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text4)' }}>Seed 소스</label>
                <select className="form-input">
                  <option>Bitcoin 블록 해시 (권장)</option>
                  <option>Bitcoin + 로또 조합</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn-outline flex-1 justify-center py-2.5 rounded-xl" onClick={() => setShowNewEvent(false)}>취소</button>
              <button className="btn-gold flex-1 justify-center py-2.5 rounded-xl" onClick={() => { setShowNewEvent(false); showToast('이벤트가 생성되었습니다. 플랫폼 검수 후 활성화됩니다.') }}>이벤트 생성</button>
            </div>
          </div>
        </div>
      )}

      {/* 참가자 업로드 모달 */}
      {showUpload && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5" style={{ background: 'rgba(0,0,0,.55)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowUpload(false) }}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-md animate-fade-up">
            <h3 className="text-xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--text)' }}>참가자 업로드</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text4)' }}>CSV 파일을 업로드하거나 API로 자동 연동하세요.</p>
            <div className="rounded-2xl p-8 text-center mb-4 cursor-pointer" style={{ border: '2px dashed var(--ivory4)' }}>
              <div className="text-3xl mb-2">📁</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text2)' }}>CSV 드래그 또는 클릭</div>
            </div>
            <button className="btn-outline w-full justify-center text-sm py-2.5 rounded-xl mb-5" onClick={() => showToast('템플릿 다운로드 중...')}>📥 CSV 템플릿 다운로드</button>
            <div className="flex gap-3">
              <button className="btn-outline flex-1 justify-center py-2.5 rounded-xl" onClick={() => setShowUpload(false)}>취소</button>
              <button className="btn-gold flex-1 justify-center py-2.5 rounded-xl" onClick={() => { setShowUpload(false); showToast('업로드 완료! 12,847명 확인됨') }}>업로드</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
