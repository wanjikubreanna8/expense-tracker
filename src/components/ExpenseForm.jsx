import { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [newExpense, setNewExpense] = useState({
    name: '',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    });
    setNewExpense({
      name: '',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            required
          />
        </div>

    <div className="form-group">
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={newExpense.category}
        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        required
      />
    </div>

    <div className="form-group">
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={newExpense.description}
        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
      />
    </div>

    <div className="form-group">
      <label>Amount:</label>
      <input
        type="number"
        name="amount"
        min="0.01"
        step="0.01"
        value={newExpense.amount}
        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        required
      />
    </div>

    <div className="form-group">
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={newExpense.date}
        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        required
      />
    </div>

    <button type="submit">Add Expense</button>
  </form>
</div>
  );
}

export default ExpenseForm;