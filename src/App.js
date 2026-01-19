import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react";

import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import UserMainDashboard from "./pages/UserMainDashboard"

import ProtectedRoute from "./routes/ProtectedRoutes"
import { getCurrentUser } from "./services/authService"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      return
    }

    getCurrentUser()
      .then((userData) => {
        setUser(userData)
      })
      .catch(() => {
        localStorage.removeItem("token")
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/' element={user ? <Navigate to="/dashboard" /> : <LandingPage /> }/>
      <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <Login /> }/>
      <Route path='/signup' element={user ? <Navigate to="/dashboard" /> : <SignUp /> }/>

      {/* <Route element={<ProtectedRoute user={user} />}> */}
        <Route path='/dashboard' element={<UserMainDashboard />}/>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
