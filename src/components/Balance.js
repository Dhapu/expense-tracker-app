import './Balance.css';

const Balance = ( { income, expense, showForm, setShowForm }) => {
    const balance = income - expense;
    return (
        <div className="secondComponent">
            <h2 className="balance">Balance <span>₹{balance}</span> 
       </h2>
{
    !showForm? (
        <button className="add-button" onClick={() => setShowForm(true)}>Add Expense</button>
    ) : (
        <button className="add-button" onClick={() => setShowForm(false)}>Cancel</button>
    )
}
            </div>
    )
}

export default Balance;