'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href:'/', label:'홈', icon:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', match:(p:string)=>p==='/' },
  { href:'/events', label:'추첨', icon:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', match:(p:string)=>p.startsWith('/events') },
  { href:'/verify', label:'검증', icon:'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z', match:(p:string)=>p.startsWith('/verify') },
  { href:'/admin', label:'관리', icon:'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z', match:(p:string)=>p.startsWith('/admin') },
]

export default function BottomNav() {
  const pathname = usePathname()
  if (['/login','/signup'].includes(pathname)) return null

  return (
    <nav className="bottom-nav">
      {TABS.map(({ href, label, icon, match }) => {
        const active = match(pathname)
        return (
          <Link key={href} href={href} className={`bottom-nav-item${active?' active':''}`} style={{textDecoration:'none'}}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill={active?'var(--dark)':'#ccc'}>
              <path d={icon}/>
            </svg>
            <span style={{color:active?'var(--dark)':'#ccc',fontWeight:active?900:600}}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
