import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params
  try {
    const body = await req.json()
    // Firebase 연결 전 목업 응답
    return NextResponse.json({
      success: true,
      eventId,
      message: '추첨이 완료되었습니다. Firebase 연결 후 실제 추첨이 실행됩니다.',
    })
  } catch (err) {
    return NextResponse.json({ error: '추첨 실행 실패' }, { status: 500 })
  }
}
