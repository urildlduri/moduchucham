'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { MOCK_EVENTS } from '@/lib/mockData'
import Link from 'next/link'

const NAV_ITEMS = [
  { id: 'dashboard',    label: '대시보드',    icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { id: 'events',       label: '이벤트 관리', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
  { id: 'participants', label: '참가자 관리', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { id: 'broadcast',    label: '방송 관리',   icon: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
  { id: 'certs',        label: '증명서',      icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 9l-3-3 1.4-1.4.6.6V12h2v4.2l.6-.6 1.4 1.4-3 3z' },
]

const WIZ = ['생성','참가자','잠금','방송중','추첨','발급']

export default function AdminPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('dashboard')
  const [drawState, setDrawState] = useState<'idle'|'seed'|'running'|'done'>('idle')
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

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

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)' }}>
      <div style={{ fontSize: '14px', color: 'var(--text4)' }}>로딩 중...</div>
    </div>
  )

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)' }}>

      {toast && (
        <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 9999, background: 'var(--dark)', borderLeft: '3px solid #4ade80', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,.2)' }}>
          {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: '232px', flexShrink: 0, background: 'var(--dark)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 20 20" fill="white" width="14" height="14"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z" /></svg>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>모두의 추첨</span>
          </Link>
        </div>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{user.email}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)', marginTop: '2px' }}>비즈니스 플랜</div>
        </div>
        <nav style={{ padding: '10px', flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,.25)', padding: '10px 8px 6px' }}>메인</div>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, marginBottom: '2px', cursor: 'pointer', border: 'none', transition: 'all .15s', background: tab === item.id ? 'rgba(184,146,42,.14)' : 'transparent', color: tab === item.id ? 'var(--gold4)' : 'rgba(255,255,255,.45)', fontFamily: 'inherit' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'transparent', color: 'rgba(255,255,255,.3)', fontFamily: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

        {tab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>대시보드</h1>
                <p style={{ fontSize: '13px', color: 'var(--text4)', marginTop: '4px' }}>실시간 현황</p>
              </div>
              <button className="btn-gold" style={{ fontSize: '13px', padding: '9px 18px', borderRadius: '10px' }} onClick={() => setShowNewEvent(true)}>
                + 이벤트 만들기
              </button>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
              {[
                { l: '총 참가자', v: '12,847', c: 'var(--gold)', ch: '↑ +23%' },
                { l: '현재 시청자', v: '4,287', c: 'var(--green)', ch: '실시간' },
                { l: '전환율', v: '33.4%', c: 'var(--text)', ch: '↑ +5.2%p' },
                { l: '누적 이벤트', v: '12회', c: 'var(--text)', ch: '이번달 3/4' },
              ].map(({ l, v, c, ch }) => (
                <div key={l} className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text4)', marginBottom: '8px' }}>{l}</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: c, letterSpacing: '-1px' }}>{v}</div>
                  <div style={{ fontSize: '12px', color: 'var(--green)', marginTop: '4px' }}>{ch}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 진행 상황 */}
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>진행 중인 이벤트</h3>
                    <span className="badge-live">● LIVE</span>
                  </div>
                  {/* Wizard */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {WIZ.map((s, i) => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '0 4px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, background: i < 3 ? 'rgba(26,107,58,.12)' : i === 3 ? 'var(--gold7)' : 'var(--ivory2)', color: i < 3 ? 'var(--green)' : i === 3 ? 'var(--gold)' : 'var(--text4)', border: `2px solid ${i < 3 ? 'rgba(26,107,58,.3)' : i === 3 ? 'var(--gold3)' : 'var(--ivory3)'}` }}>
                            {i < 3 ? '✓' : i + 1}
                          </div>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text4)', whiteSpace: 'nowrap' }}>{s}</div>
                        </div>
                        {i < WIZ.length - 1 && <div style={{ flex: 1, height: '2px', background: 'var(--ivory3)', minWidth: '16px', marginBottom: '18px' }} />}
                      </div>
                    ))}
                  </div>
                  {/* Lock status */}
                  <div style={{ borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', background: 'rgba(26,107,58,.06)', border: '1px solid rgba(26,107,58,.2)' }}>
                    <svg viewBox="0 0 24 24" fill="var(--green)" width="18" height="18"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" /></svg>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>참가자 명단 잠금 완료 · 12,847명</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text4)', marginTop: '2px' }}>SHA-256: a3f9c2d8...e8b1d4</div>
                    </div>
                  </div>
                  {/* Seed status */}
                  <div style={{ borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', background: 'var(--gold7)', border: '1px solid var(--gold6)' }}>
                    <span className="animate-live" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold3)', flexShrink: 0, display: 'inline-block' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brown)' }}>Bitcoin Seed 수집 대기 중</div>
                      <div style={{ fontSize: '11px', color: 'var(--text4)', marginTop: '2px' }}>방송 시작 후 첫 Bitcoin 블록 해시 자동 수집</div>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      className={drawState === 'done' ? '' : 'btn-gold'}
                      style={{ width: '100%', padding: '13px', fontSize: '14px', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: drawState !== 'idle' && drawState !== 'done' ? 'not-allowed' : 'pointer', background: drawState === 'done' ? 'var(--green)' : drawState !== 'idle' ? 'var(--gold2)' : 'var(--gold)', color: '#fff', fontFamily: 'inherit', opacity: drawState === 'seed' || drawState === 'running' ? 0.8 : 1 }}
                      onClick={runDraw} disabled={drawState !== 'idle' && drawState !== 'done'}>
                      {drawState === 'idle' && '🎲 추첨 실행'}
                      {drawState === 'seed' && '⏳ Seed 수집 중...'}
                      {drawState === 'running' && '🎲 추첨 알고리즘 실행 중...'}
                      {drawState === 'done' && '🎉 추첨 완료! 당첨자 3명'}
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <button className="btn-outline" style={{ justifyContent: 'center', padding: '10px', fontSize: '13px', borderRadius: '10px' }} onClick={() => showToast('명단 CSV 다운로드 중...')}>📥 명단 내보내기</button>
                      <button className="btn-outline" style={{ justifyContent: 'center', padding: '10px', fontSize: '13px', borderRadius: '10px' }} onClick={() => setShowUpload(true)}>📤 참가자 업로드</button>
                    </div>
                    <button className="btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '14px', borderRadius: '12px' }} onClick={() => showToast('방송이 시작되었습니다. 🔴')}>
                      🔴 방송 시작 / 종료
                    </button>
                  </div>
                </div>

                {/* Event list */}
                <div className="card" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>내 이벤트 목록</h3>
                  {MOCK_EVENTS.map(ev => (
                    <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--ivory2)' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: ev.status === 'live' ? 'var(--red)' : ev.status === 'done' ? 'var(--green)' : 'var(--gold3)' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text4)', marginTop: '2px' }}>참가 {ev.participantCount.toLocaleString()} · {ev.prize}</div>
                        <div style={{ marginTop: '6px', height: '3px', borderRadius: '2px', background: 'var(--ivory2)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '2px', width: ev.status === 'done' ? '100%' : ev.status === 'live' ? '72%' : '40%', background: ev.status === 'done' ? 'var(--green)' : 'linear-gradient(90deg,var(--gold),var(--gold4))' }} />
                        </div>
                      </div>
                      <span className={ev.status === 'live' ? 'badge-live' : ev.status === 'done' ? 'badge-cert' : 'badge-soon'}>
                        {ev.status === 'live' ? 'LIVE' : ev.status === 'done' ? '완료' : '준비중'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>방송 통계</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[{ l:'시청자',v:'4,287',c:'var(--gold)'},{l:'평균 시청',v:'18:32',c:'var(--text)'},{l:'전환율',v:'33.4%',c:'var(--green)'},{l:'이의 신청',v:'0건',c:'var(--text)'}].map(({l,v,c}) => (
                      <div key={l} style={{ borderRadius: '10px', padding: '12px', textAlign: 'center', background: 'var(--ivory)' }}>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: c }}>{v}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text4)', marginTop: '3px' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>최근 활동</h3>
                  {[
                    {c:'var(--green)',t:'참가자 명단 잠금 완료 · 12,847명',ts:'13:59 UTC'},
                    {c:'var(--gold)',t:'방송 시작 · LIVE 중',ts:'14:00 UTC'},
                    {c:'var(--text4)',t:'참가자 CSV 업로드 · 12,847행',ts:'13:45 UTC'},
                  ].map(({c,t,ts},i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--ivory2)' : 'none' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, flexShrink: 0, marginTop: '5px' }} />
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text2)' }}>{t}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text4)', marginTop: '2px' }}>{ts}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab !== 'dashboard' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', borderRadius: '20px', border: '2px dashed var(--ivory3)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚧</div>
              <p style={{ color: 'var(--text4)', fontSize: '14px' }}>{NAV_ITEMS.find(n => n.id === tab)?.label} 페이지 준비 중</p>
            </div>
          </div>
        )}
      </main>

      {/* 이벤트 생성 모달 */}
      {showNewEvent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget) setShowNewEvent(false) }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>새 이벤트 만들기</h3>
            <p style={{ fontSize: '13px', color: 'var(--text4)', marginBottom: '22px' }}>기본 정보를 입력하세요.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['이벤트명','text','예: 여름 경품 이벤트'],['경품','text','예: 아이패드 Pro × 3명']].map(([label,type,ph]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>{label}</label>
                  <input type={type} placeholder={ph} className="form-input" />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>마감일</label>
                  <input type="date" className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>방송 시각</label>
                  <input type="time" defaultValue="14:00" className="form-input" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              <button className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: '12px' }} onClick={() => setShowNewEvent(false)}>취소</button>
              <button className="btn-gold" style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: '12px' }} onClick={() => { setShowNewEvent(false); showToast('이벤트가 생성되었습니다.') }}>생성하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 업로드 모달 */}
      {showUpload && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget) setShowUpload(false) }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>참가자 업로드</h3>
            <p style={{ fontSize: '13px', color: 'var(--text4)', marginBottom: '22px' }}>CSV 파일을 업로드하세요.</p>
            <div style={{ border: '2px dashed var(--ivory4)', borderRadius: '14px', padding: '32px', textAlign: 'center', marginBottom: '14px', cursor: 'pointer' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📁</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>CSV 드래그 또는 클릭</div>
              <div style={{ fontSize: '11px', color: 'var(--text4)', marginTop: '4px' }}>UUID, 참가시각(UTC), 참가경로</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: '12px' }} onClick={() => setShowUpload(false)}>취소</button>
              <button className="btn-gold" style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: '12px' }} onClick={() => { setShowUpload(false); showToast('업로드 완료! 12,847명 확인됨') }}>업로드</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
