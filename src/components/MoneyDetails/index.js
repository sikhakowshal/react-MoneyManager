import './index.css'

const MoneyDetails = props => {
  const {totalIncome, totalExpenses, totalBalance} = props

  return (
    <>
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="icon"
        />
        <div>
          <p className="container-heading">Your Balance</p>
          <h1 className="amount">{totalBalance}</h1>
        </div>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="icon"
        />
        <div>
          <p className="container-heading">Your Income</p>
          <h1 className="amount">{totalIncome}</h1>
        </div>
      </div>
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="icon"
        />
        <div>
          <p className="container-heading">Your Expenses</p>
          <h1 className="amount">{totalExpenses}</h1>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
