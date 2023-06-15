import './index.css'

const TransactionItem = props => {
  const {eachTransaction, deleteTransaction} = props
  const {id, title, amount, type} = eachTransaction

  const onDeleteTransactionItem = () => {
    deleteTransaction(id)
  }

  return (
    <div className="transaction-item">
      <p className="item-title">{title}</p>
      <p className="item-amount">{amount}</p>
      <div className="delete-container">
        <p className="item-type">{type}</p>
        <button
          data-testid="delete"
          type="button"
          className="delete-btn"
          onClick={onDeleteTransactionItem}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </div>
  )
}

export default TransactionItem
