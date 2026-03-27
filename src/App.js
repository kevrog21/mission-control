import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import LandingPage from "./components/LandingPage"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import UserMainDashboard from "./components/UserMainDashboard"
import DailyReviewHub from "./components/DailyReview/DailyReviewHub"
import DailyReviewForm from "./components/DailyReview/DailyReviewForm"
import DailyReviewQuestions from "./components/DailyReview/DailyReviewQuestions"


import ProtectedRoute from "./routes/ProtectedRoutes"

function App() {
  const { user, authLoading } = useAuth()

  if (authLoading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/' element={<LandingPage /> }/>
      <Route path='/login' element={<Login /> }/>
      <Route path='/signup' element={<SignUp /> }/>

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<UserMainDashboard />}/>
        <Route path='/daily-review' element={<DailyReviewHub />}/>
        <Route path='/daily-review/new' element={<DailyReviewForm />}/>
        <Route path='/daily-review/:id' element={<DailyReviewForm />}/>
        <Route path='/daily-review/customize' element={<DailyReviewQuestions />}/>

      </Route>
    </Routes>
  )
}

export default App;