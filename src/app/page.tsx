import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import EventCard from '@/components/home/EventCard'
import { MOCK_EVENTS } from '@/lib/mockData'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* 추첨 일정 */}
        <section className="py-20" id="schedule">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{color:'var(--gold)'}}>오늘의 추첨 일정</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight" style={{color:'var(--text)'}}>
                  2025년 6월 1일 추첨 <span style={{color:'var(--gold)'}}>{MOCK_EVENTS.length}건</span>
                </h2>
              </div>
              <button className="btn-outline text-sm px-4 py-2 rounded-xl">전체 일정 보기</button>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_EVENTS.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20" style={{background:'var(--ivory2)'}}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{color:'var(--gold)'}}>어떻게 작동하나요</span>
                <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight" style={{color:'var(--text)'}}>
                4단계로 완성되는<br/>수학적 공정 추첨
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {icon:'📋',step:'01',title:'참가자 명단 잠금',desc:'마감 시 SHA-256으로 해싱. 잠금 후 수정 불가. 해시값이 방송 화면에 즉시 공개됩니다.'},
                {icon:'₿',step:'02',title:'외부 Seed 자동 수집',desc:'방송 시작 후 첫 Bitcoin 블록 해시를 Seed로 자동 수집. 운영자가 미리 알 수 없어 사전 시뮬레이션 원천 불가.'},
                {icon:'⚙️',step:'03',title:'결정론적 알고리즘',desc:'SHA256(UUID+Seed+index) 점수화 → 정렬 → 상위 N명. 동일 입력은 항상 동일 출력. GitHub 공개.'},
                {icon:'📄',step:'04',title:'증명서 & 검증',desc:'즉시 PDF/JSON 증명서 자동 발급. 누구나 검증 페이지에서 결과를 직접 재현 가능.'},
              ].map(({icon,step,title,desc})=>(
                <div key={step} className="card-hover p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{background:'var(--gold7)',border:'1px solid var(--gold6)'}}>
                    {icon}
                  </div>
                  <div className="text-xs font-extrabold tracking-widest uppercase mb-2" style={{color:'var(--gold)'}}>Step {step}</div>
                  <h3 className="text-base font-bold mb-2" style={{color:'var(--text)'}}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{color:'var(--text4)'}}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Provably Fair */}
        <section className="py-20 relative overflow-hidden" style={{background:'var(--dark)'}}>
          <div className="absolute inset-0 opacity-[.04]" style={{backgroundImage:'radial-gradient(var(--gold4) 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{color:'var(--gold)'}}>Provably Fair</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-5 leading-tight" style={{color:'#fff'}}>
                운영자도 조작할 수 없거나,<br/>
                <span style={{color:'var(--gold4)'}}>조작하면 즉시 들키는</span> 구조
              </h2>
              <div className="flex flex-col divide-y" style={{borderColor:'rgba(255,255,255,.06)'}}>
                {[
                  {n:'1',t:'명단 잠금 → 해시 공개',d:'방송 최소 10분 전 명단이 잠기고 SHA-256 해시값이 방송 화면에 즉시 노출됩니다. 이후 DB 수정 시도는 감사 로그에 자동 기록됩니다.'},
                  {n:'2',t:'Seed는 명단 잠금 이후 결정',d:'방송 시작 후 채굴되는 Bitcoin 블록 해시가 Seed입니다. 명단이 잠긴 상태에서 Seed가 결정되므로 당첨자를 아무도 사전에 알 수 없습니다.'},
                  {n:'3',t:'누구나 결과를 직접 재현',d:'공개된 UUID 목록 + Seed + 오픈소스 알고리즘으로 누구나 동일한 당첨자를 얻을 수 있습니다. 결과가 다르면 조작의 수학적 증거입니다.'},
                ].map(({n,t,d})=>(
                  <div key={n} className="flex gap-4 py-5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 mt-0.5"
                      style={{background:'rgba(184,146,42,.15)',border:'1px solid rgba(184,146,42,.25)',color:'var(--gold4)'}}>
                      {n}
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1" style={{color:'#fff'}}>{t}</div>
                      <div className="text-sm leading-relaxed" style={{color:'rgba(255,255,255,.4)'}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Cert preview */}
            <div className="rounded-3xl p-6" style={{background:'var(--dark3)',border:'1px solid rgba(184,146,42,.2)'}}>
              <div className="flex items-center gap-3 pb-4 mb-4" style={{borderBottom:'1px solid rgba(184,146,42,.15)'}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(184,146,42,.15)'}}>
                  <svg viewBox="0 0 24 24" fill="var(--gold4)" width="18" height="18"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 9l-3-3 1.4-1.4.6.6V12h2v4.2l.6-.6 1.4 1.4-3 3z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">공정성 증명서</div>
                  <div className="text-xs mt-0.5" style={{color:'rgba(255,255,255,.35)'}}>EVT-20250601-001</div>
                </div>
              </div>
              {[
                {k:'참가자',v:'12,847명',hi:true},{k:'명단해시',v:'a3f9c2...e8b1d4',hi:false},
                {k:'Seed',v:'Bitcoin #899,412',hi:true},{k:'알고리즘',v:'fair-v1.2',hi:false},
                {k:'당첨1',v:'김*수 · uuid-a3f9c2',gr:true},{k:'당첨2',v:'이*진 · uuid-d8e1b4',gr:true},{k:'당첨3',v:'박*현 · uuid-f7a2c1',gr:true},
              ].map(({k,v,hi,gr})=>(
                <div key={k} className="flex justify-between py-1.5 text-xs border-b" style={{borderColor:'rgba(255,255,255,.04)'}}>
                  <span className="uppercase tracking-wide" style={{color:'rgba(255,255,255,.3)',width:'60px',flexShrink:0}}>{k}</span>
                  <span className="font-mono text-right ml-2 break-all" style={{color:gr?'#4ade80':hi?'var(--gold4)':'rgba(255,255,255,.55)'}}>{v}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Link href="/verify/EVT-20250601-001" className="btn-gold flex-1 justify-center text-xs py-2.5 rounded-xl">🔍 직접 검증하기</Link>
                <button className="text-xs px-3 py-2.5 rounded-xl font-bold" style={{background:'rgba(255,255,255,.07)',color:'rgba(255,255,255,.5)'}}>PDF</button>
              </div>
            </div>
          </div>
        </section>

        {/* 요금제 */}
        <section className="py-20" id="pricing">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{color:'var(--gold)'}}>요금제</span>
                <div className="w-6 h-0.5" style={{background:'var(--gold)'}} />
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight" style={{color:'var(--text)'}}>
                첫 1회는 <span style={{color:'var(--gold)'}}>무료</span>로 시작하세요
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {name:'스타터',price:'10',unit:'만원/회',sub:'소규모 이벤트',featured:false,
                  features:['추첨 1회','참가자 5,000명','공정성 증명서','기본 오버레이','검증 1년 유지'],cta:'시작하기'},
                {name:'비즈니스',price:'50',unit:'만원/월',sub:'성장하는 브랜드',featured:true,
                  features:['월 4회 추첨','참가자 30,000명','브랜드 오버레이','방송 예약','CSV/API 연동','감사 로그'],cta:'시작하기'},
                {name:'프로',price:'200',unit:'만원/월',sub:'대규모 운영사',featured:false,
                  features:['무제한 추첨','참가자 무제한','전담 CSM','API 연동','엔터프라이즈 로그','SLA 99.9%'],cta:'문의하기'},
              ].map(({name,price,unit,sub,featured,features,cta})=>(
                <div key={name} className="rounded-3xl p-7 flex flex-col"
                  style={{background:featured?'linear-gradient(135deg,var(--gold7),#fff)':'#fff',
                    border:`${featured?'2px':'1px'} solid ${featured?'var(--gold3)':'var(--ivory3)'}`,
                    boxShadow:featured?'0 8px 30px rgba(184,146,42,.12)':undefined}}>
                  {featured&&<span className="inline-block text-xs font-extrabold text-white px-3 py-1 rounded mb-4 self-start" style={{background:'var(--gold)'}}>추천</span>}
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'var(--text3)'}}>{name}</div>
                  <div className="text-4xl font-black tracking-tight mb-1" style={{color:'var(--text)'}}>
                    {price}<span className="text-sm font-medium" style={{color:'var(--text4)'}}> {unit}</span>
                  </div>
                  <div className="text-sm mb-5" style={{color:'var(--text4)'}}>{sub}</div>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {features.map(f=>(
                      <li key={f} className="flex items-center gap-2 text-sm" style={{color:'var(--text2)'}}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{background:'rgba(26,107,58,.1)',color:'var(--green)'}}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={featured?'btn-gold w-full justify-center rounded-xl py-3':'btn-outline w-full justify-center rounded-xl py-3'}>{cta}</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
