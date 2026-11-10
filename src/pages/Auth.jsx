import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('✅ สำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/')
      }
    } catch (err) {
      setMessage('❌ ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-box">
        <h2>{mode === 'login' ? '👋 เข้าสู่ระบบ' : '📝 สมัครสมาชิก'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="📧 อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ กำลัง...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </form>
        {message && <p style={{ color: message.startsWith('✅') ? '#16A34A' : '#EF4444', fontSize: '0.85rem' }}>{message}</p>}
        <p>
          {mode === 'login' ? (
            <>ยังไม่มีบัญชี? <a onClick={() => setMode('signup')}>สมัครเลย</a></>
          ) : (
            <>มีบัญชีอยู่แล้ว? <a onClick={() => setMode('login')}>เข้าสู่ระบบ</a></>
          )}
        </p>
      </div>
    </div>
  )
}
