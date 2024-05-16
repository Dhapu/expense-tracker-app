import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";
import Balance from "./Balance";
import AddExpense from "./AddExpense";
import styled from "styled-components";
import ExpenseList from "./ExpenseList";
import './MenuComponent.css';

const ExpenseBox = styled.div` 
  flex: 1; 
  border: 1px solid #000; 
  border-radius: 5px; 
  padding: 10px 20px; 
  background-color: #fff; 
  & span { 
    font-weight: bold; 
    font-size: 25px; 
    display: block; 
    color: ${(props) => (props.isExpense ? "red" : "green")}; 
  } 
`; 
const IncomeBox = styled(ExpenseBox)``; 
  
const MenuComponent = () => {
    const [showForm, setShowForm] = useState(false); 
  //const [transactions, setTransactions] = useState([]); 
  const [transactions, setTransactions] = useState(() => {
    
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  }); 
  const [expense, setExpense] = useState(0); 
  const [income, setIncome] = useState(0); 
  
  const AddTransactions = (items) => { 
    const transactionList= [...transactions]; 
   transactionList.push(items); 
    setTransactions(transactionList); 
  }; 
  
  const removeTransaction = (id) => { 
    const updatedTransactions = transactions 
                                .filter((transaction) => transaction.id !== id); 
    setTransactions(updatedTransactions); 
  }; 
  
  const calculateTransactions = () => { 
    let exp = 0; 
    let inc = 0; 
  
    transactions.map((item) => { 
      item.type === "expense"
        ? (exp = exp + item.amount) 
        : (inc = inc + item.amount); 
    }); 
  
    setExpense(exp); 
    setIncome(inc); 
    console.log("inc", inc);
  }; 
  
  useEffect(() => { 
    calculateTransactions(); 
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]); 
    return (
        <div className="main-container">
            <Header/>
            <Balance income={income} expense={expense} showForm={showForm} setShowForm={setShowForm}/>

            {
                showForm && (
                    <AddExpense AddTransactions={AddTransactions} setShowForm={setShowForm}/>
                )
            }

            <div className="expense-container">
            <ExpenseBox isExpense> 
          Expense <span>₹{expense}</span> 
        </ExpenseBox> 
  
        <IncomeBox isExpense={false}> 
          Budget <span>₹{income}</span> 
        </IncomeBox> 
       
              </div>
            <ExpenseList transactions={transactions} onDelete={removeTransaction} setTransactions={setTransactions}/>
        </div>
    );
}

export default MenuComponent