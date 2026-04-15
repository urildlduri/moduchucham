import Link from 'next/link'
import { MOCK_EVENTS } from '@/lib/mockData'

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  live:    { label: '● LIVE', cls: 'badge-live' },
  locked:  { label: '1시간 후', cls: 'badge-soon' },
  active:  { label: '참가중', cls: 'badge-soon' },
  done:    { label: '종료', cls: 'badge-done' },
  draft:   { label: '준비중', cls: 'badge-done' },
}
const EMOJI: Record<string, string> = { samsung:'🏢', hyundai:'🚗', cu:'🏪', baemin:'🛵' }

export default function HomePage() {
  const live = MOCK_EVENTS.find(e => e.status === 'live')
  const rest = MOCK_EVENTS.filter(e => e.status !== 'live')

  return (
    <div className="page-wrap" style={{ background: 'var(--ivory)' }}>

      {/* 앱 헤더 */}
      <header className="app-header">
        <div style={{ display:'flex', alignItems:'center', gap:'8px', flex:1 }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'9px', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg viewBox="0 0 20 20" fill="white" width="15" height="15">
              <path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/>
            </svg>
          </div>
          <span style={{ fontSize:'17px', fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>모두의 추첨</span>
        </div>
        <Link href="/signup" className="btn-gold" style={{ fontSize:'13px', padding:'8px 16px', borderRadius:'10px' }}>
          무료 시작
        </Link>
      </header>

      <div style={{ padding:'0 0 16px' }}>

        {/* LIVE 히어로 카드 */}
        {live && (
          <div style={{ margin:'14px 14px 0', borderRadius:'22px', overflow:'hidden', background:'var(--dark)', boxShadow:'0 8px 32px rgba(0,0,0,.18)' }}>
            {/* 비디오 영역 */}
            <div style={{ height:'180px', background:'linear-gradient(150deg,#14110d,#28231a,#14110d)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, opacity:.05, backgroundImage:'radial-gradient(var(--gold4) 1px,transparent 1px)', backgroundSize:'18px 18px' }} />
              {/* Live badge */}
              <div style={{ position:'absolute', top:'12px', left:'12px', background:'var(--red)', borderRadius:'7px', padding:'4px 10px', display:'flex', alignItems:'center', gap:'5px' }}>
                <span className="animate-live" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'white', display:'inline-block' }}/>
                <span style={{ fontSize:'11px', fontWeight:800, color:'white', letterSpacing:'.8px' }}>LIVE</span>
              </div>
              <div style={{ position:'absolute', top:'12px', right:'12px', background:'rgba(0,0,0,.4)', borderRadius:'7px', padding:'4px 9px', fontSize:'11px', color:'rgba(255,255,255,.7)' }}>
                👁 {live.streamViewers?.toLocaleString()}명
              </div>
              {/* Play */}
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(184,146,42,.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1 }}>
                <svg viewBox="0 0 24 24" fill="white" width="22" height="22" style={{ marginLeft:'3px' }}><path d="M8 5v14l11-7z"/></svg>
              </div>
              {/* Prize overlay */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px', background:'linear-gradient(to top,rgba(0,0,0,.8),transparent)' }}>
                <div style={{ fontSize:'15px', fontWeight:800, color:'white', letterSpacing:'-0.3px' }}>{live.prize}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,.5)', marginTop:'2px' }}>{live.companyName} · {live.winnerCount}명 당첨</div>
              </div>
            </div>
            {/* 하단 정보 */}
            <div style={{ padding:'12px 14px' }}>
              <div style={{ background:'rgba(184,146,42,.08)', border:'1px solid rgba(184,146,42,.15)', borderRadius:'9px', padding:'9px 11px', marginBottom:'10px' }}>
                <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase', letterSpacing:'.8px', color:'rgba(255,255,255,.3)', marginBottom:'4px' }}>SHA-256 잠금완료</div>
                <div style={{ fontFamily:'monospace', fontSize:'10px', color:'var(--gold4)', opacity:.7 }}>
                  {live.participantsHash?.slice(0,32)}...
                </div>
              </div>
              <Link href="/events" className="btn-gold" style={{ width:'100%', fontSize:'14px', padding:'12px', borderRadius:'12px' }}>
                방송 참여하기 →
              </Link>
            </div>
          </div>
        )}

        {/* 통계 배너 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'var(--ivory3)', borderRadius:'16px', overflow:'hidden', margin:'14px 14px 0' }}>
          {[
            { n:'247', l:'누적 추첨' },
            { n:'100%', l:'검증 가능' },
            { n:'0건', l:'조작 사례' },
          ].map(({ n, l }) => (
            <div key={l} style={{ background:'white', padding:'14px 8px', textAlign:'center' }}>
              <div style={{ fontSize:'20px', fontWeight:900, color:'var(--gold)', letterSpacing:'-0.5px' }}>{n}</div>
              <div style={{ fontSize:'10px', color:'var(--text4)', marginTop:'2px', textTransform:'uppercase', letterSpacing:'.3px' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* 오늘의 추첨 */}
        <div style={{ padding:'20px 14px 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'2px' }}>
                <div style={{ width:'16px', height:'2px', background:'var(--gold)', borderRadius:'1px' }}/>
                <span style={{ fontSize:'11px', fontWeight:700, color:'var(--gold)', textTransform:'uppercase', letterSpacing:'.8px' }}>오늘의 추첨</span>
              </div>
              <h2 style={{ fontSize:'18px', fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
                6월 1일 <span style={{ color:'var(--gold)' }}>{MOCK_EVENTS.length}건</span>
              </h2>
            </div>
            <Link href="/events" style={{ fontSize:'13px', fontWeight:700, color:'var(--gold)', textDecoration:'none' }}>전체보기</Link>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {MOCK_EVENTS.map(ev => {
              const st = STATUS_MAP[ev.status] ?? STATUS_MAP.draft
              const isLive = ev.status === 'live'
              const isDone = ev.status === 'done'
              const kst = new Date(ev.scheduledAt).toLocaleTimeString('ko-KR', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Seoul' })
              return (
                <div key={ev.id} className="card" style={{ padding:'14px 15px', opacity: isDone ? .65 : 1, borderColor: isLive ? 'rgba(184,146,42,.35)' : undefined, background: isLive ? 'linear-gradient(135deg,var(--gold7),white)' : undefined }}>
                  <div style={{ display:'flex', gap:'11px', alignItems:'flex-start' }}>
                    {/* 시간 */}
                    <div style={{ textAlign:'center', minWidth:'44px', paddingTop:'2px' }}>
                      {isLive ? (
                        <div>
                          <span className="animate-live" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--red)', display:'inline-block', marginRight:'3px', verticalAlign:'middle' }}/>
                          <span style={{ fontSize:'10px', fontWeight:800, color:'var(--red)' }}>LIVE</span>
                        </div>
                      ) : (
                        <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text3)' }}>{kst}</div>
                      )}
                    </div>
                    {/* 로고 */}
                    <div style={{ width:'40px', height:'40px', borderRadius:'11px', background:'var(--ivory2)', border:'1px solid var(--ivory3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>
                      {EMOJI[ev.companyId] ?? '🏢'}
                    </div>
                    {/* 내용 */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'4px', flexWrap:'wrap' }}>
                        <span style={{ fontSize:'14px', fontWeight:700, color:'var(--text)' }}>{ev.companyName}</span>
                        <span className={st.cls}>{st.label}</span>
                        <span className="badge-cert">✓</span>
                      </div>
                      <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'6px' }}>
                        {ev.prize} — {ev.winnerCount}명
                      </div>
                      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                        <span style={{ fontSize:'11px', color:'var(--text4)' }}>👥 {ev.participantCount.toLocaleString()}</span>
                        {ev.participantsHash && <span style={{ fontSize:'11px', color:'var(--green)' }}>🔒 잠금완료</span>}
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div style={{ flexShrink:0 }}>
                      {isLive && (
                        <Link href="/events" className="btn-gold" style={{ fontSize:'12px', padding:'7px 14px', borderRadius:'10px' }}>시청</Link>
                      )}
                      {isDone && (
                        <Link href={`/verify/${ev.id}`} style={{ fontSize:'12px', padding:'7px 14px', borderRadius:'10px', fontWeight:700, textDecoration:'none', background:'rgba(26,107,58,.08)', color:'var(--green)', display:'inline-block' }}>검증</Link>
                      )}
                      {!isLive && !isDone && (
                        <button style={{ fontSize:'12px', padding:'7px 14px', borderRadius:'10px', fontWeight:700, border:'1px solid var(--ivory3)', background:'white', color:'var(--text3)', cursor:'pointer', fontFamily:'inherit' }}>알림</button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding:'24px 14px 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'14px' }}>
            <div style={{ width:'16px', height:'2px', background:'var(--gold)', borderRadius:'1px' }}/>
            <span style={{ fontSize:'11px', fontWeight:700, color:'var(--gold)', textTransform:'uppercase', letterSpacing:'.8px' }}>어떻게 작동하나요</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            {[
              { icon:'📋', step:'01', title:'명단 잠금', desc:'SHA-256 해시로 위변조 방지' },
              { icon:'₿', step:'02', title:'Bitcoin Seed', desc:'운영자가 모르는 외부 값' },
              { icon:'⚙️', step:'03', title:'결정론적 추첨', desc:'동일 입력 = 동일 결과' },
              { icon:'📄', step:'04', title:'증명서 발급', desc:'누구나 직접 재현 가능' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="card" style={{ padding:'14px', textAlign:'center' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'13px', background:'var(--gold7)', border:'1px solid var(--gold6)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', fontSize:'20px' }}>
                  {icon}
                </div>
                <div style={{ fontSize:'10px', fontWeight:800, color:'var(--gold)', letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'4px' }}>Step {step}</div>
                <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'3px' }}>{title}</div>
                <div style={{ fontSize:'11px', color:'var(--text4)', lineHeight:1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 요금제 배너 */}
        <div style={{ margin:'20px 14px 0', borderRadius:'20px', background:'var(--dark)', padding:'20px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'radial-gradient(var(--gold4) 1px,transparent 1px)', backgroundSize:'18px 18px' }}/>
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'11px', fontWeight:700, color:'var(--gold4)', letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'6px' }}>첫 1회 무료</div>
            <div style={{ fontSize:'20px', fontWeight:900, color:'white', letterSpacing:'-0.5px', lineHeight:1.2, marginBottom:'12px' }}>
              지금 바로<br/>무료로 시작하세요
            </div>
            <Link href="/signup" className="btn-gold" style={{ fontSize:'14px', padding:'11px 22px', borderRadius:'12px' }}>
              무료 시작하기 →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
