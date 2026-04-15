'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      router.push('/admin')
    } catch (err: any) {
      const msg: Record<string,string> = {
        'auth/user-not-found':'등록되지 않은 이메일입니다.',
        'auth/wrong-password':'비밀번호가 올바르지 않습니다.',
        'auth/invalid-credential':'이메일 또는 비밀번호를 확인해주세요.',
        'auth/too-many-requests':'잠시 후 다시 시도해주세요.',
      }
      setError(msg[err.code] ?? '로그인 중 오류가 발생했습니다.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',flexDirection:'column',alignItems:'center',padding:'0 20px'}}>
      <div style={{paddingTop:'64px',paddingBottom:'36px',textAlign:'center'}}>
        <div style={{width:'56px',height:'56px',borderRadius:'18px',background:'var(--yellow)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
          <svg viewBox="0 0 20 20" fill="#111" width="26" height="26"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/></svg>
        </div>
        <div style={{fontSize:'22px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.5px'}}>모두의 추첨</div>
        <div style={{fontSize:'13px',color:'var(--text4)',marginTop:'4px'}}>기업 관리자 로그인</div>
      </div>

      <div className="card" style={{width:'100%',maxWidth:'400px',padding:'28px 24px'}}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div>
            <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'var(--text3)',letterSpacing:'.3px',marginBottom:'7px'}}>이메일</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="company@example.com" required className="form-input"/>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'var(--text3)',letterSpacing:'.3px',marginBottom:'7px'}}>비밀번호</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required className="form-input"/>
          </div>
          {error && (
            <div style={{background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.2)',borderRadius:'12px',padding:'11px 14px',fontSize:'13px',color:'var(--red)'}}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',padding:'15px',fontSize:'16px',borderRadius:'14px',marginTop:'4px',opacity:loading?.75:1}}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div style={{textAlign:'center',marginTop:'18px',paddingTop:'18px',borderTop:'1px solid var(--border)',fontSize:'14px',color:'var(--text4)'}}>
          계정이 없으신가요?{' '}
          <Link href="/signup" style={{fontWeight:900,color:'var(--dark)',textDecoration:'none'}}>무료로 시작하기</Link>
        </div>
      </div>
      <Link href="/" style={{marginTop:'16px',fontSize:'13px',color:'var(--text4)',textDecoration:'none'}}>← 홈으로</Link>
    </div>
  )
}
