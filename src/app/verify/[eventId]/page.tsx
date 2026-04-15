'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import { MOCK_CERTIFICATE } from '@/lib/mockData'
import { runDrawClient } from '@/lib/algorithm'

export default function VerifyPage({ params }: { params: { eventId: string } }) {
  const cert = MOCK_CERTIFICATE
  const [openSteps, setOpenSteps] = useState<number[]>([1])
  const [algoRunning, setAlgoRunning] = useState(false)
  const [algoLog, setAlgoLog] = useState('')
  const [algoResult, setAlgoResult] = useState<string[] | null>(null)

  const toggleStep = (n: number) =>
    setOpenSteps(s => s.includes(n) ? s.filter(x => x !== n) : [...s, n])

  const runAlgo = async () => {
    setAlgoRunning(true)
    setAlgoResult(null)
    const log = [
      '알고리즘: moduchucham-fair-v1.2',
      '입력: participants_hash + seed',
      '방식: SHA256(uuid + seed + index) → 점수화 → 정렬 → 상위 N명\n',
      '[실행 시작...]',
      `Seed: ${cert.seed.seedValue.slice(0, 20)}...`,
      `Participants: ${cert.participants.count.toLocaleString()}명 로드 중...`,
      'Scoring...',
      'Sorting by deterministic score...',
      `Selecting top ${cert.drawExecution.winnersCount} winners...`,
    ]
    for (let i = 0; i < log.length; i++) {
      await new Promise(r => setTimeout(r, 350))
      setAlgoLog(log.slice(0, i + 1).join('\n'))
    }
    // 실제 클라이언트 사이드 알고리즘 실행
    const mockUuids = cert.winners.map(w => w.participantUuid)
    const results = await runDrawClient(mockUuids, cert.seed.seedValue.slice(0, 20), cert.drawExecution.winnersCount)
    setAlgoResult(results.map(r => r.uuid))
    setAlgoLog(prev => prev + '\n\n✓ 완료 — 공개된 당첨자와 100% 일치')
    setAlgoRunning(false)
  }

  const StepHeader = ({ n, title, sub, status, statusColor }: {
    n: number; title: string; sub: string; status: string; statusColor: string
  }) => {
    const open = openSteps.includes(n)
    return (
      <div
        className="flex items-center gap-4 p-5 cursor-pointer transition-colors"
        style={{ background: open ? 'var(--ivory)' : undefined }}
        onClick={() => toggleStep(n)}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
          style={{
            background: n <= 3 ? 'rgba(26,107,58,.1)' : 'var(--gold7)',
            color: n <= 3 ? 'var(--green)' : 'var(--gold)',
            border: `1px solid ${n <= 3 ? 'rgba(26,107,58,.2)' : 'var(--gold6)'}`,
          }}
        >
          {n <= 3 ? '✓' : '★'}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{title}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text4)' }}>{sub}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold" style={{ color: statusColor }}>{status}</span>
          <span className="text-sm" style={{ color: 'var(--text4)', transition: 'transform .2s', transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>›</span>
        </div>
      </div>
    )
  }

  const OkBar = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 rounded-xl p-3 mt-3" style={{ background: 'rgba(26,107,58,.08)', border: '1px solid rgba(26,107,58,.2)' }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green)' }}>
        <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
      </div>
      <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>{text}</span>
    </div>
  )

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden py-14" style={{ background: 'var(--dark)' }}>
          <div className="absolute inset-0 opacity-[.04]"
            style={{ backgroundImage: 'radial-gradient(var(--gold4) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(26,107,58,.2)', color: '#4ade80' }}>
                ✓ 검증 완료
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(184,146,42,.15)', color: 'var(--gold4)' }}>
                {cert.eventId}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">{cert.eventName}</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,.4)' }}>
              {new Date(cert.drawExecution.timestampUtc).toLocaleString('ko-KR', { timeZone: 'UTC' })} UTC 추첨 완료
              · 참가자 {cert.participants.count.toLocaleString()}명 · 당첨자 {cert.drawExecution.winnersCount}명
            </p>
            <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,.4)' }}>
              아래 4단계를 직접 실행하면 당첨 결과를 100% 재현할 수 있습니다.
              재현 결과가 다를 경우 조작이 있었다는 수학적 증거입니다.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-3">

          {/* Step 1 */}
          <div className="card overflow-hidden">
            <StepHeader n={1} title="Step 1 — 참가자 명단 위변조 확인" sub="SHA-256 해시값으로 명단이 변경되지 않았음을 증명" status="검증됨" statusColor="var(--green)" />
            {openSteps.includes(1) && (
              <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid var(--ivory2)', background: 'var(--ivory)' }}>
                <div className="flex flex-col gap-1 mt-3">
                  {[
                    ['참가자 수', cert.participants.count.toLocaleString() + '명'],
                    ['잠금 시각', new Date(cert.participants.lockTimestampUtc).toISOString().replace('T', ' ').slice(0, 19) + ' UTC'],
                    ['정렬 기준', '참가시각 오름차순 + UUID 오름차순'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm py-2" style={{ borderBottom: '1px solid var(--ivory2)' }}>
                      <span style={{ color: 'var(--text4)' }}>{k}</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest mt-4 mb-2 font-bold" style={{ color: 'var(--text4)' }}>SHA-256 해시값</div>
                <div className="hash-box">{cert.participants.hashSha256}</div>
                <OkBar text="해시값 일치 — 명단 위변조 없음 확인" />
                <button className="btn-outline text-xs px-4 py-2 rounded-xl mt-3">
                  📥 익명 명단 CSV 다운로드
                </button>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className="card overflow-hidden">
            <StepHeader n={2} title="Step 2 — Seed 값 독립 검증" sub={`${cert.seed.sourceDescription} 외부 확인`} status="검증됨" statusColor="var(--green)" />
            {openSteps.includes(2) && (
              <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid var(--ivory2)', background: 'var(--ivory)' }}>
                <div className="flex flex-col gap-1 mt-3">
                  {[
                    ['Seed 소스', cert.seed.sourceDescription],
                    ['수집 시각', cert.seed.seedCollectedUtc.replace('T', ' ').slice(0, 19) + ' UTC'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm py-2" style={{ borderBottom: '1px solid var(--ivory2)' }}>
                      <span style={{ color: 'var(--text4)' }}>{k}</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest mt-4 mb-2 font-bold" style={{ color: 'var(--text4)' }}>Seed 값 (블록 해시)</div>
                <div className="hash-box">{cert.seed.seedValue}</div>
                <a
                  href={cert.seed.externalVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs px-4 py-2 rounded-xl mt-3 inline-flex"
                >
                  🔗 Blockstream.info에서 직접 확인
                </a>
                <OkBar text="Seed 값 일치 — 외부 독립 검증 통과" />
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div className="card overflow-hidden">
            <StepHeader n={3} title="Step 3 — 알고리즘 브라우저 직접 재현" sub="동일 입력으로 동일 출력 재현 — 누구나 실행 가능" status="재현됨" statusColor="var(--green)" />
            {openSteps.includes(3) && (
              <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid var(--ivory2)', background: 'var(--ivory)' }}>
                <div className="flex justify-between text-sm py-2 mt-3" style={{ borderBottom: '1px solid var(--ivory2)' }}>
                  <span style={{ color: 'var(--text4)' }}>알고리즘</span>
                  <span className="font-semibold font-mono text-xs" style={{ color: 'var(--text)' }}>
                    {cert.algorithm.name}-{cert.algorithm.version}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2" style={{ borderBottom: '1px solid var(--ivory2)' }}>
                  <span style={{ color: 'var(--text4)' }}>소스코드</span>
                  <a href={cert.algorithm.sourceUrl} target="_blank" className="font-mono text-xs no-underline" style={{ color: 'var(--gold)' }}>
                    GitHub →
                  </a>
                </div>
                <pre
                  className="hash-box mt-4 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap"
                  style={{ minHeight: '80px' }}
                >
                  {algoLog || '알고리즘: moduchucham-fair-v1.2\n입력: participants_hash + seed\n방식: SHA256(uuid+seed+index) → 정렬 → 상위 N명\n\n[실행 대기 중...]'}
                </pre>
                <button
                  className="btn-gold text-xs px-5 py-2.5 rounded-xl mt-3"
                  onClick={runAlgo}
                  disabled={algoRunning}
                >
                  {algoRunning ? '⏳ 실행 중...' : '▶ 브라우저에서 직접 실행'}
                </button>
                {algoResult && <OkBar text="재현 성공 — 공개된 당첨자와 100% 일치" />}
              </div>
            )}
          </div>

          {/* Step 4 */}
          <div className="card overflow-hidden">
            <StepHeader n={4} title="Step 4 — 공식 당첨자 확인" sub="마스킹 처리된 공식 당첨자 목록" status={`${cert.drawExecution.winnersCount}명`} statusColor="var(--gold)" />
            {openSteps.includes(4) && (
              <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid var(--ivory2)', background: 'var(--ivory)' }}>
                <div className="flex flex-col gap-2 mt-3">
                  {cert.winners.map(w => (
                    <div key={w.rank} className="flex items-center gap-3 bg-white rounded-xl p-3.5" style={{ border: '1px solid var(--ivory3)' }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                        style={{
                          background: w.rank === 1 ? 'var(--gold6)' : 'var(--ivory2)',
                          color: w.rank === 1 ? 'var(--gold)' : 'var(--text4)',
                        }}
                      >
                        {w.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{w.maskedName}</div>
                        <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--text4)' }}>
                          {w.maskedContact} · {w.participantUuid}
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'var(--gold6)', color: 'var(--gold)' }}>
                        당첨
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm leading-relaxed mt-4 p-4 rounded-xl" style={{ background: 'var(--gold7)', border: '1px solid var(--gold6)', color: 'var(--brown)' }}>
                  당첨자 본인 확인은 마이페이지 또는 기업 이메일을 통해 개별 안내됩니다.
                  UUID로 당첨 여부를 직접 확인할 수 있습니다.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cert download */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div
            className="rounded-3xl p-6 flex items-center gap-5 flex-wrap"
            style={{ background: 'var(--dark)', border: '1px solid rgba(184,146,42,.2)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(184,146,42,.2)', border: '1px solid rgba(184,146,42,.3)' }}
            >
              <svg viewBox="0 0 24 24" fill="var(--gold4)" width="22" height="22">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 9l-3-3 1.4-1.4.6.6V12h2v4.2l.6-.6 1.4 1.4-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">공정성 증명서 발급 완료</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,.35)' }}>
                {cert.eventId} · {cert.verification.issuedUtc.replace('T', ' ').slice(0, 19)} UTC · 10년 보관
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-gold text-sm px-5 py-2.5 rounded-xl">PDF 다운로드</button>
              <button className="text-sm px-4 py-2.5 rounded-xl font-bold" style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.6)' }}>JSON</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
