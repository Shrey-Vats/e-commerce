import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import EmailVerificationStatus from './pages/EmailVerificationStatus'
import verifyEmail from './pages/VerifyEmail'

function App() {
  return (
    <div>
      <Router>
        <Routes >
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={< HomePage />} />
          <Route path='/emailverification-status' element={<EmailVerificationStatus />} />
          {/* <Route path='/email-verify' element={< verifyEmail />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App