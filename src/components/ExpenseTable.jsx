function ExpenseTable({ expenses, onDelete, onSort, sortConfig }) {
    return (
      <div className="expenses-container">
        <h2>Expenses List</h2>
        {expenses.length === 0 ? (
          <p>No expenses found matching your search.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th onClick={() => onSort('name')} className="sortable">
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => onSort('category')} className="sortable">
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => onSort('description')} className="sortable">
                  Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button onClick={() => onDelete(expense.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default ExpenseTable;