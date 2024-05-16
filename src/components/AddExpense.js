import React, { useState } from 'react';
import './AddExpense.css'



  
const AddExpense = ({setShowForm, AddTransactions}) => {
    const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ amount: parseFloat(amount), description, type });
//     setAmount('');
//     setDescription('');
//   };

const [error, setError] = useState('');

  const handleSave = () => {
    if (type === "expense" && !description.trim()) {
      setError('Description is required');
    } else {
      AddTransactions({ amount: parseFloat(amount), description, type, id: Date.now() });
      setAmount('');
      setDescription('');
      setShowForm(false);
      setError('');
    }
  }
  return (
    <div className='save-data'>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        className='input'
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        className='input'
        
        onChange={(e) => setDescription(e.target.value)}
      />
       {error && <div className="error-message">{error}</div>}
      <div className="radio-group">
        <div className="radio-button">
        <input 
            type="radio"
            id="expense"
            name="type"
            value={"expense"} 
            checked={type === "expense"} 
            onChange={(e) => setType(e.target.value)} 
          /> 
          <label htmlFor="expense">Expense</label>
            </div>
       <div className="radio-button">
       <input 
            type="radio"
            id="income"
            name="type"
            value={"income"} 
            checked={type === "income"} 
            onChange={(e) => setType(e.target.value)} 
          /> 
          <label htmlFor="income">Budget</label> 
       </div>
        
          
          
      </div>
      <button onClick={handleSave} className='btn-save'>Save</button>
    </div>
  );
}

export default AddExpense;