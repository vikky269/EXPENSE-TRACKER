import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/auth'
import Expense from './pages/expense-tracker/expense'

function App() {
  

  return (
    <>
     <div>
    <Router>
      <Routes>
        <Route path='/' exact element={<Auth />} />
        <Route path='/expense' exact element={<Expense/>} />
      </Routes>
    </Router>
     </div>
    </>
  )
}

export default App
