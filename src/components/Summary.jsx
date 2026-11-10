export default function Summary({ totalIncome, totalExpense }) {
  const profit = totalIncome - totalExpense

  return (
    <div className="summary-grid">
      <div className="card income">
        <div className="card-label">💰 รวมรายรับ</div>
        <div className="card-value">{totalIncome.toFixed(2)}</div>
      </div>
      <div className="card expense">
        <div className="card-label">📤 รวมรายจ่าย</div>
        <div className="card-value">{totalExpense.toFixed(2)}</div>
      </div>
      <div className="card profit">
        <div className="card-label">📈 กำไรสุทธิ</div>
        <div className="card-value">{profit.toFixed(2)}</div>
      </div>
    </div>
  )
}
