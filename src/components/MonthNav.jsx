export default function MonthNav({ currentMonth, onChange }) {
  return (
    <div className="month-nav">
      <button className="btn-secondary" onClick={() => onChange(-1)}>◀ เดือนก่อน</button>
      <span className="month-title">{currentMonth}</span>
      <button className="btn-secondary" onClick={() => onChange(1)}>เดือนถัดไป ▶</button>
    </div>
  )
}
