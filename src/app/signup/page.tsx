'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function SignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({company:'',email:'',password:'',confirm:''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(f=>({...f,[k]:e.target.value}))

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
        'auth/email-already-in-use':'이미 사용 중인 이메일입니다.',
        'auth/invalid-email':'이메일 형식이 올바르지 않습니다.',
        'auth/weak-password':'비밀번호가 너무 약합니다.',
      }
      setError(msg[err.code] ?? '회원가입 중 오류가 발생했습니다.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',flexDirection:'column',alignItems:'center',padding:'0 20px'}}>
      <div style={{paddingTop:'52px',paddingBottom:'28px',textAlign:'center'}}>
        <div style={{width:'56px',height:'56px',borderRadius:'18px',background:'var(--yellow)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
          <svg viewBox="0 0 20 20" fill="#111" width="26" height="26"><path d="M10 2l2.5 5h5l-4 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5-4-3.5h5z"/></svg>
        </div>
        <div style={{fontSize:'22px',fontWeight:900,color:'var(--dark)',letterSpacing:'-.5px'}}>무료로 시작하기</div>
        <div style={{fontSize:'13px',color:'var(--text4)',marginTop:'4px'}}>첫 추첨 1회 무료 · 신용카드 불필요</div>
      </div>

      <div className="card" style={{width:'100%',maxWidth:'400px',padding:'28px 24px'}}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'13px'}}>
          {[
            {label:'회사명',key:'company',type:'text',ph:'예: 삼성전자'},
            {label:'이메일',key:'email',type:'email',ph:'company@example.com'},
            {label:'비밀번호',key:'password',type:'password',ph:'6자 이상'},
            {label:'비밀번호 확인',key:'confirm',type:'password',ph:'비밀번호 재입력'},
          ].map(({label,key,type,ph})=>(
            <div key={key}>
              <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'var(--text3)',letterSpacing:'.3px',marginBottom:'7px'}}>{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={set(key)} placeholder={ph} required className="form-input"/>
            </div>
          ))}
          {error && (
            <div style={{background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.2)',borderRadius:'12px',padding:'11px 14px',fontSize:'13px',color:'var(--red)'}}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',padding:'15px',fontSize:'16px',borderRadius:'14px',marginTop:'4px',opacity:loading?.75:1}}>
            {loading ? '가입 중...' : '회원가입 및 시작하기'}
          </button>
        </form>
        <div style={{textAlign:'center',marginTop:'18px',paddingTop:'18px',borderTop:'1px solid var(--border)',fontSize:'14px',color:'var(--text4)'}}>
          이미 계정이 있으신가요?{' '}
          <Link href="/login" style={{fontWeight:900,color:'var(--dark)',textDecoration:'none'}}>로그인</Link>
        </div>
      </div>
      <Link href="/" style={{marginTop:'16px',fontSize:'13px',color:'var(--text4)',textDecoration:'none'}}>← 홈으로</Link>
    </div>
  )
}
