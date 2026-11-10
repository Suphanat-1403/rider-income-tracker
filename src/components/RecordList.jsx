export default function RecordList({ records, onDelete }) {
  if (records.length === 0) {
    return (
      <section className="section">
        <h2>📋 รายการบันทึก</h2>
        <div className="empty-state">📭 ไม่มีรายการบันทึกในเดือนนี้</div>
      </section>
    )
  }

  return (
    <section className="section">
      <h2>📋 รายการบันทึก</h2>
      <table className="records-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>หมวดหมู่</th>
            <th>รายละเอียด</th>
            <th className="text-right">จำนวน</th>
            <th className="text-center">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className={r.type === 'income' ? 'income-row' : 'expense-row'}>
              <td>{r.record_date.split('-').reverse().join('/')}</td>
              <td>{r.category}</td>
              <td>{r.note || '-'}</td>
              <td className="text-right">
                {r.type === 'income' ? '+' : '-'}{r.amount.toFixed(2)}
              </td>
              <td className="text-center">
                <button className="btn-danger" onClick={() => onDelete(r.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
