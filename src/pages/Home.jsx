import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Summary from '../components/Summary'
import MonthNav from '../components/MonthNav'
import RecordForm from '../components/RecordForm'
import RecordList from '../components/RecordList'

export default function Home() {
  const [user, setUser] = useState(null)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const navigate = useNavigate()

  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
  
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]
  
  const currentMonthDisplay = `${thaiMonths[currentDate.getMonth()]} พ.ศ. ${currentDate.getFullYear() + 543}`

  // ตรวจสอบผู้ใช้และดึงข้อมูล
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/auth')
        return
      }
      setUser(user)
      fetchRecords()
    }
    checkUser()
  }, [navigate, currentMonthKey])

  // ดึงรายการตามเดือนปัจจุบัน
  const fetchRecords = async () => {
    setLoading(true)
    const startDate = `${currentMonthKey}-01`
    const endDate = `${currentMonthKey}-31`

    const { data, error } = await supabase
      .from('records')
      .select('*')
      .gte('record_date', startDate)
      .lte('record_date', endDate)
      .order('record_date', { ascending: false })

    if (!error) setRecords(data || [])
    setLoading(false)
  }

  // เพิ่มรายการใหม่
  const addRecord = async (newRecord) => {
    const { data: { user } } = await supabase.auth.getUser()
    const recordWithUser = { ...newRecord, user_id: user.id }

    const { error } = await supabase.from('records').insert([recordWithUser])
    if (!error) fetchRecords()
  }

  // ลบรายการ
  const deleteRecord = async (id) => {
    if (!confirm('ต้องการลบรายการนี้ใช่หรือไม่?')) return
    const { error } = await supabase.from('records').delete().eq('id', id)
    if (!error) fetchRecords()
  }

  // เปลี่ยนเดือน
  const changeMonth = (delta) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + delta)
    setCurrentDate(newDate)
  }

  // คำนวณยอดรวม
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + Number(r.amount), 0)
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + Number(r.amount), 0)

  // ออกจากระบบ
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  if (loading) return <div className="container" style={{textAlign:'center',padding:'40px'}}>⏳ กำลังโหลด...</div>

  return (
    <div className="container">
      <Header user={user} />
      
      <div className="user-bar">
        <span>👤 {user?.email}</span>
        <button className="btn-secondary" onClick={handleLogout}>ออกจากระบบ</button>
      </div>

      <Summary totalIncome={totalIncome} totalExpense={totalExpense} />
      
      <section className="section">
        <MonthNav currentMonth={currentMonthDisplay} onChange={changeMonth} />
      </section>
      
      <RecordForm onAdd={addRecord} />
      <RecordList records={records} onDelete={deleteRecord} />
    </div>
  )
}