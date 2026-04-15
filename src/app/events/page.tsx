import Link from 'next/link'
import { MOCK_EVENTS } from '@/lib/mockData'

const STATUS_MAP: Record<string,{label:string;cls:string}> = {
  live:{label:'● LIVE',cls:'badge-live'},locked:{label:'예정',cls:'badge-soon'},
  active:{label:'참가중',cls:'badge-soon'},done:{label:'종료',cls:'badge-done'},draft:{label:'준비중',cls:'badge-done'},
}
const EMOJI:Record<string,string> = {samsung:'🏢',hyundai:'🚗',cu:'🏪',baemin:'🛵'}

export default function EventsPage() {
  return (
    <div className="page-wrap">
      <header className="app-header">
        <span style={{fontSize:'17px',fontWeight:800,color:'var(--text)',letterSpacing:'-0.4px'}}>추첨 일정</span>
      </header>

      <div style={{padding:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'16px'}}>
          <div style={{width:'16px',height:'2px',background:'var(--gold)',borderRadius:'1px'}}/>
          <span style={{fontSize:'11px',fontWeight:700,color:'var(--gold)',textTransform:'uppercase',letterSpacing:'.8px'}}>오늘 · 6월 1일</span>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {MOCK_EVENTS.map(ev => {
            const st = STATUS_MAP[ev.status] ?? STATUS_MAP.draft
            const isLive = ev.status === 'live'
            const isDone = ev.status === 'done'
            const kst = new Date(ev.scheduledAt).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Seoul'})
            return (
              <div key={ev.id} className="card" style={{padding:'16px',opacity:isDone?.65:1,borderColor:isLive?'rgba(184,146,42,.35)':undefined,background:isLive?'linear-gradient(135deg,var(--gold7),white)':undefined}}>
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                  <div style={{textAlign:'center',minWidth:'44px',paddingTop:'2px'}}>
                    {isLive ? (
                      <div><span className="animate-live" style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--red)',display:'inline-block',marginRight:'3px',verticalAlign:'middle'}}/><span style={{fontSize:'10px',fontWeight:800,color:'var(--red)'}}>LIVE</span></div>
                    ) : (
                      <div style={{fontSize:'14px',fontWeight:700,color:'var(--text3)'}}>{kst}</div>
                    )}
                  </div>
                  <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'var(--ivory2)',border:'1px solid var(--ivory3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>
                    {EMOJI[ev.companyId]??'🏢'}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'5px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'15px',fontWeight:800,color:'var(--text)'}}>{ev.companyName}</span>
                      <span className={st.cls}>{st.label}</span>
                      <span className="badge-cert">✓ 인증</span>
                    </div>
                    <div style={{fontSize:'14px',fontWeight:600,color:'var(--text2)',marginBottom:'8px'}}>{ev.prize} — {ev.winnerCount}명</div>
                    <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'12px',color:'var(--text4)'}}>👥 {ev.participantCount.toLocaleString()}명</span>
                      {ev.streamViewers && isLive && <span style={{fontSize:'12px',color:'var(--text4)'}}>👁 {ev.streamViewers.toLocaleString()}명</span>}
                      {ev.participantsHash && <span style={{fontSize:'12px',color:'var(--green)'}}>🔒 잠금완료</span>}
                    </div>
                  </div>
                </div>
                <div style={{marginTop:'12px',paddingTop:'12px',borderTop:'1px solid var(--ivory2)',display:'flex',gap:'8px'}}>
                  {isLive && <button className="btn-primary" style={{flex:1,fontSize:'14px',padding:'11px',borderRadius:'12px'}}>📺 방송 시청하기</button>}
                  {isDone && <Link href={`/verify/${ev.id}`} className="btn-outline" style={{flex:1,fontSize:'14px',padding:'11px',borderRadius:'12px',textDecoration:'none'}}>🔍 결과 검증하기</Link>}
                  {!isLive && !isDone && (
                    <>
                      <button className="btn-primary" style={{flex:1,fontSize:'14px',padding:'11px',borderRadius:'12px'}}>🔔 알림 신청</button>
                      <Link href={`/verify/${ev.id}`} className="btn-outline" style={{padding:'11px 14px',borderRadius:'12px',fontSize:'13px',textDecoration:'none'}}>상세</Link>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
