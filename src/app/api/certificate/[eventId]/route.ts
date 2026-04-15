import { NextRequest, NextResponse } from 'next/server'
import { MOCK_CERTIFICATE } from '@/lib/mockData'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params
  try {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ certificate: MOCK_CERTIFICATE })
    }
    const { getCertificate } = await import('@/lib/db')
    const cert = await getCertificate(eventId)
    if (!cert) return NextResponse.json({ error: '증명서를 찾을 수 없습니다.' }, { status: 404 })
    return NextResponse.json({ certificate: cert })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: '증명서 조회 실패' }, { status: 500 })
  }
}
