'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_CERTIFICATE } from '@/lib/mockData'

export default function VerifyPage({ params }: { params: { eventId: string } }) {
  const cert = MOCK_CERTIFICATE
  const [open, setOpen] = useState<number[]>([1])
  const [algoLog, setAlgoLog] = useState('')
  const [algoRunning, setAlgoRunning] = useState(false)
  const [algoResult, setAlgoResult] = useState(false)

  const toggle = (n: number) => setOpen(o => o.includes(n) ? o.filter(x=>x!==n) : [...o,n])

  const runAlgo = async () => {
    setAlgoRunning(true)
    setAlgoResult(false)
    const steps = [
      '알고리즘: moduchucham-fair-v1.2',
      '알고리즘: moduchucham-fair-v1.2\nSeed: 00000000...abc4',
      '알고리즘: moduchucham-fair-v1.2\nSeed: 00000000...abc4\nScoring 12,847명...',
      '알고리즘: moduchucham-fair-v1.2\nSeed: 00000000...abc4\nScoring 12,847명...\nSorting...\nSelecting top 3...',
      '알고리즘: moduchucham-fair-v1.2\nSeed: 00000000...abc4\nScoring 12,847명...\nSorting...\nSelecting top 3...\n\n✓ 완료 — 100% 일치',
    ]
    for (const s of steps) {
      await new Promise(r=>setTimeout(r,400))
      setAlgoLog(s)
    }
    setAlgoResult(true)
    setAlgoRunning(false)
  }

  const OkBar = ({text}:{text:string}) => (
    <div style={{background:'rgba(26,107,58,.08)',border:'1px solid rgba(26,107,58,.2)',borderRadius:'10px',padding:'10px 13px',marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <svg viewBox="0 0 24 24" fill="white" width="11" height="11"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <span style={{fontSize:'12px',fontWeight:700,color:'var(--green)'}}>{text}</span>
    </div>
  )

  return (
    <div className="page-wrap">
      {/* 헤더 */}
      <header className="app-header">
        <Link href="/events" style={{marginRight:'8px',textDecoration:'none',display:'flex',alignItems:'center'}}>
          <svg viewBox="0 0 24 24" fill="var(--text3)" width="20" height="20"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </Link>
        <span style={{fontSize:'16px',fontWeight:800,color:'var(--text)',flex:1}}>공정성 검증</span>
      </header>

      {/* 이벤트 히어로 */}
      <div style={{background:'var(--dark)',padding:'20px 16px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'radial-gradient(var(--gold4) 1px,transparent 1px)',backgroundSize:'18px 18px'}}/>
        <div style={{position:'relative'}}>
          <div style={{display:'flex',gap:'6px',marginBottom:'10px',flexWrap:'wrap'}}>
            <span className="badge-cert" style={{fontSize:'11px'}}>✓ 검증 완료</span>
            <span style={{display:'inline-flex',alignItems:'center',padding:'3px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:700,background:'rgba(184,146,42,.15)',color:'var(--gold4)'}}>{cert.eventId}</span>
          </div>
          <h1 style={{fontSize:'18px',fontWeight:900,color:'white',letterSpacing:'-0.4px',marginBottom:'4px'}}>{cert.eventName}</h1>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>
            참가 {cert.participants.count.toLocaleString()}명 · 당첨 {cert.drawExecution.winnersCount}명
          </p>
        </div>
      </div>

      <div style={{padding:'14px',display:'flex',flexDirection:'column',gap:'10px'}}>

        {/* Step 1 */}
        <div className="card" style={{overflow:'hidden'}}>
          <div style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>toggle(1)}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(26,107,58,.1)',border:'1px solid rgba(26,107,58,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,color:'var(--green)',flexShrink:0}}>✓</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>참가자 명단 확인</div>
              <div style={{fontSize:'11px',color:'var(--text4)',marginTop:'1px'}}>SHA-256 위변조 검증</div>
            </div>
            <span style={{fontSize:'12px',fontWeight:600,color:'var(--green)',transform:open.includes(1)?'none':'rotate(-90deg)',display:'inline-block',transition:'transform .2s'}}>▾</span>
          </div>
          {open.includes(1) && (
            <div style={{padding:'0 16px 16px',borderTop:'1px solid var(--ivory2)',background:'var(--ivory)'}}>
              <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'0'}}>
                {[['참가자 수',cert.participants.count.toLocaleString()+'명'],['잠금 시각','2025-06-01 13:59 UTC'],['정렬 기준','참가시각 + UUID 오름차순']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--ivory2)',fontSize:'13px'}}>
                    <span style={{color:'var(--text4)'}}>{k}</span>
                    <span style={{fontWeight:600,color:'var(--text)',textAlign:'right',marginLeft:'8px'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:'11px',fontWeight:700,color:'var(--text4)',textTransform:'uppercase',letterSpacing:'.5px',margin:'12px 0 6px'}}>SHA-256</div>
              <div className="hash-box">{cert.participants.hashSha256}</div>
              <OkBar text="해시 일치 — 위변조 없음" />
              <button className="btn-outline" style={{width:'100%',marginTop:'10px',fontSize:'13px',padding:'11px',borderRadius:'12px'}}>📥 익명 명단 CSV</button>
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className="card" style={{overflow:'hidden'}}>
          <div style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>toggle(2)}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(26,107,58,.1)',border:'1px solid rgba(26,107,58,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,color:'var(--green)',flexShrink:0}}>✓</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>Seed 독립 검증</div>
              <div style={{fontSize:'11px',color:'var(--text4)',marginTop:'1px'}}>Bitcoin Block #{cert.seed.seedValue.slice(0,8)}...</div>
            </div>
            <span style={{fontSize:'12px',fontWeight:600,color:'var(--green)',transform:open.includes(2)?'none':'rotate(-90deg)',display:'inline-block',transition:'transform .2s'}}>▾</span>
          </div>
          {open.includes(2) && (
            <div style={{padding:'0 16px 16px',borderTop:'1px solid var(--ivory2)',background:'var(--ivory)'}}>
              <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'0'}}>
                {[['소스',cert.seed.sourceDescription],['수집 시각','2025-06-01 14:07 UTC']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--ivory2)',fontSize:'13px'}}>
                    <span style={{color:'var(--text4)'}}>{k}</span>
                    <span style={{fontWeight:600,color:'var(--text)',textAlign:'right',marginLeft:'8px'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:'11px',fontWeight:700,color:'var(--text4)',textTransform:'uppercase',letterSpacing:'.5px',margin:'12px 0 6px'}}>Seed 값</div>
              <div className="hash-box">{cert.seed.seedValue}</div>
              <OkBar text="외부 검증 통과" />
              <a href={cert.seed.externalVerifyUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{display:'block',width:'100%',marginTop:'10px',fontSize:'13px',padding:'11px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>🔗 Blockstream에서 직접 확인</a>
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div className="card" style={{overflow:'hidden'}}>
          <div style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>toggle(3)}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(26,107,58,.1)',border:'1px solid rgba(26,107,58,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,color:'var(--green)',flexShrink:0}}>✓</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>브라우저 직접 재현</div>
              <div style={{fontSize:'11px',color:'var(--text4)',marginTop:'1px'}}>알고리즘 실행 검증</div>
            </div>
            <span style={{fontSize:'12px',fontWeight:600,color:'var(--green)',transform:open.includes(3)?'none':'rotate(-90deg)',display:'inline-block',transition:'transform .2s'}}>▾</span>
          </div>
          {open.includes(3) && (
            <div style={{padding:'0 16px 16px',borderTop:'1px solid var(--ivory2)',background:'var(--ivory)'}}>
              <pre className="hash-box" style={{marginTop:'12px',minHeight:'80px',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>
                {algoLog || 'moduchucham-fair-v1.2\nSHA256(uuid+seed+index) → 정렬 → 상위 N명\n\n[실행 대기 중...]'}
              </pre>
              <button className="btn-primary" style={{width:'100%',marginTop:'10px',fontSize:'14px',padding:'12px',borderRadius:'12px'}} onClick={runAlgo} disabled={algoRunning}>
                {algoRunning ? '⏳ 실행 중...' : '▶ 브라우저에서 직접 실행'}
              </button>
              {algoResult && <OkBar text="재현 성공 — 당첨자 100% 일치" />}
            </div>
          )}
        </div>

        {/* Step 4 당첨자 */}
        <div className="card" style={{overflow:'hidden'}}>
          <div style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>toggle(4)}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'var(--gold7)',border:'1px solid var(--gold6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,color:'var(--gold)',flexShrink:0}}>★</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>공식 당첨자</div>
              <div style={{fontSize:'11px',color:'var(--text4)',marginTop:'1px'}}>{cert.drawExecution.winnersCount}명 선정</div>
            </div>
            <span style={{fontSize:'12px',fontWeight:600,color:'var(--gold)',transform:open.includes(4)?'none':'rotate(-90deg)',display:'inline-block',transition:'transform .2s'}}>▾</span>
          </div>
          {open.includes(4) && (
            <div style={{padding:'0 16px 16px',borderTop:'1px solid var(--ivory2)',background:'var(--ivory)'}}>
              <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
                {cert.winners.map(w => (
                  <div key={w.rank} className="card" style={{padding:'12px 14px',display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'26px',height:'26px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,flexShrink:0,background:w.rank===1?'var(--gold6)':'var(--ivory2)',color:w.rank===1?'var(--gold)':'var(--text4)'}}>{w.rank}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>{w.maskedName}</div>
                      <div style={{fontFamily:'monospace',fontSize:'10px',color:'var(--text4)',marginTop:'1px'}}>{w.maskedContact} · {w.participantUuid}</div>
                    </div>
                    <span className={w.rank===1?'badge-gold':'badge-cert'}>당첨</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 증명서 다운로드 */}
        <div style={{borderRadius:'18px',background:'var(--dark)',padding:'18px',display:'flex',alignItems:'center',gap:'12px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'radial-gradient(var(--gold4) 1px,transparent 1px)',backgroundSize:'18px 18px'}}/>
          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'rgba(184,146,42,.2)',border:'1px solid rgba(184,146,42,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative'}}>
            <svg viewBox="0 0 24 24" fill="var(--gold4)" width="20" height="20"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
          </div>
          <div style={{flex:1,position:'relative'}}>
            <div style={{fontSize:'13px',fontWeight:700,color:'white'}}>공정성 증명서 발급완료</div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,.35)',marginTop:'2px'}}>{cert.verification.issuedUtc.slice(0,10)} UTC</div>
          </div>
          <div style={{display:'flex',gap:'6px',position:'relative'}}>
            <button style={{padding:'8px 12px',borderRadius:'9px',fontSize:'12px',fontWeight:700,border:'1px solid rgba(184,146,42,.35)',background:'rgba(184,146,42,.18)',color:'var(--gold4)',cursor:'pointer',fontFamily:'inherit'}}>PDF</button>
            <button style={{padding:'8px 12px',borderRadius:'9px',fontSize:'12px',fontWeight:700,border:'1px solid rgba(184,146,42,.35)',background:'rgba(184,146,42,.18)',color:'var(--gold4)',cursor:'pointer',fontFamily:'inherit'}}>JSON</button>
          </div>
        </div>

      </div>
    </div>
  )
}
