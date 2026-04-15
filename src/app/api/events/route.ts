import { NextRequest, NextResponse } from 'next/server'
import { MOCK_EVENTS } from '@/lib/mockData'

export async function GET(req: NextRequest) {
  // 현재는 목업 데이터 반환 (Firebase 연결 후 실제 데이터로 교체)
  return NextResponse.json({ events: MOCK_EVENTS })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, scheduledAt } = body
    if (!title || !scheduledAt) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 })
    }
    return NextResponse.json({ success: true, id: 'EVT-' + Date.now() }, { status: 201 })
  } catch {
    return NextResponse.json({ error: '이벤트 생성 실패' }, { status: 500 })
  }
}
