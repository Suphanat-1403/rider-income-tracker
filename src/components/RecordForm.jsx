import { useState } from 'react'

export default function RecordForm({ onAdd }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || !type || !category || !amount) return

    onAdd({
      record_date: date,
      type,
      category,
      amount: parseFloat(amount),
      note
    })

    setType('')
    setCategory('')
    setAmount('')
    setNote('')
  }

  return (
    <section className="section">
      <h2>➕ บันทึกรายการใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">-- ประเภท --</option>
            <option value="income">💰 รายรับ</option>
            <option value="expense">📤 รายจ่าย</option>
          </select>
        </div>
        <div className="form-grid">
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">-- หมวดหมู่ --</option>
            <optgroup label="💰 รายรับ">
              <option value="รับงานโอน">รับงานโอนเข้าแอป</option>
              <option value="รับงานสด">รับงานเงินสด</option>
              <option value="โบนัส">โบนัส/อินเซนทีฟ</option>
              <option value="อื่นๆ รับ">อื่นๆ</option>
            </optgroup>
            <optgroup label="📤 รายจ่าย">
              <option value="น้ำมัน">น้ำมัน</option>
              <option value="บำรุงรักษา">บำรุงรักษารถ</option>
              <option value="อุปกรณ์">อุปกรณ์/เครื่องแบบ</option>
              <option value="ค่าอื่นๆ">ค่าใช้จ่ายอื่นๆ</option>
            </optgroup>
          </select>
          <input
            type="number"
            placeholder="จำนวน (บาท)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>
        <input
          type="text"
          placeholder="📝 รายละเอียดเพิ่มเติม (ถ้ามี)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginTop: '10px' }}
        />
        <button type="submit" className="btn-primary">✅ บันทึกรายการ</button>
      </form>
    </section>
  )
}
