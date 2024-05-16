import React, { useState } from 'react';

function ExpenseForm({ onSave }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ amount: parseFloat(amount), description, type });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />
          Expense
        </label>
        <label>
          <input
            type="radio"
            value="budget"
            checked={type === 'budget'}
            onChange={() => setType('budget')}
          />
          Budget
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ExpenseForm;
