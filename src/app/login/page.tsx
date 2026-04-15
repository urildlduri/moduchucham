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
        'auth/user-not-found': '등록되지 않은 이메일입니다.',
        'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
        'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
        'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
      }
      setError(msg[err.code] ?? '로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--ivory)', display:'flex', flexDirection:'column', padding:'0 20px' }}>
      {/* 헤더 */}
      <div style={{ paddingTop:'60px', paddingBottom:'32px', textAlign:'center' }}>
        <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'44px', height:'44px', borderRadius:'14px', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 20 20" fill="white" width="22" height="22"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/></svg>
          </div>
          <span style={{ fontSize:'22px', fontWeight:900, color:'var(--text)', letterSpacing:'-0.5px' }}>모두의 추첨</span>
        </Link>
      </div>

      {/* 카드 */}
      <div className="card" style={{ padding:'28px 24px' }}>
        <h1 style={{ fontSize:'22px', fontWeight:900, color:'var(--text)', letterSpacing:'-0.5px', marginBottom:'4px' }}>로그인</h1>
        <p style={{ fontSize:'14px', color:'var(--text4)', marginBottom:'24px' }}>기업 관리자 계정으로 로그인하세요</p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'var(--text3)', letterSpacing:'.5px', textTransform:'uppercase', marginBottom:'7px' }}>이메일</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="company@example.com" required className="form-input" />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'var(--text3)', letterSpacing:'.5px', textTransform:'uppercase', marginBottom:'7px' }}>비밀번호</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required className="form-input" />
          </div>

          {error && (
            <div style={{ background:'rgba(196,43,28,.08)', border:'1px solid rgba(196,43,28,.2)', borderRadius:'12px', padding:'12px 14px', fontSize:'13px', color:'var(--red)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-gold" style={{ width:'100%', padding:'15px', fontSize:'16px', borderRadius:'14px', marginTop:'4px', opacity:loading?.7:1 }}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:'20px', paddingTop:'20px', borderTop:'1px solid var(--ivory2)' }}>
          <span style={{ fontSize:'14px', color:'var(--text4)' }}>계정이 없으신가요? </span>
          <Link href="/signup" style={{ fontSize:'14px', fontWeight:700, color:'var(--gold)', textDecoration:'none' }}>무료로 시작하기</Link>
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:'20px' }}>
        <Link href="/" style={{ fontSize:'13px', color:'var(--text4)', textDecoration:'none' }}>← 홈으로</Link>
      </div>
    </div>
  )
}
