import { NextRequest, NextResponse } from 'next/server'
import { getTodayEvents, createEvent } from '@/lib/db'
import { MOCK_EVENTS } from '@/lib/mockData'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const mock = searchParams.get('mock') === 'true'

    if (mock || process.env.NODE_ENV === 'development') {
      return NextResponse.json({ events: MOCK_EVENTS })
    }

    const events = await getTodayEvents()
    return NextResponse.json({ events })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: '이벤트 조회 실패' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      companyId, companyName, title, description, prize,
      winnerCount, scheduledAt, seedSource, allowDuplicate,
    } = body

    if (!companyId || !title || !scheduledAt) {
      return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
    }

    const id = await createEvent({
      companyId, companyName, title, description, prize,
      winnerCount: Number(winnerCount),
      allowDuplicate: Boolean(allowDuplicate),
      status: 'draft',
      participantCount: 0,
      scheduledAt,
      seedSource: seedSource ?? 'bitcoin',
      algorithmVersion: 'moduchucham-fair-v1.2',
    })

    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: '이벤트 생성 실패' }, { status: 500 })
  }
}
