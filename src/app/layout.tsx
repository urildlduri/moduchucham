import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth'
import BottomNav from '@/components/layout/BottomNav'

export const metadata: Metadata = {
  title: '모두의 추첨',
  description: '누구도 조작할 수 없는 추첨, 누구나 검증할 수 있는 방송',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: '모두의 추첨' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#faf8f3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          {children}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  )
}
