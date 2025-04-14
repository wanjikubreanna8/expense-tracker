import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  function App() {
    const [expenses, setExpenses] = useState([
      { id: 1, name: 'Technology', category: 'Software', description: 'Annual subscription', amount: 120.50, date: '2023-05-15' },
      { id: 2, name: 'Office Supplies', category: 'Equipment', description: 'Desk chair', amount: 199.99, date: '2023-05-10' },
      { id: 3, name: 'Team Lunch', category: 'Food', description: 'Monthly team building', amount: 85.75, date: '2023-05-05' },
    ]);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [newExpense, setNewExpense] = useState({
      name: '',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };
  
    const sortedExpenses = [...expenses].sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  
    const handleDelete = (id) => {
      setExpenses(expenses.filter(expense => expense.id !== id));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const expenseToAdd = {
        id: expenses.length + 1,
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses([expenseToAdd, ...expenses]);
      setNewExpense({
        name: '',
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
    };
  
    const filteredExpenses = sortedExpenses.filter(expense => {
      const searchLower = searchTerm.toLowerCase();
      return (
        expense.name.toLowerCase().includes(searchLower) ||
        expense.description.toLowerCase().includes(searchLower) ||
        expense.category.toLowerCase().includes(searchLower)
      );
    });
  
    return (
      <div className="app">
        <h1>Expense Tracker</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="form-container">
          <h2>Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newExpense.name}
                onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
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
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                required
              />
            </div>
            
            <button type="submit">Add Expense</button>
          </form>
        </div>
        
        <div className="expenses-container">
          <h2>Expenses List</h2>
          {filteredExpenses.length === 0 ? (
            <p>No expenses found matching your search.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className="sortable">
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('category')} className="sortable">
                    Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('description')} className="sortable">
                    Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
  
  export default App;
}