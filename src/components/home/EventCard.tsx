'use client'
import Link from 'next/link'
import type { DrawEvent } from '@/types'

const STATUS_LABELS: Record<string, { badge: string; cls: string; timePrefix: string }> = {
  live:    { badge: '● LIVE',  cls: 'badge-live',  timePrefix: 'LIVE' },
  locked:  { badge: '예정',    cls: 'badge-soon',  timePrefix: '' },
  active:  { badge: '참가중',  cls: 'badge-soon',  timePrefix: '' },
  done:    { badge: '종료',    cls: 'badge-done',  timePrefix: '' },
  draft:   { badge: '준비중',  cls: 'badge-done',  timePrefix: '' },
  drawing: { badge: '추첨중',  cls: 'badge-live',  timePrefix: '' },
}

const COMPANY_EMOJIS: Record<string, string> = {
  samsung: '🏢', hyundai: '🚗', cu: '🏪', baemin: '🛵',
}

interface Props { event: DrawEvent }

export default function EventCard({ event }: Props) {
  const st = STATUS_LABELS[event.status] ?? STATUS_LABELS.draft
  const isLive = event.status === 'live'
  const isDone = event.status === 'done'

  const kstTime = new Date(event.scheduledAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Seoul',
  })

  return (
    <div
      className="card-hover p-5 flex gap-4 items-start"
      style={{
        opacity: isDone ? 0.65 : 1,
        borderColor: isLive ? 'rgba(184,146,42,.4)' : undefined,
        background: isLive ? 'linear-gradient(135deg, var(--gold7), #fff)' : undefined,
      }}
    >
      {/* Time */}
      <div className="text-center min-w-[48px] pt-0.5 flex-shrink-0">
        {isLive ? (
          <div className="text-xs font-extrabold tracking-wide" style={{ color: 'var(--red)' }}>
            <span className="animate-live inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: 'var(--red)', verticalAlign: 'middle' }} />
            LIVE
          </div>
        ) : (
          <div className="text-sm font-bold" style={{ color: 'var(--text3)' }}>{kstTime}</div>
        )}
      </div>

      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)' }}
      >
        {COMPANY_EMOJIS[event.companyId] ?? '🏢'}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{event.companyName}</span>
          <span className={st.cls}>{st.badge}</span>
          <span className="badge-cert">✓ 인증</span>
        </div>
        <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text2)' }}>
          {event.prize} — {event.winnerCount}명 당첨
        </div>
        <div className="flex gap-4 flex-wrap">
          <span className="text-xs" style={{ color: 'var(--text4)' }}>
            👥 {event.participantCount.toLocaleString()}명
          </span>
          {isLive && event.streamViewers && (
            <span className="text-xs" style={{ color: 'var(--text4)' }}>
              👁 {event.streamViewers.toLocaleString()}명 시청
            </span>
          )}
          {event.participantsHash && (
            <span className="text-xs" style={{ color: 'var(--green)' }}>🔒 명단 잠금완료</span>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col gap-2 items-end flex-shrink-0">
        {isLive && (
          <button className="btn-gold text-xs px-4 py-1.5 rounded-lg">시청하기</button>
        )}
        {(event.status === 'locked' || event.status === 'active') && (
          <button
            className="text-xs px-4 py-1.5 rounded-lg font-bold transition-colors"
            style={{ background: 'var(--ivory2)', color: 'var(--text2)', border: '1px solid var(--ivory3)' }}
          >
            🔔 알림
          </button>
        )}
        {isDone && (
          <Link
            href={`/verify/${event.id}`}
            className="text-xs px-4 py-1.5 rounded-lg font-bold no-underline transition-colors"
            style={{ background: 'rgba(26,107,58,.08)', color: 'var(--green)', border: '1px solid rgba(26,107,58,.2)' }}
          >
            🔍 검증하기
          </Link>
        )}
      </div>
    </div>
  )
}
