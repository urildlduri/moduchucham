'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function SignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ company:'', email:'', password:'', confirm:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('비밀번호가 일치하지 않습니다.'); return }
    if (form.password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return }
    setLoading(true)
    try {
      await signup(form.email, form.password)
      router.push('/admin')
    } catch (err: any) {
      const msg: Record<string,string> = {
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
        'auth/weak-password': '비밀번호가 너무 약합니다.',
      }
      setError(msg[err.code] ?? '회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { label:'회사명', key:'company', type:'text', placeholder:'예: 삼성전자' },
    { label:'이메일', key:'email', type:'email', placeholder:'company@example.com' },
    { label:'비밀번호', key:'password', type:'password', placeholder:'6자 이상' },
    { label:'비밀번호 확인', key:'confirm', type:'password', placeholder:'비밀번호 재입력' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--ivory)', display:'flex', flexDirection:'column', padding:'0 20px' }}>
      <div style={{ paddingTop:'60px', paddingBottom:'32px', textAlign:'center' }}>
        <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'44px', height:'44px', borderRadius:'14px', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 20 20" fill="white" width="22" height="22"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/></svg>
          </div>
          <span style={{ fontSize:'22px', fontWeight:900, color:'var(--text)', letterSpacing:'-0.5px' }}>모두의 추첨</span>
        </Link>
      </div>

      <div className="card" style={{ padding:'28px 24px' }}>
        <h1 style={{ fontSize:'22px', fontWeight:900, color:'var(--text)', letterSpacing:'-0.5px', marginBottom:'4px' }}>무료로 시작하기</h1>
        <p style={{ fontSize:'14px', color:'var(--text4)', marginBottom:'24px' }}>첫 추첨 1회 무료 · 신용카드 불필요</p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {fields.map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'var(--text3)', letterSpacing:'.5px', textTransform:'uppercase', marginBottom:'7px' }}>{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={set(key)} placeholder={placeholder} required className="form-input" />
            </div>
          ))}

          {error && (
            <div style={{ background:'rgba(196,43,28,.08)', border:'1px solid rgba(196,43,28,.2)', borderRadius:'12px', padding:'12px 14px', fontSize:'13px', color:'var(--red)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-gold" style={{ width:'100%', padding:'15px', fontSize:'16px', borderRadius:'14px', marginTop:'4px', opacity:loading?.7:1 }}>
            {loading ? '가입 중...' : '회원가입 및 시작하기'}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:'20px', paddingTop:'20px', borderTop:'1px solid var(--ivory2)' }}>
          <span style={{ fontSize:'14px', color:'var(--text4)' }}>이미 계정이 있으신가요? </span>
          <Link href="/login" style={{ fontSize:'14px', fontWeight:700, color:'var(--gold)', textDecoration:'none' }}>로그인</Link>
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:'20px' }}>
        <Link href="/" style={{ fontSize:'13px', color:'var(--text4)', textDecoration:'none' }}>← 홈으로</Link>
      </div>
    </div>
  )
}
