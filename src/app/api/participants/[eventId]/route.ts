import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params
  return NextResponse.json({ count: 12847, eventId })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params
  try {
    const body = await req.json()
    const { action } = body
    if (action === 'lock') {
      return NextResponse.json({
        success: true,
        hash: 'a3f9c2d8e1b4f7a2c1d8e3b4f9c2a1d8e5b6f7a8c9d0e1f2a3b4c5d6e7f8a9b0',
        count: 12847,
      })
    }
    return NextResponse.json({ success: true, uploaded: 12847, duplicates: 23 })
  } catch (err) {
    return NextResponse.json({ error: '참가자 처리 실패' }, { status: 500 })
  }
}
