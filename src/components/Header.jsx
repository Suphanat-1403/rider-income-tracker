export default function Header({ user }) {
  return (
    <header className="header">
      <h1>🏍️ บันทึกรายรับ-รายจ่าย ไรเดอร์</h1>
      <p>จัดการรายได้ของคุณให้ชัดเจน สวยงาม และปลอดภัย</p>
      <div className="gold-badge">🏆 สวัสดีคุณ {user?.email?.split('@')[0] || 'ผู้ใช้'} • ระดับโกลด์</div>
    </header>
  )
}
