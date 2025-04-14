import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Technology', category: 'Software', description: 'Annual subscription', amount: 120.50, date: '2023-05-15' },
    { id: 2, name: 'Office Supplies', category: 'Equipment', description: 'Desk chair', amount: 199.99, date: '2023-05-10' },
    { id: 3, name: 'Team Lunch', category: 'Food', description: 'Monthly team building', amount: 85.75, date: '2023-05-05' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleAddExpense = (newExpense) => {
    setExpenses([{ id: expenses.length + 1, ...newExpense }, ...expenses]);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(expense =>
    [expense.name, expense.description, expense.category].some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable
        expenses={filteredExpenses}
        onDelete={handleDelete}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
}

export default App;