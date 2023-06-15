import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({optionId: event.target.value})
  }

  onSubmitTransactionDetails = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransactionItem = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransactionItem],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const filteredList = transactionsList.filter(each => each.id !== id)

    this.setState({transactionsList: filteredList})
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state

    let expensesAmount = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expensesAmount += each.amount
      }
    })

    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state

    const totalIncome = this.getIncome()
    const totalExpenses = this.getExpenses()
    const totalBalance = this.getBalance()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="welcome-section">
            <h1 className="greeting">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your{' '}
              <span className="app-name">Money Manager</span>
            </p>
          </div>
          <div className="balance-enquiry-section">
            <MoneyDetails
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              totalBalance={totalBalance}
            />
          </div>
          <div className="responsive-container">
            <form className="form" onSubmit={this.onSubmitTransactionDetails}>
              <h1 className="form-title">Add Transaction</h1>
              <div className="input-label-container">
                <label htmlFor="titleInput" className="input-label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="titleInput"
                  className="input-container"
                  value={titleInput}
                  placeholder="TITLE"
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-label-container">
                <label htmlFor="amountInput" className="input-label">
                  AMOUNT
                </label>
                <input
                  type="text"
                  id="amountIInput"
                  className="input-container"
                  value={amountInput}
                  placeholder="AMOUNT"
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="input-label-container">
                <label className="input-label" htmlFor="selectInput">
                  TYPE
                </label>
                <select
                  id="selectInput"
                  className="input-container"
                  value={optionId}
                  onChange={this.onChangeTransactionType}
                >
                  {transactionTypeOptions.map(each => (
                    <option key={each.optionId} value={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <div className="transaction-history-container">
              <h1 className="history-title">History</h1>
              <div className="transaction-table">
                <div className="table-header-container">
                  <p className="table-title">Title</p>
                  <p className="table-amount">Amount</p>
                  <p className="table-type">Type</p>
                </div>
                <ul className="transactions-list">
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      eachTransaction={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
