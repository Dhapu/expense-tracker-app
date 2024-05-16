import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './ExpenseList.css';

function ExpenseList({ transactions, onDelete, setTransactions }) {
const[filterTransactions, setFilterTransactions] = useState(transactions);
    const [searchExp, setSearchExp] = useState('');

    // useEffect(() => {
    //     const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    //     if (storedTransactions) {
    //       setTransactions(storedTransactions);
    //       setFilterTransactions(storedTransactions);
    //     }
    //   }, []);
    
      // Save transactions to localStorage whenever transactions or searchExp changes
    //   useEffect(() => {
    //     localStorage.setItem('transactions', JSON.stringify(transactions));
    //     filteredData(searchExp);
    //   }, [transactions, searchExp]);
    const filteredData = (searchInput) => { 
        if (!searchInput || !searchInput.trim().length) { 
          setFilterTransactions(transactions); 
          return; 
        } 
      
        let filtered = [...filterTransactions]; 
        filtered = filtered.filter( 
          (item) => 
            item.description.toLowerCase().includes(searchInput.toLowerCase().trim()) 
        ); 
        setFilterTransactions(filtered); 
      }; 
      
      useEffect(() => { 
        filteredData(searchExp); 
        //localStorage.setItem('transactions', JSON.stringify(transactions));
      }, [transactions, searchExp]);
  return (
    <div className="container">
      <h2>Transactions</h2>
      <div className='searchInput'>
        <input
          type="text"
          placeholder="Search transactions"
          value={searchExp}
          onChange={(e) => setSearchExp(e.target.value)}

        />

      </div>
      <div className="transaction-list">
    {filterTransactions.length > 0 ? (
      filterTransactions.map((transaction) => (
        transaction?.type === "expense" ? (
          <div className="transaction" key={transaction.id}>
            <span className="description">{transaction.description}</span>
            <span className="amount">₹{transaction.amount}</span>
            <button className="delete-button" onClick={() => onDelete(transaction.id)}>Delete</button>
          </div>
        ) : null
      ))
    ) : (
      <p>No transactions found</p>
    )}
  </div>
      
    </div>
  );
}

export default ExpenseList;
