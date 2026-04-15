import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '모두의 추첨 — 공정한 추첨 방송 플랫폼',
  description: '수학적으로 검증 가능한 Provably Fair 추첨. 운영자조차 조작할 수 없는 구조.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
