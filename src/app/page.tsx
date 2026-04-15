import Link from 'next/link'
import { MOCK_EVENTS } from '@/lib/mockData'

const STATUS_MAP: Record<string,{label:string;cls:string}> = {
  live:{label:'● LIVE',cls:'badge-live'},
  locked:{label:'1시간 후',cls:'badge-soon'},
  active:{label:'참가중',cls:'badge-soon'},
  done:{label:'종료',cls:'badge-done'},
  draft:{label:'준비중',cls:'badge-done'},
}
const EMOJI:Record<string,string> = {samsung:'🏢',hyundai:'🚗',cu:'🏪',baemin:'🛵'}

export default function HomePage() {
  const live = MOCK_EVENTS.find(e => e.status === 'live')

  return (
    <>
      <header className="app-header">
        <div style={{display:'flex',alignItems:'center',gap:'9px',flex:1}}>
          <div style={{width:'30px',height:'30px',borderRadius:'9px',background:'var(--yellow)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg viewBox="0 0 20 20" fill="#111" width="15" height="15"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/></svg>
          </div>
          <span style={{fontSize:'17px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.4px'}}>모두의 추첨</span>
        </div>
        <Link href="/signup" className="btn-primary" style={{fontSize:'13px',padding:'8px 16px',borderRadius:'10px'}}>
          무료 시작
        </Link>
      </header>

      <div className="page-content">

        {/* 히어로 */}
        {live && (
          <div style={{margin:'12px',borderRadius:'22px',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,.1)'}}>
            <div className="hero-dark" style={{height:'175px',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'6px',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:'radial-gradient(#fee500 1px,transparent 1px)',backgroundSize:'16px 16px'}}/>
              <div style={{position:'absolute',top:'11px',left:'11px',background:'rgba(239,68,68,.18)',color:'var(--red)',borderRadius:'7px',padding:'3px 9px',fontSize:'10px',fontWeight:800,display:'flex',alignItems:'center',gap:'4px'}}>
                <span className="animate-live" style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--red)',display:'inline-block'}}/>
                LIVE
              </div>
              <div style={{position:'absolute',top:'11px',right:'11px',background:'rgba(0,0,0,.4)',color:'rgba(255,255,255,.7)',borderRadius:'7px',padding:'3px 8px',fontSize:'10px'}}>
                👁 {live.streamViewers?.toLocaleString()}명
              </div>
              <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'var(--yellow)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1}}>
                <svg viewBox="0 0 24 24" fill="#111" width="22" height="22" style={{marginLeft:'3px'}}><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div style={{fontSize:'17px',fontWeight:900,color:'#fff',letterSpacing:'-.4px',zIndex:1}}>{live.prize}</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,.45)',zIndex:1}}>{live.companyName} · {live.winnerCount}명 당첨</div>
            </div>
            <div style={{background:'var(--white)',padding:'12px 14px',borderTop:'1px solid var(--border)'}}>
              <div style={{background:'rgba(254,229,0,.1)',border:'1px solid rgba(254,229,0,.3)',borderRadius:'9px',padding:'7px 10px',marginBottom:'9px'}}>
                <div style={{fontSize:'8px',fontWeight:700,letterSpacing:'.7px',textTransform:'uppercase',color:'#8a7000',marginBottom:'3px'}}>SHA-256 잠금완료</div>
                <div style={{fontFamily:'monospace',fontSize:'9px',color:'#7a6600'}}>{live.participantsHash?.slice(0,32)}...{live.participantsHash?.slice(-6)}</div>
              </div>
              <Link href="/events" className="btn-primary" style={{width:'100%',fontSize:'14px',padding:'12px',borderRadius:'13px'}}>
                방송 참여하기 →
              </Link>
            </div>
          </div>
        )}

        {/* 통계 */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',margin:'0 12px',borderRadius:'16px',overflow:'hidden',border:'1px solid var(--border)',background:'var(--border)'}}>
          {[{n:'247',l:'누적 추첨',y:true},{n:'100%',l:'검증 가능',y:true},{n:'0건',l:'조작 사례',y:false}].map(({n,l,y})=>(
            <div key={l} style={{background:'var(--white)',padding:'12px 8px',textAlign:'center'}}>
              <div style={{fontSize:'18px',fontWeight:900,color:y?'var(--dark)':'var(--dark)',letterSpacing:'-.5px'}}>{n}</div>
              <div style={{fontSize:'9px',color:'var(--text4)',marginTop:'2px',textTransform:'uppercase',letterSpacing:'.3px',fontWeight:600}}>{l}</div>
            </div>
          ))}
        </div>

        {/* 오늘의 추첨 */}
        <div style={{padding:'16px 14px 0'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div style={{width:'14px',height:'14px',borderRadius:'4px',background:'var(--yellow)'}}/>
              <span style={{fontSize:'15px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.3px'}}>오늘의 추첨</span>
            </div>
            <Link href="/events" style={{fontSize:'13px',fontWeight:700,color:'var(--text3)',textDecoration:'none'}}>전체보기 →</Link>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {MOCK_EVENTS.map(ev => {
              const st = STATUS_MAP[ev.status] ?? STATUS_MAP.draft
              const isLive = ev.status === 'live'
              const isDone = ev.status === 'done'
              const kst = new Date(ev.scheduledAt).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Seoul'})
              return (
                <div key={ev.id} className="card" style={{padding:'13px 14px',opacity:isDone?.65:1,borderColor:isLive?'rgba(254,229,0,.6)':undefined,background:isLive?'linear-gradient(135deg,#fffde6,#fff)':undefined}}>
                  <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                    <div style={{textAlign:'center',minWidth:'40px',paddingTop:'2px',flexShrink:0}}>
                      {isLive ? (
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'3px'}}>
                          <span className="animate-live" style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--red)',display:'inline-block'}}/>
                          <span style={{fontSize:'10px',fontWeight:800,color:'var(--red)'}}>LIVE</span>
                        </div>
                      ) : (
                        <span style={{fontSize:'13px',fontWeight:700,color:'var(--text3)'}}>{kst}</span>
                      )}
                    </div>
                    <div style={{width:'38px',height:'38px',borderRadius:'11px',background:'var(--bg)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>
                      {EMOJI[ev.companyId]??'🏢'}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'3px',flexWrap:'wrap'}}>
                        <span style={{fontSize:'14px',fontWeight:800,color:'var(--dark)'}}>{ev.companyName}</span>
                        <span className={st.cls}>{st.label}</span>
                        <span className="badge-cert">✓</span>
                      </div>
                      <div style={{fontSize:'13px',fontWeight:600,color:'var(--text2)',marginBottom:'5px'}}>{ev.prize} — {ev.winnerCount}명</div>
                      <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                        <span style={{fontSize:'11px',color:'var(--text4)'}}>👥 {ev.participantCount.toLocaleString()}</span>
                        {ev.participantsHash && <span style={{fontSize:'11px',color:'var(--green)'}}>🔒 잠금완료</span>}
                      </div>
                    </div>
                    <div style={{flexShrink:0}}>
                      {isLive && <Link href="/events" className="btn-primary" style={{fontSize:'12px',padding:'7px 13px',borderRadius:'9px'}}>시청</Link>}
                      {isDone && <Link href={`/verify/${ev.id}`} style={{fontSize:'12px',padding:'7px 13px',borderRadius:'9px',fontWeight:700,textDecoration:'none',background:'var(--greenbg)',color:'var(--green)',display:'inline-block'}}>검증</Link>}
                      {!isLive&&!isDone && <button style={{fontSize:'12px',padding:'7px 13px',borderRadius:'9px',fontWeight:700,border:'1px solid var(--border2)',background:'var(--white)',color:'var(--text3)',cursor:'pointer',fontFamily:'inherit'}}>알림</button>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* How it works */}
        <div style={{padding:'20px 14px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'12px'}}>
            <div style={{width:'14px',height:'14px',borderRadius:'4px',background:'var(--yellow)'}}/>
            <span style={{fontSize:'15px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.3px'}}>어떻게 작동하나요</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            {[
              {icon:'📋',step:'01',title:'명단 잠금',desc:'SHA-256 해시'},
              {icon:'₿',step:'02',title:'Bitcoin Seed',desc:'외부 자동 수집'},
              {icon:'⚙️',step:'03',title:'결정론적 추첨',desc:'동일 입력=동일 결과'},
              {icon:'📄',step:'04',title:'증명서 발급',desc:'누구나 검증 가능'},
            ].map(({icon,step,title,desc})=>(
              <div key={step} className="card" style={{padding:'14px',textAlign:'center'}}>
                <div style={{width:'42px',height:'42px',borderRadius:'13px',background:'var(--yellow)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 9px',fontSize:'20px'}}>
                  {icon}
                </div>
                <div style={{fontSize:'10px',fontWeight:800,color:'#8a7000',letterSpacing:'.5px',textTransform:'uppercase',marginBottom:'3px'}}>Step {step}</div>
                <div style={{fontSize:'13px',fontWeight:800,color:'var(--dark)',marginBottom:'2px'}}>{title}</div>
                <div style={{fontSize:'11px',color:'var(--text4)',lineHeight:1.4}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 배너 */}
        <div style={{margin:'16px 14px 0',borderRadius:'20px',background:'var(--yellow)',padding:'20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-20px',right:'-20px',width:'100px',height:'100px',borderRadius:'50%',background:'rgba(0,0,0,.06)'}}/>
          <div style={{position:'relative'}}>
            <div style={{fontSize:'11px',fontWeight:800,color:'rgba(0,0,0,.4)',letterSpacing:'.5px',textTransform:'uppercase',marginBottom:'5px'}}>첫 1회 무료</div>
            <div style={{fontSize:'20px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.5px',lineHeight:1.2,marginBottom:'14px'}}>
              지금 바로<br/>무료로 시작하세요
            </div>
            <Link href="/signup" className="btn-dark" style={{fontSize:'14px',padding:'11px 22px',borderRadius:'12px'}}>
              무료 시작하기 →
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
