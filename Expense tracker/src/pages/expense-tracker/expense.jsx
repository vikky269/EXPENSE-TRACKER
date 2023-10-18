import React, { useState } from 'react'
import './expense.css'
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useGetTransactions } from '../../hooks/useGetTransactions'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'

const Expense = () => {

 const {addTransaction} = useAddTransaction()
 const {transactions}=useGetTransactions()
 const {name, profilephoto}= useGetUserInfo()

 const [description, setDescription] = useState("")
 const [transactionAmount, setTransactionAmount] = useState(0)
 const [transactionType, setTransactionType] = useState("expense")

 const navigate = useNavigate()


  const onSubmit = async(e) => {
   e.preventDefault()
   await addTransaction({description, transactionAmount, transactionType})
 }

 const SignUserOut =  async () => {
   try{
    await signOut(auth)
    localStorage.clear()
    navigate("/")
   }catch(e){
   console.error(e)
   }
 }

  return (
    <>
    <div className='expense-tracker'>

      <div className="container">
        <h1>{name}'s Expense Tracker</h1>
        <div className="balance">
          <h3>Your balance</h3>
          <h2>$0.00</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>$0.00</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>$0.00</p>
          </div>
        </div>
        <form  className="add-transaction" onSubmit={onSubmit}>
          <input 
          type="text" 
          placeholder='Description' 
          required
          onChange={(e)=> setDescription(e.target.value)}
          />

          <input 
          type="number" 
          placeholder='Amount' 
          required 
          onChange={(e)=> setTransactionAmount(e.target.value)}
          />

          <input 
          type="radio" 
          id='expense' 
          value="expense" 
          checked={transactionType==="expense"}
          onChange={(e)=> setTransactionType(e.target.value)}
          />

          <label htmlFor="expenses">Expenses</label>
          <label htmlFor="income">Income</label>

          <input 
          type="radio" 
          id='income' 
          value="income"
          checked={transactionType==="income"}
          onChange={(e)=> setTransactionType(e.target.value)}
          />

          <button type='submit'>Add transaction</button>
        </form>
      </div>

      {profilephoto &&  
      <div className='profile'> 
      <img src={profilephoto} alt=""  className='profile-photo'/>
       <button onClick={SignUserOut} className='Sign-out-button'>Sign Out</button>
      </div>}
    </div>

    <div className='transactions'>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction)=> {
          const {description, transactionAmount, transactionType} = transaction
          return (
            <li key={transaction.description}>
              <h4>{description}</h4>
              <p>${transactionAmount} . <label style={{color: transactionType==="expense"? "red" : "green"}}> {transactionType} </label></p>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  )
}

export default Expense
